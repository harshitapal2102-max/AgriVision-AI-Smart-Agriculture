from fastapi import FastAPI, UploadFile, File, HTTPException # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from PIL import Image
import tensorflow as tf # type: ignore
import numpy as np
import json
import io
from pathlib import Path


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="AgriVision AI Disease Detection API",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# MODEL FILES
# =========================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "agrivision_model.keras"
CLASS_PATH = BASE_DIR / "class_names.json"


# =========================================================
# LOAD MODEL
# =========================================================

print("========================================")
print("Loading AgriVision AI model...")
print("========================================")

try:
    model = tf.keras.models.load_model(MODEL_PATH)

    with open(CLASS_PATH, "r", encoding="utf-8") as f:
        class_names = json.load(f)

    print("Model loaded successfully.")
    print("Classes:")

    for i, name in enumerate(class_names):
        print(f"{i}: {name}")

except Exception as e:
    print("MODEL LOADING ERROR:")
    print(e)

    model = None
    class_names = []


# =========================================================
# DISEASE INFORMATION
# =========================================================

DISEASE_INFO = {

    "healthy": {
        "description": (
            "The AI model detected a healthy-looking leaf "
            "based on the disease classes included in the training dataset."
        ),

        "symptoms": [
            "Normal green leaf appearance",
            "No strong disease pattern detected",
            "No major visible lesion pattern detected by the model"
        ],

        "solution": [
            "Continue regular crop monitoring",
            "Maintain proper irrigation",
            "Maintain balanced crop nutrition",
            "Inspect the crop regularly"
        ],

        "prevention": [
            "Use healthy planting material",
            "Maintain good field hygiene",
            "Avoid unnecessary leaf wetness",
            "Monitor crops regularly"
        ]
    },


    "Apple_scab": {
        "description": (
            "Apple scab is a fungal disease that can produce "
            "olive-green to brown lesions on apple leaves and fruit."
        ),

        "symptoms": [
            "Olive-green or brown leaf spots",
            "Dark lesions that may enlarge",
            "Premature leaf drop",
            "Fruit scarring in severe cases"
        ],

        "solution": [
            "Remove heavily infected plant material",
            "Improve air circulation around plants",
            "Avoid prolonged leaf wetness",
            "Follow locally recommended disease-management practices"
        ],

        "prevention": [
            "Remove fallen infected leaves",
            "Maintain orchard sanitation",
            "Prune appropriately to improve airflow",
            "Monitor plants regularly"
        ]
    },


    "Apple___Apple_scab": {
        "description": (
            "Apple scab is a fungal disease that commonly causes "
            "olive-green to brown lesions on apple leaves."
        ),

        "symptoms": [
            "Olive-green spots",
            "Brown or dark lesions",
            "Leaf yellowing or premature leaf drop",
            "Fruit scarring may occur"
        ],

        "solution": [
            "Remove infected leaves and plant debris",
            "Improve airflow through pruning",
            "Avoid unnecessary overhead irrigation",
            "Follow locally approved disease-management guidance"
        ],

        "prevention": [
            "Maintain orchard sanitation",
            "Remove fallen infected leaves",
            "Use healthy planting material",
            "Regularly monitor new growth"
        ]
    },


    "Apple___Black_rot": {
        "description": (
            "Apple black rot is a fungal disease that can affect "
            "leaves, branches and fruit."
        ),

        "symptoms": [
            "Purple or brown leaf spots",
            "Darkening lesions",
            "Leaf tissue death",
            "Fruit rot may develop"
        ],

        "solution": [
            "Remove severely infected plant material",
            "Remove diseased debris from the field",
            "Improve air circulation",
            "Follow locally recommended disease-management practices"
        ],

        "prevention": [
            "Maintain good sanitation",
            "Remove infected plant debris",
            "Use healthy planting material",
            "Monitor plants frequently"
        ]
    },


    "Common_rust_": {
        "description": (
            "Common rust of maize is a fungal disease that produces "
            "rust-colored pustules on maize leaves."
        ),

        "symptoms": [
            "Small reddish-brown pustules",
            "Rust-colored spots on leaves",
            "Leaf yellowing in severe cases",
            "Reduced healthy leaf area"
        ],

        "solution": [
            "Monitor disease development across the field",
            "Maintain balanced crop nutrition",
            "Remove severely affected plant material where practical",
            "Use locally recommended disease-management products when necessary"
        ],

        "prevention": [
            "Use resistant varieties where available",
            "Monitor the crop regularly",
            "Maintain good field management",
            "Follow recommended crop sanitation practices"
        ]
    },


    "Corn_(maize)___Common_rust_": {
        "description": (
            "Common rust is a fungal disease of maize that can "
            "produce reddish-brown pustules on leaves."
        ),

        "symptoms": [
            "Reddish-brown rust-like pustules",
            "Small spots on leaves",
            "Leaf yellowing during severe infection",
            "Reduced photosynthetic area"
        ],

        "solution": [
            "Monitor affected plants closely",
            "Maintain appropriate crop nutrition",
            "Improve general crop management",
            "Use locally recommended treatment when required"
        ],

        "prevention": [
            "Use resistant varieties where available",
            "Monitor fields regularly",
            "Maintain good crop management",
            "Follow recommended agricultural practices"
        ]
    },


    "Corn_(maize)___healthy": {
        "description": (
            "The model detected a healthy-looking maize leaf "
            "according to the classes used during training."
        ),

        "symptoms": [
            "Generally green leaf appearance",
            "No strong common-rust pattern detected"
        ],

        "solution": [
            "Continue regular monitoring",
            "Maintain proper irrigation",
            "Maintain balanced nutrition",
            "Check plants regularly"
        ],

        "prevention": [
            "Use healthy seed",
            "Monitor fields regularly",
            "Maintain good field hygiene",
            "Follow recommended crop management"
        ]
    },


    "Grape___Black_rot": {
        "description": (
            "Grape black rot is a fungal disease that can produce "
            "lesions on leaves and affect grape clusters."
        ),

        "symptoms": [
            "Brown circular leaf spots",
            "Dark lesions",
            "Premature tissue death",
            "Fruit can become dark and shriveled"
        ],

        "solution": [
            "Remove infected plant material",
            "Remove affected fruit and debris",
            "Improve air circulation",
            "Follow locally recommended disease-management practices"
        ],

        "prevention": [
            "Maintain vineyard sanitation",
            "Remove infected debris",
            "Improve airflow",
            "Monitor plants during favorable disease conditions"
        ]
    },


    "Blueberry___healthy": {
        "description": (
            "The model detected a healthy-looking blueberry leaf "
            "according to the training classes."
        ),

        "symptoms": [
            "Generally healthy green foliage",
            "No strong disease pattern detected"
        ],

        "solution": [
            "Continue crop monitoring",
            "Maintain proper irrigation",
            "Maintain balanced nutrition",
            "Inspect plants regularly"
        ],

        "prevention": [
            "Use healthy planting material",
            "Maintain field hygiene",
            "Avoid unnecessary leaf wetness",
            "Monitor new growth"
        ]
    }
}


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "status": "success",
        "service": "AgriVision AI",
        "message": "Disease Detection API is running"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy" if model is not None else "model_error",
        "model_loaded": model is not None,
        "number_of_classes": len(class_names),
        "classes": class_names
    }


