const { body, validationResult } = require('express-validator');

// Validation rules for user creation
const createUserValidation = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name must contain only alphabetic characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Validation rules for user update
const updateUserValidation = [
  body('fullName')
    .optional()
    .trim()
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name must contain only alphabetic characters'),
  
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed.', details: errors.array() });
  }
  next();
};

module.exports = {
  createUserValidation,
  updateUserValidation,
  handleValidationErrors
};