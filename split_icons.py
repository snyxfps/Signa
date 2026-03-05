from PIL import Image
import os
import math

# Use the image found in the brain dir
img_path = r"C:\Users\silas.soares\.gemini\antigravity\brain\7f47a157-53d7-421f-bb47-a532ed1b24f9\media__1772735642694.png"
output_dir = r"c:\Users\silas.soares\OneDrive - Grupo Apisul\Documentos\Projetos Silas\Signa\signa-frontend\public\signs"

os.makedirs(output_dir, exist_ok=True)

# The layout:
# row 0: capricorn, libra, cancer, aries
# row 1: aquarius, scorpio, leo, taurus
# row 2: pisces, sagittarius, virgo, gemini
signs = [
    ["capricorn", "libra", "cancer", "aries"],
    ["aquarius", "scorpio", "leo", "taurus"],
    ["pisces", "sagittarius", "virgo", "gemini"],
]

img = Image.open(img_path).convert("RGBA")
width, height = img.size

print(f"Original image size: {width}x{height}")

# There are 4 columns and 3 rows, with some padding/margins
# plus there's a text "designed by freepik" at the bottom part.
# Let's crop to just the grid area so we can split easily.
# The grid starts after some top padding and ends before the text.
# Let's just cut exactly equal cells first to see if it works.
# But there might be white space borders. We can use getbbox or simply box the circles.
ROWS = 3
COLS = 4

# By visually analyzing the typical 4x3 grid Freepik image:
# Usually the icons occupy a specific block. We can crop to the bounding box of non-white pixels first,
# but the text is also non-white. Let's assume the top 80-90% of the image is the grid.
# The actual bottom is usually the logo and text.

# Crop text: let's assume bottom 10% is text. Let's just crop out the circles by looking at the coordinates!
# Actually we can do a smarter crop: split the entire image into a 4x3 grid ignoring the bottom 15% where the text usually lives.

# Because I cannot look at pixel locations easily, let me create a dynamic grid finder
def is_white(pixel, threshold=240):
    # check if pixel is mostly white
    return pixel[0] > threshold and pixel[1] > threshold and pixel[2] > threshold

grid_bottom_bound = int(height * 0.9) # Exclude the bottom 10%

cell_w = width / COLS
cell_h = grid_bottom_bound / ROWS

# Wait, let's refine: cut each cell, find the bounding box of the non-white content inside it.
for row in range(ROWS):
    for col in range(COLS):
        sign_name = signs[row][col]
        
        left = int(col * cell_w)
        upper = int(row * cell_h)
        right = int((col + 1) * cell_w)
        lower = int((row + 1) * cell_h)
        
        box = (left, upper, right, lower)
        cell = img.crop(box)
        
        # find bounding box of the actual circle (ignoring white background)
        # We can just convert to grayscale, invert, and get bbox
        # "mostly white" -> alpha = 0 for white pixels to crop
        
        datas = cell.getdata()
        new_data = []
        for item in datas:
            # Change white (also shades of white)
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0)) # Transparent
            else:
                new_data.append(item)
                
        cell.putdata(new_data)
        bbox = cell.getbbox()
        if bbox:
            cell = cell.crop(bbox)
            
        # Optional: resize to a predictable dimension like 128x128
        cell = cell.resize((128, 128), Image.Resampling.LANCZOS)
        
        cell.save(os.path.join(output_dir, f"{sign_name}.png"))
        print(f"Saved {sign_name}.png")

print("Done")
