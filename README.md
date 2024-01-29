# spa-cats-gallery

Gets data from this APIs and shows cats info:

- https://catfact.ninja/
- https://cataas.com/

## Run Locally

Clone the project

```bash
  git clone https://github.com/sramilo/spa-cats-gallery.git
```

Go to the project directory

```bash
  cd spa-cats-gallery
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Want to create your own?

Create project with vite (Vanilla Javascript template)

```bash
  npm create vite@latest
```

Go to the project directory

```bash
  cd spa-cats-gallery
```

Install react plugin

```bash
  npm install @vitejs/plugin-react -E
```

Install react dependencies

```bash
  npm install react react-dom -E
```

Create vite.config.js with

```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()]
  })
```

Create react app entry point in main.jsx (rename file extension and update index.html route)

```js
  import { createRoot } from 'react-dom/client'
  import { App } from './src/App.jsx'

  const root = createRoot(document.getElementById('app'))

  root.render(<App />)
```

Install your favorite linter and config your IDE

```bash
  npm install standard -DE
```

Add linter config to package.json

```json
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
```
