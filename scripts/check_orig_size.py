import os
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
all_files = {
    'harmony': 'media_1794641832053_81f7a944.jpg',
    'moon': 'media_1794641832055_89de8047.jpg',
    'sunny': 'media_1794641832061_08531b0f.jpg'
}

out_dir = r"UniVeloria-FE\public\debug_inspect"

for name, fname in all_files.items():
    p = os.path.join(folder, fname)
    img = Image.open(p)
    W, H = img.size
    print(f"{name}: orig size {W}x{H}")
