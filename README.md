# For Galileo 💗

A small interactive website made as a personal birthday apology + appreciation gift.

## What's in this folder

```
index.html   → the structure/content of the site
style.css    → all colors, fonts, and animations
script.js    → passcode logic, petal effects, scroll reveals, flip cards
```

No build tools, no frameworks, no backend — just open the file in a browser.

## How to view it

Download all three files into the **same folder** (they reference each other), then double-click `index.html` to open it in any browser. That's it.

If you want to share it with Galileo directly, you have two easy options:
- **Email/AirDrop the folder** — she opens `index.html` the same way.
- **Host it for free** — drag the folder into [netlify.com/drop](https://app.netlify.com/drop) and it gives you a real link in seconds. No account needed for a quick drop.

## The passcode

The unlock code is `0715` — Galileo's birthday (July 15), hinted at (but not spelled out) on the gate screen. It's checked entirely in `script.js`, so it's beginner-friendly to read but not real security — anyone who opens the file's code could see it. That's fine for a gift like this.

To change the code, open `script.js` and edit this line near the top:
```js
const CORRECT_CODE = "0715";
```

## Easy things to customize

**The "Galileo-coded" cards** — near the bottom of `script.js`, in the `codedItems` list. Add, remove, or edit any line:
```js
{ label: "debating", back: "obviously." },
```

**Colors** — at the very top of `style.css`, under `:root`. Everything in the site pulls from these few values:
```css
--burgundy-deep: #4a0f28;
--pink-soft:     #f3cbd2;
--rose-dusty:    #c98a93;
--cream:         #fbf2ea;
```

**Any of the written lines** (apology, appreciation list, final message) — these live directly in `index.html`, inside their matching `<section>`.

## How the interesting parts work

- **Passcode boxes**: 4 separate inputs that auto-jump to the next box as you type, and check the full code once all 4 are filled.
- **Unlock animation**: a burgundy "curtain" slides up over the screen, then sweeps away to reveal the real site underneath.
- **Scroll reveals**: sections fade/slide in the first time they scroll into view, using the browser's built-in `IntersectionObserver` — no scroll-tracking libraries needed.
- **Flip cards**: each "Galileo-coded" card is one element with a front and back face; clicking toggles a CSS class that rotates it 180°.

All of this is commented directly in `script.js` if you want to trace through exactly what each part does.
