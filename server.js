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

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Tour name cannot be empty'],
    unique: true,
  },
  rating: { type: Number, require: true, default: 4.5 },
  price: { type: Number, require: [true, 'Price cannot be empty'] },
});

const Tour = mongoose.model('Tour', tourSchema);

main();
