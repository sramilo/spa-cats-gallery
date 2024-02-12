# spa-cats-gallery

Gets data from IMGUR API with OAUTH 2.0 and shows cats info:

- https://apidocs.imgur.com/

## Tech Stack

![react + redux + oauth2.0 + html5 + css3 + sass + javascript + express + nodejs + vite](https://github.com/sramilo/spa-cats-gallery/blob/develop/public/techstack.png?raw=true)


## Run Locally

Clone the project

```bash
  git clone https://github.com/sramilo/spa-cats-gallery.git
```

Go to the project directory

```bash
  cd spa-cats-gallery
```

Create an Imgur account and follow the steps defined [here](https://apidocs.imgur.com/#authorization-and-oauth)

Once you have client_id and client_secret, create a .env file in project root folder with the following:

```
IMGUR_CLIENT_ID=<your imgur client id>
IMGUR_CLIENT_SECRET=<your imgur client secret>
REDIRECT_URL=http://localhost:5173/auth/callback
CLIENT_URL=http://localhost:5173
TOKEN_SECRET=<any random string>
AUTH_URL=https://api.imgur.com/oauth2/authorize
ACCESS_TOKEN_URL=https://api.imgur.com/oauth2/token

VITE_REACT_APP_SERVER_URL = http://localhost:5000
``` 

### Run React SPA

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

### Run express server

Start the server

```bash
  node src/server.js
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
