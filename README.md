# Solidjs-ethereum

This is my personal notes to create solidjs project to create Ethereum walllet.

1. Create SolidJS project

```
npm create vite@latest solid-ethereum -- --template solid-ts
```

2. Then, after project created

```
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-solid prettier
```

3. Then, initialize eslint

```
npm init @eslint/config
```

4. Then, check out the `.eslintrc.cjs`

5. Then create `.prettierrc.cjs` with the following contents:

```
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};
```

6.  Install `ethers` and `crypto-js`:

```
npm install ethers crypto-js
```
