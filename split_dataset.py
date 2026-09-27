import random
import shutil
from pathlib import Path

SOURCE = Path("dataset_small")
OUTPUT = Path("dataset")

TRAIN_RATIO = 0.70
VAL_RATIO = 0.20
TEST_RATIO = 0.10

random.seed(42)

# Create output folders
for split in ["train", "validation", "test"]:
    (OUTPUT / split).mkdir(parents=True, exist_ok=True)

# Process every crop/disease class
for class_dir in SOURCE.iterdir():

    if not class_dir.is_dir():
        continue

    images = [
        f for f in class_dir.iterdir()
        if f.is_file()
    ]

    random.shuffle(images)

    total = len(images)

    train_end = int(total * TRAIN_RATIO)
    val_end = train_end + int(total * VAL_RATIO)

    train_images = images[:train_end]
    val_images = images[train_end:val_end]
    test_images = images[val_end:]

    print(f"\n{class_dir.name}")
    print(f"  Train      : {len(train_images)}")
    print(f"  Validation : {len(val_images)}")
    print(f"  Test       : {len(test_images)}")

    for split, split_images in [
        ("train", train_images),
        ("validation", val_images),
        ("test", test_images)
    ]:

        destination = OUTPUT / split / class_dir.name
        destination.mkdir(parents=True, exist_ok=True)

        for image in split_images:
            shutil.copy2(image, destination / image.name)

print("\n================================")
print("DATASET SPLIT COMPLETE")
print("================================")
print(f"Dataset location: {OUTPUT.absolute()}")