Assignment 6 — Part A

Login-Based Calculator Web Application

Overview

This project implements a two-page web application using HTML, CSS, JavaScript (ES6), and jQuery. The application includes a login page with validation and a calculator that is only accessible after successful login.

Features
Login Page

Validates Northeastern email format (must end with @northeastern.edu)

Validates password (minimum 8 characters)

Shows inline error messages (no alerts)

Login button remains disabled until inputs are valid

Hard-coded user credentials

"Remember Me" support using localStorage

Session handling using sessionStorage/localStorage

Redirect to calculator after login

Calculator Page

Accessible only after valid login session

Displays logged-in username

Validates numeric inputs (supports negative and decimal values)

Uses a single arrow function for all arithmetic operations

Handles divide-by-zero case

Logout clears session and redirects to login page

How to Run

Open login.html in a browser.

Use one of the valid test accounts:

student1@northeastern.edu
 / password123

test@northeastern.edu
 / testing123

Login to access the calculator.

Logout returns to login page and clears session.

Technologies Used

HTML5

CSS3

JavaScript ES6

jQuery

Browser Storage APIs (localStorage & sessionStorage)