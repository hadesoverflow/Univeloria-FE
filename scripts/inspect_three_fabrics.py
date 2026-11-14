import os
from PIL import Image

folder = r"C:\Users\songn\.gemini\antigravity\brain\0934d00b-5565-4f6a-9197-342000854c1c\.user_uploaded"
files = {
    'harmony': 'media_1794641832053_81f7a944.jpg',
    'moon': 'media_1794641832055_89de8047.jpg',
    'sunny': 'media_1794641832061_08531b0f.jpg'
}

out_dir = r"UniVeloria-FE\public\debug_inspect"
os.makedirs(out_dir, exist_ok=True)

for name, fname in files.items():
    p = os.path.join(folder, fname)
    img = Image.open(p)
    W, H = img.size
    print(f"=== {name.upper()} ({W}x{H}) ===")
    
    # 1. Main swatch on left
    # Usually around left: 5% to 35%, top: 15% to 50%
    swatch_crop = img.crop((int(W * 0.05), int(H * 0.15), int(W * 0.36), int(H * 0.52)))
    swatch_crop.save(os.path.join(out_dir, f"{name}_swatch.png"))
    
    # 2. Right side close up 1 (Chi tiết bề mặt vải)
    # top right: left: 70% to 100%, top: 0% to 35%
    c1 = img.crop((int(W * 0.72), int(H * 0.0), int(W * 1.0), int(H * 0.35)))
    c1.save(os.path.join(out_dir, f"{name}_closeup1.png"))
    
    # 3. Right side close up 2 (Khả năng / họa tiết)
    # mid right: left: 70% to 100%, top: 35% to 68%
    c2 = img.crop((int(W * 0.72), int(H * 0.35), int(W * 1.0), int(H * 0.68)))
    c2.save(os.path.join(out_dir, f"{name}_closeup2.png"))

    # 4. Right side close up 3 (Bảng màu thực tế)
    # bot right: left: 70% to 100%, top: 68% to 100%
    c3 = img.crop((int(W * 0.72), int(H * 0.68), int(W * 1.0), int(H * 1.0)))
    c3.save(os.path.join(out_dir, f"{name}_closeup3.png"))

    # 5. Header and description (top middle)
    header = img.crop((int(W * 0.05), 0, int(W * 0.72), int(H * 0.20)))
    header.save(os.path.join(out_dir, f"{name}_header.png"))

    # 6. Center layer breakdown (middle)
    center = img.crop((int(W * 0.36), int(H * 0.15), int(W * 0.72), int(H * 0.65)))
    center.save(os.path.join(out_dir, f"{name}_layers.png"))

    # 7. Bottom color palette
    bot = img.crop((int(W * 0.36), int(H * 0.65), int(W * 0.72), int(H * 1.0)))
    bot.save(os.path.join(out_dir, f"{name}_palette.png"))

print("Extracted all crops successfully!")
