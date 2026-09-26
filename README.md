# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

<<<<<<< HEAD
## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
=======
- **Sayf** — Lead, Database Backend 
- **Lamees** - General Backend Developer
- **Dany** — Frontend Developer
- **Youssef** - General Backend Developer 
- **Krish** - Frontend Developer
- **Kaila** - Database Backend

## Set up
**Step 1: clone and pull the latest code**
- Ensure you're on the Main branch by running this on the terminal and have the latest update by running:
 ```bash
  git checkout main
  git pull origin main
  ```

**Step 2: Create a virtual environment**
- Run this on your terminal:
  ```bash
  python3 -m venv .venv
  ```

**Step 3: Activate virtual Environment**
- Ensure you're inside the (.venv) by running this on your terminal: (afterwards you should see  "(.venv)" at the beginning of the line)
  ```bash
  source .venv/bin/activate
  ```



**Step 4: install all dependencies**
 - Once inside (.venv) run this to install all dependencies:
```bash
  pip install -r requirements.txt
  ```

**Step 5: Connecting to the database**

- In the root directory of the project, create a new file named exactly ".env" . Add your database connection link to the file by simply copy-pasting it in. 

>>>>>>> ad461b0f3cd51b068fa16374df7b4b9f2328f665
