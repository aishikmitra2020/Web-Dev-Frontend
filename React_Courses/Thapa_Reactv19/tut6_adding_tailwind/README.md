# How to add Tailwind CSS in ReactJS? (Tailwind v4.0)
Folow: <https://tailwindcss.com/docs/installation/using-vite>

1. **Install** the dependencies:
```bash
npm install tailwindcss @tailwindcss/vite
```

2. **Add** these below lines in `vite.config.ts`
```js
import tailwindcss from '@tailwindcss/vite
```
```js
plugins: [
    tailwindcss(),
]
```

3. To be able to use the tailwind CSS in css files (add the given line at the **very top of your css file**):
```css
@import "tailwindcss";
```

4. To get tailwind **code completions**, **suggestions** and to use **customize tailwind properly**, create a new file named `tailwind.config.js` in the parent project directory


5. Now you are good to go!!!