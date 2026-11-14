import os
from PIL import Image

src_map = {
    'modernstripe': r'C:/Users/songn/.gemini/antigravity/brain/0934d00b-5565-4f6a-9197-342000854c1c/.user_uploaded/media_1794649767689_50f87e46.jpg',
    'nordicray': r'C:/Users/songn/.gemini/antigravity/brain/0934d00b-5565-4f6a-9197-342000854c1c/.user_uploaded/media_1794649767691_b45c07d4.jpg',
    'sunnyview': r'C:/Users/songn/.gemini/antigravity/brain/0934d00b-5565-4f6a-9197-342000854c1c/.user_uploaded/media_1794649767716_81fa51ca.jpg',
    'rivere': r'C:/Users/songn/.gemini/antigravity/brain/0934d00b-5565-4f6a-9197-342000854c1c/.user_uploaded/media_1794649767718_387818f0.jpg',
    'goldenweave': r'C:/Users/songn/.gemini/antigravity/brain/0934d00b-5565-4f6a-9197-342000854c1c/.user_uploaded/media_1794649767721_63c8d0bb.jpg'
}

curtains_dir = r'UniVeloria-FE/public/assets/curtains'
product_dir = r'UniVeloria-FE/public/product/Rèm/Rèm Cầu Vòng'
os.makedirs(curtains_dir, exist_ok=True)
os.makedirs(product_dir, exist_ok=True)

name_map = {
    'modernstripe': ('curtain-rainbow-modernstripe.jpg', 'Rèm cầu vồng ModernStripe'),
    'nordicray': ('curtain-rainbow-nordicray.jpg', 'Rèm cầu vồng NordicRay'),
    'sunnyview': ('curtain-rainbow-sunnyview.jpg', 'Rèm cầu vồng SunnyView'),
    'rivere': ('curtain-rainbow-rivere.jpg', 'Rèm Cầu Vồng River.E'),
    'goldenweave': ('curtain-rainbow-goldenweave.jpg', 'Rèm cầu vồng GoldenWeave')
}

for k, src_path in src_map.items():
    curtain_fn, prod_base = name_map[k]
    img = Image.open(src_path)
    
    # Save to public/assets/curtains
    target1 = os.path.join(curtains_dir, curtain_fn)
    img.save(target1, 'JPEG', quality=95)
    
    # Save to public/product/Rèm/Rèm Cầu Vòng (.jpg and .png)
    target_jpg = os.path.join(product_dir, prod_base + '.jpg')
    target_png = os.path.join(product_dir, prod_base + '.png')
    img.save(target_jpg, 'JPEG', quality=95)
    img.save(target_png, 'PNG', optimize=True)
    print(f'Processed {k}: {target1}, {target_jpg}, {target_png}')

print('All 5 rainbow curtain images processed successfully!')

