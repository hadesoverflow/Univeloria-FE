import os
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
fname = 'media_1794641832057_40c7d301.jpg'
out_dir = r"UniVeloria-FE\public\debug_inspect"

img = Image.open(os.path.join(folder, fname))
W, H = img.size
print(f"Silvia size: {W}x{H}")

# Check swatches on left card
# Usually x: 80 to 320, y: 180 to 550
img.crop((40, 160, 360, 360)).save(os.path.join(out_dir, "silvia_card_top.png"))
img.crop((40, 360, 360, 560)).save(os.path.join(out_dir, "silvia_card_bot.png"))

