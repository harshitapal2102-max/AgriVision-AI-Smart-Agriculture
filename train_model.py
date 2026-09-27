import tensorflow as tf # type: ignore
from tensorflow.keras import layers, models # type: ignore
from pathlib import Path
import json

# =========================
# SETTINGS
# =========================

DATASET_DIR = Path("dataset")

IMG_SIZE = (224, 224)
BATCH_SIZE = 16
EPOCHS = 10

# =========================
# LOAD DATA
# =========================

print("Loading training data...")

train_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR / "train",
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True,
    seed=42
)

print("Loading validation data...")

val_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR / "validation",
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

print("Loading test data...")

test_ds = tf.keras.utils.image_dataset_from_directory(
    DATASET_DIR / "test",
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False
)

class_names = train_ds.class_names

print("\nClasses:")
for i, name in enumerate(class_names):
    print(i, "->", name)

# =========================
# SAVE CLASS NAMES
# =========================

with open("class_names.json", "w") as f:
    json.dump(class_names, f, indent=4)

# =========================
# PERFORMANCE
# =========================

AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)
test_ds = test_ds.prefetch(AUTOTUNE)

# =========================
# DATA AUGMENTATION
# =========================

data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])

# =========================
# BASE MODEL
# =========================

base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,),
    include_top=False,
    weights="imagenet"
)

# Initially freeze pretrained layers
base_model.trainable = False

# =========================
# MODEL
# =========================

inputs = layers.Input(shape=IMG_SIZE + (3,))

x = data_augmentation(inputs)

x = tf.keras.applications.mobilenet_v2.preprocess_input(x)

x = base_model(x, training=False)

x = layers.GlobalAveragePooling2D()(x)

x = layers.Dropout(0.3)(x)

outputs = layers.Dense(
    len(class_names),
    activation="softmax"
)(x)

model = models.Model(inputs, outputs)

# =========================
# COMPILE
# =========================

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

# =========================
# TRAIN
# =========================

print("\nStarting training...\n")

history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=EPOCHS
)

# =========================
# TEST
# =========================

print("\nEvaluating test dataset...")

test_loss, test_accuracy = model.evaluate(test_ds)

print(f"\nTest accuracy: {test_accuracy * 100:.2f}%")

# =========================
# SAVE MODEL
# =========================

model.save("agrivision_model.keras")

print("\n================================")
print("MODEL TRAINING COMPLETE")
print("================================")

print("Model saved as:")
print("agrivision_model.keras")

print("Classes saved as:")
print("class_names.json")