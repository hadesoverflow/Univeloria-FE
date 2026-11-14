import os
import cv2
import numpy as np
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
fname = 'media_1794641832057_40c7d301.jpg'
out_dir = r"UniVeloria-FE\public\debug_inspect"

img = Image.open(os.path.join(folder, fname))
clean_silv = img.crop((150, 190, 350, 340))
clean_silv.save(os.path.join(out_dir, "clean_silvia.png"))
print("Saved clean_silvia.png!")
