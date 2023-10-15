const mongoose = require('mongoose');

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
module.export = Tour;
