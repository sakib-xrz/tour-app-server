/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URI;

async function main() {
  try {
    await mongoose.connect(uri);
    console.log('Database connection successful');

    app.listen(port, () => {
      console.log(`Application listening on port ${port}`);
    });
  } catch (error) {
    console.log('Failed to connect to the database', error);
  }
}

main();
