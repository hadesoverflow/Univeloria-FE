for mod in ['pytesseract', 'easyocr', 'cv2']:
    try:
        __import__(mod)
        print(f'{mod}: available')
    except ImportError as e:
        print(f'{mod}: NOT available ({e})')
