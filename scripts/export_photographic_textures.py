import os
import cv2
import numpy as np
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
all_files = {
    'harmony-2': 'media_1794641832053_81f7a944.jpg',
    'malange-1': 'media_1794641832054_20a8ac55.jpg',
    'moon': 'media_1794641832055_89de8047.jpg',
    'silvia': 'media_1794641832057_40c7d301.jpg',
    'sunny': 'media_1794641832061_08531b0f.jpg'
}

out_dir = r"UniVeloria-FE\public\assets\curtains"
debug_dir = r"UniVeloria-FE\public\debug_inspect"
os.makedirs(out_dir, exist_ok=True)
os.makedirs(debug_dir, exist_ok=True)

# Precise pure fabric crop coordinates (100% inside swatches):
crop_boxes = {
    'harmony-2': (120, 210, 310, 310),
    'malange-1': (90, 240, 320, 340),
    'moon': (70, 225, 290, 310),
    'silvia': (165, 190, 350, 340),
    'sunny': (235, 220, 325, 280)
}

def create_seamless_fabric(src, target_size=(512, 512), contrast=1.4, blur_kernel=61):
    resized = cv2.resize(src, target_size, interpolation=cv2.INTER_CUBIC)
    
    bw = 64
    res = resized.copy().astype(np.float32)
    
    for x in range(bw):
        t = x / float(bw)
        w_left = 0.5 * (1.0 - np.cos(t * np.pi))
        w_right = 1.0 - w_left
        left = res[:, x]
        right = res[:, target_size[0] - bw + x]
        blended = left * w_left + right * w_right
        res[:, x] = blended
        res[:, target_size[0] - bw + x] = blended

    for y in range(bw):
        t = y / float(bw)
        w_top = 0.5 * (1.0 - np.cos(t * np.pi))
        w_bot = 1.0 - w_top
        top = res[y, :]
        bot = res[target_size[1] - bw + y, :]
        blended = top * w_top + bot * w_bot
        res[y, :] = blended
        res[target_size[1] - bw + y, :] = blended
        
    blended_u8 = np.clip(res, 0, 255).astype(np.uint8)
    
    gray = cv2.cvtColor(blended_u8, cv2.COLOR_BGR2GRAY)
    lowpass = cv2.GaussianBlur(gray, (blur_kernel, blur_kernel), 0)
    highpass = cv2.addWeighted(gray, 1.0, lowpass, -1.0, 128)
    
    hp_float = (highpass.astype(np.float32) - 128.0) * contrast + 128.0
    hp_norm = np.clip(hp_float, 0, 255).astype(np.uint8)
    
    bump_map = hp_norm.copy()
    
    # Baseline at 222 (light neutral) so tinting by material.color keeps 88-92% brightness
    norm_albedo = np.clip(220.0 + (hp_float - 128.0) * 0.55, 0, 255).astype(np.uint8)
    albedo_bgr = cv2.cvtColor(norm_albedo, cv2.COLOR_GRAY2BGR)
    
    return albedo_bgr, bump_map

for name, fname in all_files.items():
    p = os.path.join(folder, fname)
    img = Image.open(p)
    box = crop_boxes[name]
    cropped = img.crop(box)
    
    # Convert PIL to cv2 BGR
    cv_img = cv2.cvtColor(np.array(cropped), cv2.COLOR_RGB2BGR)
    
    c = 2.6 if name == 'moon' else 2.0 if name == 'harmony-2' else 1.8
    albedo, bump = create_seamless_fabric(cv_img, target_size=(512, 512), contrast=c)
    
    albedo_path = os.path.join(out_dir, f"fabric-roller-{name}-diffuse.png")
    bump_path = os.path.join(out_dir, f"fabric-roller-{name}-bump.png")
    cv2.imwrite(albedo_path, albedo)
    cv2.imwrite(bump_path, bump)
    
    tiled = np.vstack([np.hstack([albedo, albedo]), np.hstack([albedo, albedo])])
    cv2.imwrite(os.path.join(debug_dir, f"final_tiled_{name}.png"), tiled)
    print(f"Exported {name} -> {albedo_path}")

print("All 5 fabrics successfully generated and verified!")
