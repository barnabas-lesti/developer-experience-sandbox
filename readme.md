# Web Development Sandbox

Playground project to test out web frameworks, patterns and more.

## Getting started

### Prerequisites

- [NodeJS](https://nodejs.org/)
  - This will also install `npm`, make sure both are added to the `path` and available in terminal.
  - It is a good idea to use [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage NodeJS. It can easily help to switch NodeJS versions when working in multiple repositories.
- [Git](https://git-scm.com/)
  - To commit changes, can be skipped if you just want to check out the app.
- [pnpm](https://pnpm.io/)
  - After NodeJS is installed, simply run `npm install -g pnpm` in terminal.
- [Visual Studio Code](https://code.visualstudio.com/)
  - Other IDE can be used of course, but there are added settings for VSCode in the project.
  - Once the project is opened in VSCode, install the recommended extensions.

### Starting development

- Clone the repo.
- In the root of the project:
  1. Run `pnpm i` to install dependencies.
  2. Run `pnpm dev --filter="<app/package name>` to start an application or package build in watch mode.

### Documentation

- [Scripts](./docs/scripts.md)
- [Conventions](./docs/conventions.md)
- [Resources](./docs/resources.md)
