# React Job Portal

A React-based job portal application with Material UI that allows job seekers to explore job listings and company profiles.

## Features

- User authentication with session management
- 5 main pages: Home, About, Job Listings, Company Showcase, Contact
- Dynamic job listings with search functionality
- Company gallery with images
- Responsive design with Material UI
- Protected routes

## Setup Instructions

1. Install dependencies:
```bash
   npm install
```

2. Update backend URL in `src/services/authService.js` and `src/services/api.js`

3. Run the application:
```bash
   npm start
```

## Project Structure
```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── services/        # API services
├── data/           # Static data
├── utils/          # Utility functions
└── App.js          # Main application
```

## Technologies Used

- React
- Material UI
- Axios
- React Router DOM

## Assignment Notes

- Login uses mock authentication (replace with Assignment 8 backend)
- Company images are currently using placeholder images
- In Assignment 10, implement user-specific image fetching