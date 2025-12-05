# 🎄 Christmas Tree Animation

A beautiful, interactive Christmas tree animation web app built with React and Canvas. Features a stunning animated Christmas tree with colorful ornaments, falling snowflakes, and synchronized song lyrics with typewriter effect.

## ✨ Features

- **Animated Christmas Tree**: Beautifully rendered tree with colorful blinking ornaments
- **Falling Snowflakes**: Realistic snow animation with drift effect
- **Typewriter Effect**: Song lyrics appear character by character for dramatic effect
- **Smooth Animations**: 60 FPS animations powered by Canvas rendering
- **Responsive Design**: Works on desktop with beautiful styling
- **Dark Theme**: Elegant dark background with vibrant neon colors

## 🎵 Lyrics

The app displays lyrics synced to the Christmas song:

```
A face-on lover
With a fire in his heart
A man undercover
But you tore me apart

Ooh-ooh
Now I've found a real love
You'll never fool me again
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd christmas-tree-app
npm install
```

### Running the App

```bash
npm start
```

The app will open at `http://localhost:3000`

## 🎨 Customization

### Change Lyrics
Edit the `lyricsData` array in `ChristmasTree.jsx`

### Adjust Colors
Modify color constants in the component

### Change Animation Speed
Adjust the `typewriterSpeed` constant

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Go to vercel.com
3. Import your repository
4. Click Deploy

### Netlify
1. Run `npm run build`
2. Drag build folder to netlify.com

### GitHub Pages
Add to package.json and run `npm run deploy`

## 🛠️ Available Scripts

- `npm start` - Runs development server
- `npm run build` - Builds optimized production bundle
- `npm test` - Runs tests

## 🎯 How It Works

Uses HTML5 Canvas to render:
- **Snowflakes**: Particles that fall and drift naturally
- **Tree Ornaments**: Animated dots that pulse and change colors
- **Lyrics**: Text with typewriter animation synchronized to time

The canvas updates at 60 FPS for smooth animations.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎄 Technologies Used

- React 18
- HTML5 Canvas for animations
- CSS3 for styling
- JavaScript ES6+

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Pull requests are welcome! Feel free to add features, improve animations, fix bugs, or add new songs.

## 🎅 Holiday Spirit

Made with ❤️ during the Christmas season. Spread the holiday cheer! 🎄✨

---

**Play your favorite Christmas song while watching the animation for the best experience!** 🎵
