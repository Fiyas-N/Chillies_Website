# Chillies Restaurant React website

This responsive homepage is built with React and Vite. The page uses reusable components for the navigation, hero, menu, story, locations, reviews, social gallery, and footer.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

Lenis handles smooth wheel and anchor scrolling. GSAP ScrollTrigger animates section reveals and the signature dish parallax, synchronized through the Lenis frame loop. The menu and locations use horizontally scrollable cards with arrow and dot controls, and a floating back-to-top control appears while scrolling. The navigation scrolls away as shown in the video references. Motion respects reduced-motion preferences.

The supplied boards guide the layout and illustration crops. The official Chillies logo, favicon and usable menu photos are bundled in `public/assets/official/`, downloaded from the [live site](https://chilliesgroup.com/). The page uses board crops as visual fallbacks for products whose official files are promotional posters. Branch names, addresses, phone numbers and order links use the published site details. Cormorant Garamond carries display headlines and DM Sans handles body copy and navigation, with local fallbacks when offline.

