# Converting WBClemente Image to WebP with Transparency

## Option 1: Using Online Tools (Easiest)

1. Go to [Remove.bg](https://www.remove.bg/) or [Canva](https://www.canva.com/)
2. Upload `src/assets/images/WBClemente.JPG`
3. Remove the background to make it transparent
4. Download as WebP format
5. Save as `WBClemente.webp` in `src/assets/images/`

## Option 2: Using Photoshop/GIMP

1. Open `WBClemente.JPG` in your image editor
2. Use magic wand or background eraser to remove background
3. Export as WebP with transparency enabled
4. Save as `WBClemente.webp` in `src/assets/images/`

## Option 3: Install ImageMagick (Command Line)

```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Convert JPG to WebP with transparency
magick src/assets/images/WBClemente.JPG -fuzz 10% -transparent white src/assets/images/WBClemente.webp
```

## After Conversion

Once you have the `WBClemente.webp` file, the website will automatically use the transparent version on the black t-shirts and hoodies.

## Benefits of WebP with Transparency

- Smaller file size than PNG
- Better compression than JPG
- Supports transparency
- Modern browser support
- Cleaner look on colored backgrounds
