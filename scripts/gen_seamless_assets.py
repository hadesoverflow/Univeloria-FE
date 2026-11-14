import os
import cv2
import numpy as np

def create_seamless_fabric(img_path, target_size=(512, 512), contrast=1.35, blur_kernel=61):
    src = cv2.imread(img_path)
    if src is None:
        raise ValueError(f"Cannot read {img_path}")
    h, w = src.shape[:2]
    
    # 1. Resize to target size with bicubic
    resized = cv2.resize(src, target_size, interpolation=cv2.INTER_CUBIC)
    
    # 2. Seamless blending: cross-fade boundaries
    bw = 64  # blend width
    res = resized.copy().astype(np.float32)
    
    # Horizontal cross-fade
    for x in range(bw):
        t = x / float(bw)
        # Cosine smooth curve
        w_left = 0.5 * (1.0 - np.cos(t * np.pi))
        w_right = 1.0 - w_left
        left = res[:, x]
        right = res[:, target_size[0] - bw + x]
        blended = left * w_left + right * w_right
        res[:, x] = blended
        res[:, target_size[0] - bw + x] = blended

    # Vertical cross-fade
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
    
    # 3. High-pass filter to remove lighting vignetting and preserve 100% fine weave detail
    gray = cv2.cvtColor(blended_u8, cv2.COLOR_BGR2GRAY)
    lowpass = cv2.GaussianBlur(gray, (blur_kernel, blur_kernel), 0)
    # High pass = gray - lowpass + 128
    highpass = cv2.addWeighted(gray, 1.0, lowpass, -1.0, 128)
    
    # Increase weave contrast
    hp_float = (highpass.astype(np.float32) - 128.0) * contrast + 128.0
    hp_norm = np.clip(hp_float, 0, 255).astype(np.uint8)
    
    # Bump map
    bump_map = hp_norm.copy()
    
    # Neutral Albedo map (normalized around 230 so Three.js tinting retains full color brightness)
    norm_albedo = np.clip(128.0 + (hp_float - 128.0) * 0.9, 0, 255).astype(np.uint8)
    albedo_bgr = cv2.cvtColor(norm_albedo, cv2.COLOR_GRAY2BGR)
    
    return albedo_bgr, bump_map

fabrics = {
    'harmony-2': r"UniVeloria-FE\public\debug_inspect\clean_harmony.png",
    'moon': r"UniVeloria-FE\public\debug_inspect\clean_moon.png",
    'sunny': r"UniVeloria-FE\public\debug_inspect\clean_sunny.png",
    'malange-1': r"UniVeloria-FE\public\debug_inspect\clean_malange.png",
    'silvia': r"UniVeloria-FE\public\debug_inspect\clean_silvia.png"
}

out_dir = r"UniVeloria-FE\public\assets\curtains"
os.makedirs(out_dir, exist_ok=True)

debug_dir = r"UniVeloria-FE\public\debug_inspect"

for name, p in fabrics.items():
    # Boost contrast specifically for Moon so its fine weave is crisp and visible!
    c = 2.4 if name == 'moon' else 1.8 if name == 'harmony-2' else 1.6
    albedo, bump = create_seamless_fabric(p, target_size=(512, 512), contrast=c)
    
    albedo_path = os.path.join(out_dir, f"fabric-roller-{name}-diffuse.png")
    bump_path = os.path.join(out_dir, f"fabric-roller-{name}-bump.png")
    cv2.imwrite(albedo_path, albedo)
    cv2.imwrite(bump_path, bump)
    
    # Tiled 2x2 preview
    tiled = np.vstack([np.hstack([albedo, albedo]), np.hstack([albedo, albedo])])
    cv2.imwrite(os.path.join(debug_dir, f"verify_{name}_2x2.png"), tiled)
    print(f"Generated {name} textures: albedo & bump")

print("All 5 fabric texture sets successfully exported to public/assets/curtains!")

