# TaskChan

TaskChan is a modern web application built with the latest technologies to provide a seamless user experience.

####

LocalStroge is not Working like data is not saved on a page Reload , i have tried to solve that but haven't found any relevant Results .. Thank You

## Technologies Used

- **Vite**: A fast build tool and development server.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **ShadCN**: A component library for building user interfaces.
- **Sonner Toasts**: A library for creating beautiful toast notifications.

## Getting Started

To get started with TaskChan, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/IshakShekh97/taskchan.git
   cd taskchan
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the development server**:

   ```sh
   npm run dev
   ```

4. **Build for production**:
   ```sh
   npm run build
   ```

## Configuration

### ESLint Configuration

To ensure code quality and consistency, TaskChan uses ESLint with the following configuration:

```js
// eslint.config.js
import tseslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
