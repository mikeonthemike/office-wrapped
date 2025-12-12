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
- **Zip Downloads**: JSZip
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
│   │   ├── layout.tsx              # Root layout with SEO
│   │   ├── page.tsx                # Main page
│   │   ├── globals.css             # Global styles
│   │   ├── fonts/                  # Custom fonts (Geist)
│   │   ├── opengraph-image.tsx     # Dynamic OG image
│   │   └── twitter-image.tsx       # Dynamic Twitter card
│   ├── components/
│   │   ├── OfficeWrapped.tsx       # Main orchestrator component
│   │   ├── SlideContent.tsx        # Slide content renderer
│   │   ├── icons/
│   │   │   └── index.tsx           # Custom SVG icons (Twitter, LinkedIn)
│   │   ├── slides/
│   │   │   ├── index.ts            # Barrel export
│   │   │   ├── IntroSlide.tsx      # Welcome slide
│   │   │   ├── MeetingsSlide.tsx   # Meetings stats slide
│   │   │   ├── NotificationsSlide.tsx # Notifications slide
│   │   │   ├── EmailsSlide.tsx     # Email stats slide
│   │   │   ├── ProductivitySlide.tsx # Productivity slide
│   │   │   ├── StatusSlide.tsx     # Status/availability slide
│   │   │   ├── BuzzwordsSlide.tsx  # Corporate buzzwords slide
│   │   │   └── SummarySlide.tsx    # Year summary slide
│   │   └── ui/
│   │       ├── index.ts            # Barrel export
│   │       ├── ControlButtons.tsx  # Randomize/download controls
│   │       ├── Footer.tsx          # App footer
│   │       ├── ProgressBar.tsx     # Slide progress indicator
│   │       ├── ShareMenu.tsx       # Social sharing menu
│   │       ├── SlideCard.tsx       # Slide container card
│   │       └── SlideNavigation.tsx # Prev/next navigation
│   ├── hooks/
│   │   ├── index.ts                # Barrel export with types
│   │   ├── useOfficeWrappedData.ts # Data state management
│   │   ├── useSlideActions.ts      # Download/share actions
│   │   └── useSlideNavigation.ts   # Slide navigation logic
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   └── types/
│       └── index.ts                # TypeScript types
├── public/                         # Static assets
├── tailwind.config.ts              # Tailwind configuration
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

Update the `YEAR` constant in `src/components/OfficeWrapped.tsx`:

```typescript
const YEAR = 2025; // Change to desired year
```

### Adding New Slides

1. Add new slide data interface in `src/types/index.ts`
2. Create a new slide component in `src/components/slides/` (e.g., `NewSlide.tsx`)
3. Export the new slide from `src/components/slides/index.ts`
4. Add the slide case to `src/components/SlideContent.tsx`
5. Update the data hook in `src/hooks/useOfficeWrappedData.ts` if needed

### Modifying Stats Ranges

- Edit `src/lib/utils.ts` to adjust random number ranges for stats (meetings, emails, productivity, etc.)
- Edit `src/hooks/useOfficeWrappedData.ts` to modify the buzzword pool (`BUZZWORD_POOL`) and status excuses (`STATUS_EXCUSES_POOL`)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for your own corporate survival needs.

## Disclaimer

This is a satirical project for entertainment purposes. Any resemblance to actual corporate suffering is purely coincidental (and probably accurate).

---

Made with ☕ and existential dread