# =========================================================
# PREDICT
# =========================================================

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # -----------------------------------------------------
    # Check model
    # -----------------------------------------------------

    if model is None:
        raise HTTPException(
            status_code=500,
            detail="AI model is not loaded."
        )

    # -----------------------------------------------------
    # Check file
    # -----------------------------------------------------

    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="File type could not be detected."
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload an image file."
        )

    try:

        # -------------------------------------------------
        # Read image
        # -------------------------------------------------

        contents = await file.read()

        image = Image.open(
            io.BytesIO(contents)
        ).convert("RGB")

        original_width, original_height = image.size

        # -------------------------------------------------
        # Resize
        # -------------------------------------------------

        image = image.resize((224, 224))

        # -------------------------------------------------
        # Convert to NumPy
        # -------------------------------------------------

        image_array = np.array(image)

        image_array = np.expand_dims(
            image_array,
            axis=0
        )

        # -------------------------------------------------
        # AI prediction
        # -------------------------------------------------

        predictions = model.predict(
            image_array,
            verbose=0
        )[0]

        predicted_index = int(
            np.argmax(predictions)
        )

        confidence = float(
            predictions[predicted_index] * 100
        )

        predicted_class = class_names[
            predicted_index
        ]

        # -------------------------------------------------
        # Split crop and disease
        # -------------------------------------------------

        if "___" in predicted_class:

            crop, disease = predicted_class.split(
                "___",
                1
            )

        else:

            crop = predicted_class
            disease = "Unknown"

        # -------------------------------------------------
        # Clean display names
        # -------------------------------------------------

        clean_crop = (
            crop
            .replace("_", " ")
            .strip()
        )

        clean_disease = (
            disease
            .replace("_", " ")
            .strip()
        )

        # -------------------------------------------------
        # Find disease information
        # -------------------------------------------------

        info = DISEASE_INFO.get(
            predicted_class
        )

        if info is None:

            info = DISEASE_INFO.get(
                disease
            )

        if info is None:

            info = {
                "description": (
                    "The model detected this class, "
                    "but detailed advisory information "
                    "has not yet been added."
                ),

                "symptoms": [
                    "Review the uploaded image carefully",
                    "Compare the symptoms with the crop condition"
                ],

                "solution": [
                    "Monitor the crop closely",
                    "Consult a qualified agricultural expert "
                    "before applying treatment"
                ],

                "prevention": [
                    "Maintain good field hygiene",
                    "Monitor the crop regularly"
                ]
            }

        # -------------------------------------------------
        # Low confidence warning
        # -------------------------------------------------

        warning = None

        if confidence < 60:

            warning = (
                "The AI confidence is low. "
                "Upload a clear image showing the affected leaf "
                "and verify the result with a qualified "
                "agricultural expert before taking treatment action."
            )

        # -------------------------------------------------
        # Final response
        # -------------------------------------------------

        return {

            "status": "success",

            "filename": file.filename,

            "image": {
                "width": original_width,
                "height": original_height
            },

            "prediction": {

                "crop": clean_crop,

                "disease": clean_disease,

                "confidence": round(
                    confidence,
                    2
                )
            },

            "diagnosis": {

                "description":
                    info["description"],

                "symptoms":
                    info["symptoms"],

                "solution":
                    info["solution"],

                "prevention":
                    info["prevention"]
            },

            "warning": warning,

            "message":
                "AI prediction completed successfully"
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )