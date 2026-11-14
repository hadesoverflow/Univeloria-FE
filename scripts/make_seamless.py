import cv2
import numpy as np
from PIL import Image

out_dir = r"UniVeloria-FE\public\debug_inspect"

def make_seamless_texture(img_path, out_size=(512, 512)):
    # Load original patch
    src = cv2.imread(img_path)
    h, w = src.shape[:2]
    
    # Crop central area without edges
    pad_y = int(h * 0.08)
    pad_x = int(w * 0.08)
    cropped = src[pad_y:h-pad_y, pad_x:w-pad_x]
    
    # Resize to out_size
    resized = cv2.resize(cropped, out_size, interpolation=cv2.INTER_CUBIC)
    
    # Seamless blending via mirror cross-dissolve on borders
    # Border width = 64px
    bw = 64
    result = resized.copy().astype(np.float32)
    
    # Horizontal wrap blending
    for x in range(bw):
        weight = float(x) / bw
        # Blend left edge with right edge
        left_val = result[:, x]
        right_val = result[:, out_size[1] - bw + x]
        # Linear cross-fade
        blended = left_val * weight + right_val * (1.0 - weight)
        result[:, x] = blended
        result[:, out_size[1] - bw + x] = blended

    # Vertical wrap blending
    for y in range(bw):
        weight = float(y) / bw
        top_val = result[y, :]
        bot_val = result[out_size[0] - bw + y, :]
        blended = top_val * weight + bot_val * (1.0 - weight)
        result[y, :] = blended
        result[out_size[0] - bw + y, :] = blended
        
    result = np.clip(result, 0, 255).astype(np.uint8)
    
    # Normalize lighting (high-pass filter / remove vignetting/shading)
    gray = cv2.cvtColor(result, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (101, 101), 0)
    # Detail = gray - blur + 128
    detail = cv2.addWeighted(gray, 1.0, blur, -1.0, 128)
    
    # Bump map
    bump = detail.copy()
    
    # Normalized monochrome albedo for perfect color tinting
    # Target mean ~215 so multiplying by color retains vibrancy
    norm_factor = 215.0 / np.mean(detail)
    albedo_gray = np.clip(detail.astype(np.float32) * norm_factor, 0, 255).astype(np.uint8)
    albedo = cv2.cvtColor(albedo_gray, cv2.COLOR_GRAY2BGR)
    
    return albedo, bump

# Test for harmony, moon, sunny
fabrics = {
    'harmony': r"UniVeloria-FE\public\debug_inspect\h_patch_clean.png",
    'moon': r"UniVeloria-FE\public\debug_inspect\m_patch_clean.png",
    'sunny': r"UniVeloria-FE\public\debug_inspect\s_patch_clean.png"
}

for name, p in fabrics.items():
    albedo, bump = make_seamless_texture(p)
    cv2.imwrite(f"{out_dir}/seamless_{name}_albedo.png", albedo)
    cv2.imwrite(f"{out_dir}/seamless_{name}_bump.png", bump)
    
    # Create a 2x2 tiled image to verify seamlessness
    tiled_albedo = np.vstack([
        np.hstack([albedo, albedo]),
        np.hstack([albedo, albedo])
    ])
    cv2.imwrite(f"{out_dir}/tiled_{name}_2x2.png", tiled_albedo)

print("Seamless textures generated!")

