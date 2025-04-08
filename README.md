# Portfolio v3

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## The Basics

### Typography

The project uses the following fonts:
- **Primary Font:** IBM Plex Mono (400, 500, 700) - Default body font
- **Display Font:** Black Han Sans (400) - Used for headings and display text

### Color Palette

The project uses the following nature-inspired color palette:

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|----------|-----|-----|-------|
| Brunswick Green | #344E41 | rgba(52, 78, 65, 1) | hsla(150, 20%, 25%, 1) | Dark backgrounds, footers |
| Fern Green | #588157 | rgba(88, 129, 87, 1) | hsla(119, 19%, 42%, 1) | Main elements, buttons |
| Tea Green | #CCD5AE | rgba(204, 213, 174, 1) | hsla(74, 32%, 76%, 1) | Secondary elements, highlights |
| Beige | #E9EDC9 | rgba(233, 237, 201, 1) | hsla(67, 50%, 86%, 1) | Light backgrounds, cards |
| Cornsilk | #FEFAE0 | rgba(254, 250, 224, 1) | hsla(52, 94%, 94%, 1) | Page backgrounds (light mode) |
| Papaya Whip | #FAEDCD | rgba(250, 237, 205, 1) | hsla(43, 82%, 89%, 1) | Subtle highlights, form elements |
| Buff | #D4A373 | rgba(212, 163, 115, 1) | hsla(30, 53%, 64%, 1) | Accent elements, call-to-actions |
| Coffee | #7F5539 | rgba(127, 85, 57, 1) | hsla(24, 38%, 36%, 1) | Dark accents, secondary text |
| Bistre | #402B1D | rgba(64, 43, 29, 1) | hsla(24, 38%, 18%, 1) | Main text, dark mode backgrounds |

#### CSS Variables

```css
:root {
  --brunswick-green: #344e41ff;
  --fern-green: #588157ff;
  --tea-green: #ccd5aeff;
  --beige: #e9edc9ff;
  --cornsilk: #fefae0ff;
  --papaya-whip: #faedcdff;
  --buff: #d4a373ff;
  --coffee: #7f5539ff;
  --bistre: #402b1dff;
}
```

### Branding

#### Favicon
The project uses a custom favicon located at `src/app/favicon.ico`.

#### Logo
         ░                                                  
         ░░▒▒                                               
         ░░▒▒░                                              
          ░▒▒░       ░░░             ░                      
           ░░         ░░              ░                     
           ▒▒░░░     ░░░▒           ░░░                     
           ░▒▒░▒░   ░░▒▒▒░░  ░░░   ▒▒░▒                     
         ░░░░░░░░   ░░░░░░░░░░░░░░░▒░░░                     
            ░░░░░   ░░░ ░░░░░░░░░░░░░ ░                     
            ░░░░░░░ ░░░░░░░░░░░░░░░░░░░                     
             ▒░▒▒▒▒░▒░░▒▒░░▒░░▒▒░░▒▒▒░▒░                    
            ░▒░▒▒▒▒░░░▒▒▒░▒▒  ▒▒▒▒▒ ░░▒▒░                   
             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░                   
              ░░░░░░░░░░░░░░░░░░░░░░░░░░                    
            ░░░▒▒▒▒▒▒░▒▒▒░▒▒▒▒▒▒░▒▒▒▒░▒░                    
            ░▒░▒▒▒▒▒▒░▒▒▒░▒▒▒▒▒▒░▒▒▒▒░░                     
           ░▒▒░▒▒▒▒▒▒░░▒▒░░▒▒▒▒▒░░▒▒▒░                      
         ░░░░░░░░░░░░░░░░░░░░░░░░░░░░                       
      ░░▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒░▒▒▒▒▒▒░░▒▒▒░                      
       ░▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒░░▒▒▒▒▒░░▒▒▒░░                     
      ▒▒▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒░░▒▒▒▒▒░░▒▒▒░▒▒                    
      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                   
     ▒▒░░░░▒▒░░░▒▒▒▒░░░▒▒░░▒▒▒▒▒░░▒▒▒░▒▒▒░                  
     ▒▒▒▒▒░▒▒░ ░▒▒▒▒▒░▒▒▒░▒▒▒▒▒▒░░▒▒▒░▒▒▒▒░                 
   ░▒▒▒▒▒▒░░   ░▒▒▒▒▒░░▒▒░░▒▒░░   ░▒▒░▒▒▒▒▒░                
   ░░░░░░░      ░░░░░░░░            ░░░░░░░░░               
   ░░░░░░       ░░▒░░░░░░             ░░░░░░░░░             
 ░░░▒▒▒▒░        ▒▒▒▒░░▒░              ▒▒▒▒░░▒░░░░          
 ░░░▒▒▒▒░        ▒▒▒▒░░▒▒               ░▒▒░░▒▒▒░░░         
 ░░░░░░░        ░░░░░░░░░░░               ░░░░░░░░░         
  ░░░░░         ░░░░░░░░░░                ░░░░░░░░░         
 ░              ░▒▒▒░░░                    ░  ░░░           
                                                            

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom Google Fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
