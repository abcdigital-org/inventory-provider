'use strict';

const fs = require('fs');
const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { start, DEFAULT_PORT } = require('../src/server');
const stateHandlers = require('../src/stateHandlers');

const pactDir = path.resolve(process.cwd(), 'pacts');

const inventoryPacts = () =>
  fs
    .readdirSync(pactDir)
    .filter((file) => file.endsWith('-InventoryService.json'))
    .map((file) => path.join(pactDir, file));

describe('Inventory provider Pact verification', () => {
  let serverInstance;

  beforeAll(async () => {
    serverInstance = await start(DEFAULT_PORT);
  });

  afterAll(async () => {
    if (serverInstance && serverInstance.server) {
      await new Promise((resolve, reject) => {
        serverInstance.server.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  });

  it('satisfies consumer expectations for InventoryService', async () => {
    const pactFiles = inventoryPacts();

    if (pactFiles.length === 0) {
      throw new Error('No pact files found for InventoryService. Ensure consumer workflow attached pact artifacts.');
    }

    const verifier = new Verifier({
      provider: 'InventoryService',
      logLevel: 'info',
      providerBaseUrl: `http://localhost:${DEFAULT_PORT}`,
      pactUrls: pactFiles,
      stateHandlers,
    });

    await verifier.verifyProvider();
  });
});
