from datasets import load_dataset # type: ignore
from pathlib import Path

CLASSES = [
    "Soybean___healthy",
    "Tomato___healthy",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Potato___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Corn_(maize)___healthy",
]

IMAGES_PER_CLASS = 30
OUTPUT = Path("dataset_small")

OUTPUT.mkdir(exist_ok=True)

print("Loading PlantVillage dataset...")

dataset = load_dataset(
    "mohanty/PlantVillage",
    split="train"
)

print("Dataset loaded!")
print("Number of images:", len(dataset))

label_names = dataset.features["label"].names

print("\nAvailable classes:")
for name in label_names:
    print(name)

for class_name in CLASSES:

    if class_name not in label_names:
        print(f"\nSKIPPED: {class_name}")
        continue

    class_id = label_names.index(class_name)

    selected = dataset.filter(
        lambda item: item["label"] == class_id
    )

    selected = selected.select(
        range(min(IMAGES_PER_CLASS, len(selected)))
    )

    folder = OUTPUT / class_name
    folder.mkdir(parents=True, exist_ok=True)

    for i, item in enumerate(selected):
        image = item["image"].convert("RGB")
        image.save(folder / f"{i:04d}.jpg")

    print(f"Downloaded {len(selected)} images -> {class_name}")

print("\n================================")
print("SMALL DATASET DOWNLOAD COMPLETE")
print("================================")
print(f"Location: {OUTPUT.absolute()}")