# **Learnovate**

## **contents**

- [**introduction**](#introduction)
- [**installation**](#installation)
- [**folder structure**](#folder-structure)
- [**contributing**](#contributing)

## **introduction**

Learnovate is an educational web application that allows users to learn new skills and languages through a variety of courses. Users can create an account and log in to access the courses.

## **installation**

To run this project, you will need to have [**Node.js**](https://nodejs.org/en) and [**pnpm**](https://pnpm.io/) installed on your machine, then follow these steps:

1. Clone the repository

```
git clone <repo_url>
```

2. Install the dependencies

```
pnpm install
```

3. Start the server

```
pnpm dev
```

## **folder structure**

The project is structured as follows:

- **.husky**: contains the configuration for [**husky**](https://typicode.github.io/husky/#/) which is used to run scripts before git commands.
- **public**: contains the static files.
- **node_modules**: contains the dependencies.
- **src**: contains the source code.
  - **components**: contains all the resuable components such as ui, icons, etc.
  - **layouts**: contains the layouts of the pages.
  - **pages**: contains the pages.
    - **_index.tsx_**: contains the root of each page.
    - **_styles_** `if needed`: contains the styles.
    - **_components_**: contains the components that are used in the pages.
  - **redux**: contains the redux store.
    - **_store.ts_**: contains the store.
    - **reducers**: contains the reducers.
    - **types** `if needed`: contains the types.
  - **hooks**: contains the custom hooks.
  - **utils**: contains the utility functions.
  - **schemas**: contains the schemas for the data such as login, register, etc.
  - **router.tsx**: contains the router.
  - **main.tsx**: contains the root of the application.
  - **index.css**: contains the global styles.
- **index.html**: contains the html template.
- **.env**: contains the environment variables.
- **.eslintrc**: contains the configuration for [**eslint**](https://eslint.org/).
- **.gitignore**: contains the files and folders that are ignored by git.
- **.prettierrc**: contains the configuration for [**prettier**](https://prettier.io/).
- **package.json**: contains the scripts and the dependencies.
- **pnpm-lock.yaml**: contains the dependencies tree.
- **README.md**: contains the documentation.
- **tsconfig.json**: contains the configuration for [**typescript**](https://www.typescriptlang.org/).
- **vite.config.ts**: contains the configuration for [**vite**](https://vitejs.dev/).
- **tailwind.config.ts**: contains the configuration for [**tailwindcss**](https://tailwindcss.com/).
- **postcss.config.js**: contains the configuration for [**postcss**](https://postcss.org/).

```
|-- .husky
|   |-- pre-commit
|   |-- pre-push
|-- public
|   |-- favicon.ico
|   |-- robots.txt
|-- node_modules
|-- src
|   |-- components
|   |   |-- icons
|   |   |-- ui
|   |-- hooks
|   |-- layouts
|   |-- pages
|   |   |-- index.tsx
|   |   |-- components
|   |   |-- styles
|   |-- redux
|   |   |-- store.ts
|   |   |-- reducers
|   |   |-- types
|   |-- schemas
|   |-- utils
|   |-- router.tsx
|   |-- main.tsx
|   |-- index.css
|-- .env
|-- .eslintrc
|-- .gitignore
|-- .prettierrc
|-- package.json
|-- pnpm-lock.yaml
|-- README.md
|-- tsconfig.json
|-- vite.config.ts
|-- tailwind.config.ts
|-- postcss.config.js

```

## **contributing**

Contributions are always welcome! Feel free to open a new issue or submit a pull request.
