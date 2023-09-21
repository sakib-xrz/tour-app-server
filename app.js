const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const port = 8000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    message: 'Tours data retrieve successfully',
    data: tours,
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const { id } = req.params;
  const tour = tours.find((data) => data.id === +id);

  if (!tour) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Tour data retrieve successfully',
    data: tour,
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newTourData = req.body;
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newTourId }, newTourData);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        message: 'Tours added successfully',
        data: newTour,
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length - 1) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Tour update successfully',
    data: '<Updated tour here...>',
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length - 1) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    message: 'Tour delete successfully',
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
