from pathlib import Path
import cv2
from PIL import Image, ImageDraw

videos = [
    Path(r"C:\Users\nfiya\Downloads\WhatsApp Video 2026-11-01 at 9.23.45 PM.mp4"),
    Path(r"C:\Users\nfiya\Downloads\WhatsApp Video 2026-11-01 at 9.23.44 PM.mp4"),
]
out = Path(r"C:\Users\nfiya\Documents\Codex\2026-11-05\i-x20\work")
for vi, path in enumerate(videos, 1):
    cap = cv2.VideoCapture(str(path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 1
    count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    duration = count / fps if fps else 0
    times = [duration * i / 7 for i in range(8)]
    frames = []
    for t in times:
        cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
        ok, frame = cap.read()
        if ok:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(frame)
            image.thumbnail((480, 300))
            tile = Image.new("RGB", (500, 340), "white")
            tile.paste(image, ((500-image.width)//2, 25))
            ImageDraw.Draw(tile).text((10, 8), f"{t:.1f}s", fill="black")
            frames.append(tile)
    cap.release()
    sheet = Image.new("RGB", (1000, 1360), "#ddd")
    for i, frame in enumerate(frames):
        sheet.paste(frame, ((i % 2)*500, (i//2)*340))
    sheet.save(out / f"video-{vi}-contact.jpg", quality=88)
    print(path.name, f"duration={duration:.1f}s", f"frames={len(frames)}")
