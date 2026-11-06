from pathlib import Path
from PIL import Image, ImageDraw

root = Path(r"C:\Users\nfiya\Documents\Codex\2026-11-05\i-x20")
files = sorted((root / "public/assets/official").glob("*")) + sorted((root / "assets").glob("*"))
tiles = []
for path in files:
    try:
        image = Image.open(path).convert("RGB")
        size = image.size
        image.thumbnail((200, 125))
        tile = Image.new("RGB", (220, 165), "white")
        tile.paste(image, ((220-image.width)//2, 4))
        ImageDraw.Draw(tile).text((6, 132), f"{path.name} {size[0]}x{size[1]}", fill="black")
        tiles.append(tile)
    except Exception:
        pass
cols = 4
sheet = Image.new("RGB", (cols*220, ((len(tiles)+cols-1)//cols)*165), "#ddd")
for i, tile in enumerate(tiles):
    sheet.paste(tile, ((i%cols)*220, (i//cols)*165))
sheet.save(root / "work/assets-contact.jpg", quality=88)
