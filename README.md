# Inventory Provider

Standalone Pact provider repository that verifies contracts for `InventoryService`.

## Scripts

- `npm start` – run the inventory API locally on port `5001`.
- `npm test` / `npm run test:provider` – execute Pact provider verification tests located inside `__tests__/`.

## Local Verification Flow

1. Clone `contracts-repo` and copy the files inside `pacts/inventory-service/` into this project's `pacts/` directory.
2. Install dependencies with `npm install`.
3. Run `npm test`.

## Required GitHub Secrets

| Secret | Purpose |
| --- | --- |
| `CONTRACT_PAT` | Personal access token with `repo` scope used to clone the contracts repository branch provided by consumer workflows. |
| `STATUS_PAT` | Personal access token used to publish commit status updates back to the originating consumer repository. |

## Automation Overview

Consumer repositories send a `repository_dispatch` event (`verify-pact`) with the contracts PR branch and consumer commit SHA. The workflow in `.github/workflows/pact-provider.yml` downloads those contracts, runs verification, and posts the outcome back to the consumer commit for gating PR merges.
