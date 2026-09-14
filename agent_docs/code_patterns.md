# Code Patterns

Use this only for project-specific conventions. If a section is unknown, inspect the existing code before filling it in.

## Architecture

- Primary pattern: Layered by screens, reusable UI components, data, navigation, theme, types, and pure utilities
- Keep domain logic separate from UI/transport code.
- Reuse existing modules before creating new abstractions.

## Data And State

- Data fetching: None; importing fictional local constants is the only data source
- Server state: None
- Client state: Screen-local React state with memoized derived values
- Forms: Controlled search input and filter chips; no form library

## Errors And Validation

- Validate external inputs at boundaries.
- Return user-safe errors to the UI.
- Log developer context server-side.
- Do not swallow errors silently.

## Naming

- Files: PascalCase for React components/screens; camelCase for utilities and data modules
- Components/classes: PascalCase
- Functions/variables: camelCase
- Env vars/constants: UPPER_SNAKE_CASE
