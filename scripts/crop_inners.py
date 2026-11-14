import os
import cv2
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
all_files = {
    'harmony': 'media_1794641832053_81f7a944.jpg',
    'moon': 'media_1794641832055_89de8047.jpg',
    'sunny': 'media_1794641832061_08531b0f.jpg'
}

out_dir = r"UniVeloria-FE\public\debug_inspect"

# Moon:
img_m = Image.open(os.path.join(folder, all_files['moon']))
# The big swatch M 81 is at left. Let's crop right in its upper-middle:
# x: 60 to 300, y: 220 to 310
m_inner = img_m.crop((70, 225, 290, 310))
m_inner.save(os.path.join(out_dir, "m_inner.png"))

# Sunny:
img_s = Image.open(os.path.join(folder, all_files['sunny']))
# S 91 swatch (left) is at x: 25 to 175, y: 240 to 360
s91_inner = img_s.crop((35, 255, 160, 345))
s91_inner.save(os.path.join(out_dir, "s91_inner.png"))

# S 92 swatch (right) is at x: 190 to 350, y: 200 to 330
s92_inner = img_s.crop((215, 220, 325, 295))
s92_inner.save(os.path.join(out_dir, "s92_inner.png"))

print("Cropped inners!")
