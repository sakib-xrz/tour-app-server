const express = require('express');
const userController = require('../controller/userController');

const { getAllUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
