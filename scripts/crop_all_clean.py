import os
import cv2
import numpy as np
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
all_files = {
    'harmony': 'media_1794641832053_81f7a944.jpg',
    'malange': 'media_1794641832054_20a8ac55.jpg',
    'moon': 'media_1794641832055_89de8047.jpg',
    'silvia': 'media_1794641832057_40c7d301.jpg',
    'sunny': 'media_1794641832061_08531b0f.jpg'
}

out_dir = r"UniVeloria-FE\public\debug_inspect"

# 1. Harmony: H 66 (gray)
img_h = Image.open(os.path.join(folder, all_files['harmony']))
h_crop = img_h.crop((120, 210, 310, 310))
h_crop.save(os.path.join(out_dir, "clean_harmony.png"))

# 2. Malange: MA 13 (gray) or MA 11
img_m = Image.open(os.path.join(folder, all_files['malange']))
# MA 11 big swatch: x: 80 to 330, y: 240 to 340
mal_crop = img_m.crop((80, 240, 330, 340))
mal_crop.save(os.path.join(out_dir, "clean_malange.png"))

# 3. Moon: M 81 big swatch
img_moon = Image.open(os.path.join(folder, all_files['moon']))
moon_crop = img_moon.crop((70, 225, 290, 310))
moon_crop.save(os.path.join(out_dir, "clean_moon.png"))

# 4. Silvia: big swatch or second swatch
img_silvia = Image.open(os.path.join(folder, all_files['silvia']))
# Swatch in Silvia
silv_crop = img_silvia.crop((80, 240, 320, 330))
silv_crop.save(os.path.join(out_dir, "clean_silvia.png"))

# 5. Sunny: S 92 (gray swatch on right)
img_sunny = Image.open(os.path.join(folder, all_files['sunny']))
sunny_crop = img_sunny.crop((235, 220, 325, 280))
sunny_crop.save(os.path.join(out_dir, "clean_sunny.png"))

print("Cropped all 5 clean swatches!")
