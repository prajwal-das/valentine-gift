# Valentine's Day Website ❤️

A beautiful, romantic website created for Valentine's Day 2026.

## Features

- Romantic love letter section
- "Reasons Why I Love You" with 6 customizable reasons
- Timeline of your relationship journey
- Photo gallery section
- Floating hearts animations
- Responsive design for all devices
- Elegant pink and purple color scheme

## Customization Guide

### 1. Personalize the Love Letter
Edit `index.html` around line 21-26 to change the love letter message.

### 2. Update "Reasons Why I Love You"
Edit the reasons in `index.html` starting at line 34. Each reason has:
- A number (automatically styled)
- A title
- A description

### 3. Customize the Timeline
Edit the timeline events in `index.html` starting at line 69. Update:
- The date labels
- Event titles
- Descriptions

### 4. Add Your Photos
To add your actual photos:
1. Create an `images` folder in this directory
2. Add your photos (name them: photo1.jpg, photo2.jpg, etc.)
3. Replace the photo placeholders in `index.html` around line 105:

```html
<!-- Replace this: -->
<div class="photo-placeholder">
    <span>Photo 1</span>
</div>

<!-- With this: -->
<div class="photo-placeholder" style="background-image: url('images/photo1.jpg'); background-size: cover; background-position: center;">
</div>
```

## Hosting Options

### Option 1: GitHub Pages (Free & Easy)

1. Create a GitHub account if you don't have one
2. Create a new repository called `valentines-2026`
3. Upload all files to the repository
4. Go to Settings → Pages
5. Select "main" branch as source
6. Your site will be live at: `https://yourusername.github.io/valentines-2026`

### Option 2: Netlify (Free & Drag-and-Drop)

1. Go to [netlify.com](https://netlify.com)
2. Sign up for free
3. Drag and drop this entire folder
4. Get instant live URL

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import this repository
4. Deploy with one click

## Local Testing

To view the website locally:
1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Tips

- Test the website before sharing to ensure all customizations look perfect
- Consider the timing of when you'll share the link with your girlfriend
- You can send the link via text, email, or even create a QR code to it
- The website works on phones, tablets, and computers

## Made with ❤️

Created with love for Valentine's Day 2026
