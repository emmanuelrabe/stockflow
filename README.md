
# Stokcflow Monorepo

**Stokcflow**. This project is a modern monorepo powered by [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/).

## Project Structure

- `apps/` : End-user applications (web, API).
- `packages/` : Shared libraries (config, utils).

## Prerequisites

- **Node.js**: >= 24.x
- **pnpm**: >= 10.x
- **Turbo**: Installed globally or via pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Run all projects in development mode
pnpm dev

# Build all projects
pnpm build

```

---

## Contribution Workflow

We enforce strict quality standards to maintain a clean Git history and robust code.

### 2. Commit Conventions

We use **Conventional Commits**.
Format: `type(package_scope:scope) message`

**To make a commit:**

---

## Creating a New Module (App or Package)

To maintain consistency within the **Stokcflow** ecosystem, every new module must follow this procedure for integrating shared configurations.

### 1. Basic Structure
```bash
mkdir -p apps/my-app/src
cd apps/my-app
pnpm init

```

### 2. Linking configurations (`package.json`)

Add workspace dependencies to inherit global rules:

```json
{
  "name": "@Stokcflow/my-app", // Use the @Stokcflow scope
  "version": "0.1.0",
  "devDependencies": {
    "@repo/tsconfig": "workspace:*",
    "@repo/eslint-config": "workspace:*",
  },
  "scripts": {
    "dev": "tsc -w",
    "build": "tsc",
    "lint": "eslint . --fix",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit",
  }
}

```

### 3. Implementing the configuration files


#### 🟪 ESLint (`eslint.config.js`)

```javascript
module.exports = {
  root: true,
  extends: ["@stockflow/eslint-config"],
};

```

#### 🟪 Prettier (`.prettierrc`)

```JSON
    "@stockflow/prettier-config"
```

### 4. Registering Turbo

Once the module is created, run `pnpm install` in the root directory. **Turborepo** will automatically detect the new scripts and include them in the global pipeline (`pnpm build`, `pnpm lint`, etc.).

--- 
### DATABASE 
You have the option of running PostgreSQL locally or using a .env file with

```
    DATABASE_URL="postgresql://neondb_owner:npg_ox3RmGMri2Ud@ep-morning-dawn-ap73i4zy-pooler.c-7.us-east-1.aws.neon.tech/needcy_db?sslmode=require&channel_binding=require"
```

Pour generer le client prisma (orm)/
```cmd
  cd apps/api
  pnpm db:migrate
  pnpm db:generate
```

---

## Available Scripts (Root)

| Command | Action |
| --- | --- |
| `pnpm lint` | Static analysis to detect syntax and style errors (ESLint). |
| `pnpm format` | Automatically formats code according to defined rules (Prettier). |
| `pnpm type-check` | Checks TypeScript type consistency without compiling the files. |
| `pnpm dev` | Launches the entire ecosystem in dev mode. |
| `pnpm build` | Compiles all packages via Turbo (cache-optimized). |

---

## License

Owned by **Stokcflow**. All rights reserved.
