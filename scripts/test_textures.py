import math
import os
from PIL import Image, ImageDraw

out_dir = r"UniVeloria-FE\public\debug_inspect"
os.makedirs(out_dir, exist_ok=True)

# 1. Harmony 2 (Fine Vertical Ribs / Pinstripes)
def gen_harmony(base_rgb=(197, 203, 207), is_bump=False):
    img = Image.new('RGB', (512, 512), (128, 128, 128) if is_bump else base_rgb)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    num_ribs = 32
    rib_step = 512 / num_ribs  # 16px per rib
    
    for i in range(num_ribs):
        x = i * rib_step
        # Rib highlight on crest (center)
        # Gradient across the 16px rib
        for dx in range(int(rib_step)):
            t = dx / rib_step  # 0 to 1
            # sine arch for cylindrical rib
            arch = math.sin(t * math.pi)
            if is_bump:
                v = int(100 + arch * 120)
                draw.line([(x + dx, 0), (x + dx, 512)], fill=(v, v, v, 255))
            else:
                if arch > 0.5:
                    alpha = int((arch - 0.5) * 2 * 90)
                    draw.line([(x + dx, 0), (x + dx, 512)], fill=(255, 255, 255, alpha))
                else:
                    alpha = int((0.5 - arch) * 2 * 70)
                    draw.line([(x + dx, 0), (x + dx, 512)], fill=(0, 0, 0, alpha))
        
        # Subtle crevice between ribs
        crevice_alpha = 110 if not is_bump else 255
        crevice_color = (0, 0, 0, crevice_alpha) if not is_bump else (40, 40, 40, 255)
        draw.line([(x, 0), (x, 512)], fill=crevice_color, width=1)
    
    # Cross fine binder threads (horizontal weft) every 6px
    for y in range(0, 512, 6):
        draw.line([(0, y), (512, y)], fill=(0, 0, 0, 25) if not is_bump else (115, 115, 115, 255), width=1)
        
    return img

# 2. Moon (Diagonal Twill / Diamond Pique Weave)
def gen_moon(base_rgb=(240, 242, 245), is_bump=False):
    img = Image.new('RGB', (512, 512), (128, 128, 128) if is_bump else base_rgb)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    step = 10
    # Diagonal 45 deg lines
    for offset in range(-512, 1024, step):
        # Line from (offset, 0) to (offset + 512, 512)
        # Highlight flank
        draw.line([(offset, 0), (offset + 512, 512)], 
                  fill=(255, 255, 255, 75) if not is_bump else (200, 200, 200, 255), width=2)
        # Shadow groove
        draw.line([(offset + 2, 0), (offset + 514, 512)], 
                  fill=(0, 0, 0, 65) if not is_bump else (70, 70, 70, 255), width=2)

    # Counter-diagonal -45 deg lines for diamond twill intersections
    for offset in range(0, 1024, step):
        # Line from (offset, 0) to (offset - 512, 512)
        draw.line([(offset, 0), (offset - 512, 512)], 
                  fill=(255, 255, 255, 45) if not is_bump else (170, 170, 170, 255), width=1)
        draw.line([(offset + 2, 0), (offset - 510, 512)], 
                  fill=(0, 0, 0, 50) if not is_bump else (85, 85, 85, 255), width=1)

    return img

# 3. Sunny (Oxford Canvas / Linen Grain Weave)
def gen_sunny(base_rgb=(190, 195, 200), is_bump=False):
    img = Image.new('RGB', (512, 512), (128, 128, 128) if is_bump else base_rgb)
    draw = ImageDraw.Draw(img, 'RGBA')
    
    cell_size = 16  # 32 cells across 512px
    num_cells = 32
    
    for r in range(num_cells):
        for c in range(num_cells):
            bx = c * cell_size
            by = r * cell_size
            is_horizontal_yarn = ((r + c) % 2 == 0)
            
            if is_horizontal_yarn:
                # Horizontal yarn segment
                if is_bump:
                    draw.rectangle([bx, by, bx + cell_size - 1, by + cell_size - 1], fill=(160, 160, 160, 255))
                    draw.line([(bx, by + cell_size//2), (bx + cell_size, by + cell_size//2)], fill=(230, 230, 230, 255), width=2)
                    draw.line([(bx, by), (bx + cell_size, by)], fill=(70, 70, 70, 255), width=1)
                    draw.line([(bx, by + cell_size - 1), (bx + cell_size, by + cell_size - 1)], fill=(70, 70, 70, 255), width=1)
                else:
                    draw.rectangle([bx + 1, by + 1, bx + cell_size - 2, by + cell_size - 2], fill=(255, 255, 255, 35))
                    draw.line([(bx, by + cell_size//2), (bx + cell_size, by + cell_size//2)], fill=(255, 255, 255, 55), width=2)
                    # Crease borders
                    draw.line([(bx, by), (bx + cell_size, by)], fill=(0, 0, 0, 60), width=1)
                    draw.line([(bx, by + cell_size - 1), (bx + cell_size, by + cell_size - 1)], fill=(0, 0, 0, 60), width=1)
            else:
                # Vertical yarn segment
                if is_bump:
                    draw.rectangle([bx, by, bx + cell_size - 1, by + cell_size - 1], fill=(135, 135, 135, 255))
                    draw.line([(bx + cell_size//2, by), (bx + cell_size//2, by + cell_size)], fill=(210, 210, 210, 255), width=2)
                    draw.line([(bx, by), (bx, by + cell_size)], fill=(60, 60, 60, 255), width=1)
                    draw.line([(bx + cell_size - 1, by), (bx + cell_size - 1, by + cell_size)], fill=(60, 60, 60, 255), width=1)
                else:
                    draw.rectangle([bx + 1, by + 1, bx + cell_size - 2, by + cell_size - 2], fill=(0, 0, 0, 25))
                    draw.line([(bx + cell_size//2, by), (bx + cell_size//2, by + cell_size)], fill=(255, 255, 255, 45), width=2)
                    draw.line([(bx, by), (bx, by + cell_size)], fill=(0, 0, 0, 60), width=1)
                    draw.line([(bx + cell_size - 1, by), (bx + cell_size - 1, by + cell_size)], fill=(0, 0, 0, 60), width=1)
                    
            # Corner pit shadow
            draw.rectangle([bx, by, bx+1, by+1], fill=(0, 0, 0, 90) if not is_bump else (30, 30, 30, 255))
            
    return img

h = gen_harmony()
h.save(os.path.join(out_dir, "test_harmony_diffuse.png"))

m = gen_moon()
m.save(os.path.join(out_dir, "test_moon_diffuse.png"))

s = gen_sunny()
s.save(os.path.join(out_dir, "test_sunny_diffuse.png"))

print("Generated all 3 test diffuse textures!")
