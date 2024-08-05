# Web Development Sandbox

Playground project to test out web frameworks, patterns and more.

## Getting started

### Prerequisites

- [NodeJS](https://nodejs.org/)
  - This will also install `npm`, make sure both are added to the `path` and available in terminal.
  - It is a good idea to use [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage NodeJS. It can easily help to switch NodeJS versions when working in multiple repositories.
- [Git](https://git-scm.com/)
  - To commit changes, can be skipped if you just want to check out the app.
- [Visual Studio Code](https://code.visualstudio.com/)
  - Other IDE can be used of course, but there are added settings for VSCode in the project.
  - Once the project is opened in VSCode, install the recommended extensions.

### Development

#### Good to know

- All commands should be executed from the root of the project, no directory jumping should be required.
- Try restarting the extension host or reloading the window if:
  - VSCode shows errors after specific script runs (like installing dependencies, building resources, etc.),
  - Script runs fail with permission issues or they throw other errors.

#### Project setup

- Run `npm i` to install required dependencies.
  - Use `npm i package-name` to install a new dependency.
  - Flags like `--save-dev` can be used of course.
- The `npm run clean` can be used to remove generated resources (build outputs, caches, etc.) in case there are errors during development or we just want to have a clean repository without the need to clone it again.
  - The `.cleanrc` file controls what is removed when the command is used.
- Linting and formatting should be automatically handled by VSCode, however the `npm run lint` (only check) and `npm run lint:fix` (checks and also fixes errors where possible) commands can be used to manually lint the project.

#### Running and building resources

- To write code and check the changes the `npm run dev` command can be used.
  - This starts application development servers with hot module replacement and reload.
- We can use the `npm run build` command to build all resources in the project. This in most cases shouldn't be needed, because what scripts need built resources, those will automatically run the build command.
- The `npm run prod` scripts builds and starts the main app server using production configuration (minification, chunking, etc.). It can be useful to locally check performance and to be sure nothing broke when more complex changes were implemented.

#### Summary

To summarize the above, to do actual work we only need to:

1. Install dependencies with `npm i`.
2. Start the specific resources in development mode with `npm run dev`.
3. Open the application in the browser.

### Other resources

- [Scripts](./docs/scripts.md)
- [Conventions](./docs/conventions.md)
- [Resources](./docs/resources.md)
