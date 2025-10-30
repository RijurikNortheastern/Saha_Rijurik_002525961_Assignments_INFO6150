# Feedback Form Application

A responsive, interactive feedback form with real-time validation, AI assistant chatbot, and submission tracking.

## Features

- ✅ **Real-time Form Validation** - Instant feedback as users type
- 💬 **AI Assistant Chatbot** - Built-in help system for form guidance
- 📱 **Fully Responsive Design** - Works on desktop, tablet, and mobile devices
- 📊 **Results Table** - Persistent display of all form submissions
- 🎨 **Modern UI/UX** - Clean design with smooth animations and transitions
- ♿ **Accessible** - ARIA labels and keyboard navigation support

## File Structure


## Form Fields

### Required Fields (marked with *)
- **Title** - Radio selection (Miss/Mr./Mrs.)
- **First Name** - Letters only, 2-20 characters
- **Last Name** - Letters only, 2-20 characters
- **Email ID** - Must be @northeastern.edu email
- **Phone Number** - Format: (XXX) XXX-XXXX
- **Street Address 1** - Minimum 3 characters
- **Zip Code** - Exactly 5 digits
- **How did you hear** - At least one checkbox required
- **Topic** - Dropdown selection
- **Comments** - Minimum 5 characters

### Optional Fields
- **Street Address 2** - Maximum 20 characters with live counter
- **Topic Detail** - Dynamic field that appears based on topic selection

## Features Details

### Real-Time Validation
- Fields validate as you type
- Visual feedback with green (valid) and red (invalid) borders
- Clear error messages below each field
- Submit button enables only when all required fields are valid

### Phone Number Formatting
- Automatically formats to (XXX) XXX-XXXX as you type
- Only accepts numeric input
- Limits to 10 digits

### AI Assistant Chatbot
- Click the "🤖 AI Assistant" button to open
- Provides help on:
  - Email format requirements
  - Phone number format
  - Zip code requirements
  - Required vs optional fields
  - Address field guidance

### Dynamic Fields
- When a topic is selected, a checkbox appears
- Checking the box reveals an additional input field for topic details
- The dynamic field becomes required when its checkbox is checked

### Results Table
- Displays all form submissions in a formatted table
- Persists during the session (until page refresh)
- Shows "N/A" for empty optional fields
- Includes submission timestamp
- Responsive design - stacks on mobile devices

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Validation Rules

| Field | Validation Rule |
|-------|----------------|
| Names | 2-20 letters only, no spaces or special characters |
| Email | Must end with @northeastern.edu |
| Phone | Must match (XXX) XXX-XXXX format |
| Zip | Exactly 5 digits |
| Address 1 | At least 3 characters |
| Address 2 | Maximum 20 characters |
| Comments | At least 5 characters |

## Customization

### Changing Required Email Domain
In `script.js`, modify the email regex pattern:
```javascript
const emailRegex = /^[A-Za-z0-9._%+-]+@northeastern\.edu$/i;
```

### Modifying Color Scheme
In `style.css`, update the CSS variables:
```css
:root {
    --bg: #f7f1df;        /* Background */
    --card: #fffaf0;      /* Card background */
    --accent: #1f3c88;    /* Primary color */
    --error: #b00020;     /* Error color */
    --ok: #0a7d28;        /* Success color */
}
```

### Adding New Topics
In `index.html`, add options to the topic select:
```html
<option>New Topic</option>
```

## Troubleshooting

**Form won't submit:**
- Ensure all required fields are filled correctly
- Check error messages below each field
- Verify email ends with @northeastern.edu
- Confirm phone number is in correct format

**Chatbot not opening:**
- Check if JavaScript is enabled in your browser
- Ensure all three files are in the same directory
- Try refreshing the page

**Styling issues:**
- Verify `style.css` is in the same directory as `index.html`
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

## License

This project is created for educational purposes as part of Assignment 4.

## Author

Rijurik

## Version

1.0.0 - Initial Release