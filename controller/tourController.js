const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id > tours.length - 1) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Name is require',
    });
  }
  next();
};

// tour
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    message: 'Tours data retrieve successfully',
    data: tours,
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((data) => data.id === +id);

  res.status(200).json({
    status: 'success',
    message: 'Tour data retrieve successfully',
    data: tour,
  });
};

exports.createTour = (req, res) => {
  const newTourData = req.body;
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newTourId }, newTourData);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'Tours added successfully',
        data: newTour,
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Tour update successfully',
    data: '<Updated tour here...>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'Tour delete successfully',
    data: null,
  });
};
