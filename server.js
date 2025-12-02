'use strict';

const express = require('express');
const repository = require('./productAvailabilityRepository');

const DEFAULT_PORT = process.env.INVENTORY_PORT ? Number(process.env.INVENTORY_PORT) : 5001;

const createServer = () => {
  const app = express();

  app.get('/inventory/:productId', (req, res) => {
    const entry = repository.getByProductId(req.params.productId);
    if (!entry || entry.quantity === 0) {
      return res.status(404).json({ message: 'Inventory entry not found' });
    }
    return res.json(entry);
  });

  return app;
};

const start = (port = DEFAULT_PORT) =>
  new Promise((resolve) => {
    repository.reset();
    const app = createServer();
    const server = app.listen(port, () => {
      resolve({ app, server });
    });
  });

if (require.main === module) {
  start().then(({ server }) => {
    const address = server.address();
    const boundPort = typeof address === 'string' ? address : address.port;
    process.stdout.write(`Inventory API running on port ${boundPort}\n`);
  });
}

module.exports = {
  createServer,
  start,
  DEFAULT_PORT,
};
