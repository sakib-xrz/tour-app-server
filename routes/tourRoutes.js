const express = require('express');
const tourController = require('../controller/tourController');

const {
  topFourTours,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = tourController;

const router = express.Router();

router.route('/top-four').get(topFourTours, getAllTours);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
