import os
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

for name, fname in all_files.items():
    p = os.path.join(folder, fname)
    img = Image.open(p)
    W, H = img.size
    
    # Crop swatch swatch area
    swatch = img.crop((int(W * 0.05), int(H * 0.20), int(W * 0.36), int(H * 0.50)))
    swatch.save(os.path.join(out_dir, f"{name}_swatch_zoom.png"))

    # Crop close-up 1 fabric fold
    c1 = img.crop((int(W * 0.73), int(H * 0.02), int(W * 0.98), int(H * 0.30)))
    c1.save(os.path.join(out_dir, f"{name}_fold.png"))

    # Crop close-up 2 water droplet (macro texture)
    c2 = img.crop((int(W * 0.73), int(H * 0.36), int(W * 0.98), int(H * 0.62)))
    c2.save(os.path.join(out_dir, f"{name}_droplet.png"))

print("Cropped all 5 fabrics!")
