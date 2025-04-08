# Portfolio v3

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## The Basics

### Typography

The project uses the following fonts:
- **Primary Font:** IBM Plex Mono (400, 500, 700) - Default body font
- **Display Font:** Black Han Sans (400) - Used for headings and display text

### Color Palette

The project uses a minimalist, high-contrast color palette based on yellow and grayscale tones. This approach creates a bold visual identity while maintaining readability and accessibility.

| Color Name | Hex Code | RGB | HSL | Usage |
|------------|----------|-----|-----|-------|
| Mustard | #FFE042 | rgba(255, 224, 66, 1) | hsla(50, 100%, 63%, 1) | Highlight elements, accents, call-to-actions |
| Lemon Chiffon | #FFF7D2 | rgba(255, 247, 210, 1) | hsla(49, 100%, 91%, 1) | Page backgrounds (light mode), cards |
| Cosmic Latte | #FFF5E1 | rgba(255, 245, 225, 1) | hsla(40, 100%, 94%, 1) | Secondary elements, subtle backgrounds |
| Onyx | #3B3B3B | rgba(59, 59, 59, 1) | hsla(0, 0%, 23%, 1) | Secondary text, borders, dividers |
| Jet | #2C2C2C | rgba(44, 44, 44, 1) | hsla(0, 0%, 17%, 1) | Main text, dark mode backgrounds |

#### Design Philosophy

This color palette represents a shift toward minimalism and boldness. The bright mustard yellow serves as a vibrant accent against the neutral grayscale colors, creating a dynamic visual hierarchy. The light backgrounds (Lemon Chiffon and Cosmic Latte) provide warmth and softness compared to pure white, while the dark grays (Onyx and Jet) offer depth without the harshness of pure black.

This approach:
- Creates strong visual contrast for better readability
- Uses a limited palette for design consistency
- Leverages yellow as an energetic, attention-grabbing accent
- Maintains a clean, modern aesthetic that scales well across different devices and contexts

#### CSS Variables

```css
:root {
  --mustard: #ffe042ff;
  --lemon-chiffon: #fff7d2ff;
  --cosmic-latte: #fff5e1ff;
  --onyx: #3b3b3bff;
  --jet: #2c2c2cff;
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
