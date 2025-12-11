# Office Wrapped 🏢

A satirical "Year in Review" generator for corporate life. Create and share your fictional office stats - because we all know those meetings could have been emails.

![Office Wrapped Preview](https://office-wrapped.vercel.app/opengraph-image)

## Features

- 🎴 **8 Interactive Slides** - From meetings to buzzwords, relive your corporate year
- 🎲 **Randomize Stats** - Generate new fictional stats with one click
- 📸 **Download Slides** - Save individual slides or all slides as images
- 📱 **Social Sharing** - Share directly to Twitter/X and LinkedIn
- 🎨 **Beautiful UI** - Modern, responsive design with smooth transitions
- 🔍 **SEO Optimized** - Full Open Graph and Twitter Card support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Generation**: html2canvas
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/office-wrapped.git
cd office-wrapped
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
office-wrapped/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Main page
│   │   ├── globals.css         # Global styles
│   │   ├── opengraph-image.tsx # Dynamic OG image
│   │   └── twitter-image.tsx   # Dynamic Twitter card
│   ├── components/
│   │   └── OfficeWrapped.tsx   # Main component
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript types
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
└── package.json
```

## Slide Content

1. **Intro** - Welcome to your year in corporate survival
2. **Meetings** - The "Could Have Been an Email" edition
3. **Notifications** - Your after-hours notification journey
4. **Emails** - The inbox apocalypse
5. **Productivity** - Your "productive" hours
6. **Status** - The art of being "away"
7. **Buzzwords** - Your top corporate buzzwords
8. **Summary** - Congratulations, you survived!

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/office-wrapped)

Or deploy manually:

1. Push to GitHub
2. Import to Vercel
3. Deploy!

## Customization

### Changing the Year

Update the `year` state in `src/components/OfficeWrapped.tsx`:

```typescript
const [year] = useState(2024); // Change to desired year
```

### Adding New Slides

1. Add new slide data interface in `src/types/index.ts`
2. Add slide to the `slides` array in `OfficeWrapped.tsx`
3. Create the slide content JSX in the component

### Modifying Stats Ranges

Edit the randomization functions in `src/lib/utils.ts` to adjust the random number ranges.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your own corporate survival needs.

## Disclaimer

This is a satirical project for entertainment purposes. Any resemblance to actual corporate suffering is purely coincidental (and probably accurate).

---

Made with ☕ and existential dread
