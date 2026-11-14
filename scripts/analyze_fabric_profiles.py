import cv2
import numpy as np

# 1. Harmony
h_img = cv2.imread(r"UniVeloria-FE\public\debug_inspect\h_patch_clean.png", cv2.IMREAD_GRAYSCALE)
# Vertical ribs -> average across rows (axis 0) to get 1D horizontal profile
h_profile = np.mean(h_img, axis=0)
print(f"Harmony patch shape: {h_img.shape}")
print(f"Harmony mean: {np.mean(h_img):.1f}, min: {np.min(h_img)}, max: {np.max(h_img)}")
# Count peaks in horizontal profile
peaks = []
for i in range(1, len(h_profile)-1):
    if h_profile[i] > h_profile[i-1] and h_profile[i] > h_profile[i+1]:
        peaks.append(i)
print(f"Harmony peaks count in {len(h_profile)}px: {len(peaks)} (avg rib width: {len(h_profile)/len(peaks):.1f}px)")

# 2. Moon
m_img = cv2.imread(r"UniVeloria-FE\public\debug_inspect\m_patch_clean.png", cv2.IMREAD_GRAYSCALE)
print(f"Moon patch shape: {m_img.shape}")
print(f"Moon mean: {np.mean(m_img):.1f}, min: {np.min(m_img)}, max: {np.max(m_img)}")

# 3. Sunny
s_img = cv2.imread(r"UniVeloria-FE\public\debug_inspect\s_patch_clean.png", cv2.IMREAD_GRAYSCALE)
print(f"Sunny patch shape: {s_img.shape}")
print(f"Sunny mean: {np.mean(s_img):.1f}, min: {np.min(s_img)}, max: {np.max(s_img)}")
# Check horizontal vs vertical profile in Sunny
s_prof_x = np.mean(s_img, axis=0)
s_prof_y = np.mean(s_img, axis=1)
print(f"Sunny std x: {np.std(s_prof_x):.2f}, std y: {np.std(s_prof_y):.2f}")

