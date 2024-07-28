# Conventions

## Naming conventions

### Elements

- `*.component.tsx`
  - Simple element that communicates with props with its parent components and only has local state.
- `*.container.tsx`
  - Smart element that doesn’t use props to communicate but consumes different state sources within itself.
- `*.provider.tsx`
  - Wrapper element to provide context to children.
- `*.factory.ts`
  - Factory function that creates a new element based on provided parameters.

### Common

- `*.types.ts`
  - Contains types, interfaces, etc.
- `*.config.ts`
  - Contains configuration for a specific module.
- `*.functions.ts`
  - Contains pure functions related to the module.

### Business logic

- `*.hooks.ts`
  - React hooks for the module.
- `*.facade.ts`
  - Special hook to expose an API for the module, hiding the actual implementation of the business logic.
- `*.service.ts`
  - Singleton object to access remote module related resources, eg.: make HTTP calls.
