import os
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
all_files = {
    'harmony': 'media_1794641832053_81f7a944.jpg',
    'moon': 'media_1794641832055_89de8047.jpg',
    'sunny': 'media_1794641832061_08531b0f.jpg'
}

out_dir = r"UniVeloria-FE\public\debug_inspect"

# 1. Harmony swatch interior
img_h = Image.open(os.path.join(folder, all_files['harmony']))
# swatch H 66 is roughly at x: 80 to 340, y: 190 to 330
h_patch = img_h.crop((120, 210, 310, 310))
h_patch.save(os.path.join(out_dir, "h_patch_clean.png"))

# 2. Moon swatch interior
img_m = Image.open(os.path.join(folder, all_files['moon']))
# swatch M 81 is roughly at x: 40 to 360, y: 200 to 380
m_patch = img_m.crop((120, 240, 320, 340))
m_patch.save(os.path.join(out_dir, "m_patch_clean.png"))

# 3. Sunny swatch interior (S 92 grey)
img_s = Image.open(os.path.join(folder, all_files['sunny']))
# swatch S 92 is at top right of swatches card: x: 190 to 350, y: 190 to 320
s_patch = img_s.crop((195, 205, 340, 305))
s_patch.save(os.path.join(out_dir, "s_patch_clean.png"))

print("Saved clean patches!")
