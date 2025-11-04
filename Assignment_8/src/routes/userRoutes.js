const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const { 
  createUserValidation, 
  updateUserValidation, 
  handleValidationErrors 
} = require('../middleware/validation');

// User routes
router.post('/create', createUserValidation, handleValidationErrors, userController.createUser);
router.put('/edit', updateUserValidation, handleValidationErrors, userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);
router.post('/uploadImage', upload.single('image'), userController.uploadImage);
router.post('/login', userController.authenticateUser);

module.exports = router;