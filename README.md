# 🎂 Age Calculator

A beautiful, modern web application that calculates your exact age in multiple formats with a stunning glassmorphism UI design.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

- **Multiple Age Formats**: View your age in years, months, days, total months, and total days
- **Smart Validation**: Prevents invalid inputs like empty dates or future dates
- **Glassmorphism Design**: Modern, elegant UI with semi-transparent glass effect
- **Smooth Animations**: Beautiful fade-in effects and hover transitions
- **Keyboard Support**: Press Enter to calculate without clicking
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Accessibility**: Full keyboard navigation with visible focus indicators
- **Accurate Calculations**: Handles leap years, varying month lengths, and edge cases

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/age-calculator.git
   cd age-calculator
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   start index.html  # Windows
   open index.html   # macOS
   xdg-open index.html  # Linux
   ```

That's it! No build process, no dependencies, no installation required.

## 📖 Usage

1. Select your birth date from the date picker
2. Click "Calculate Age" or press Enter
3. View your age in multiple formats instantly

### Example Output

```
25 Years

25 years, 3 months, 15 days
Total: 303 months
Total: 9,241 days
```

## 🎨 Design

The application features a modern glassmorphism design with:
- Semi-transparent glass container with backdrop blur
- Purple-to-blue gradient background
- Smooth animations and transitions
- Clean, minimalist interface
- Responsive layout that adapts to any screen size

## 🧪 Testing

Run the manual integration tests:

```bash
start test-manual.html
```

The test page verifies:
- ✅ Empty input validation
- ✅ Future date rejection
- ✅ Age calculation accuracy
- ✅ Number formatting (comma separators)
- ✅ Total months consistency

## 📁 Project Structure

```
age-calculator/
├── index.html           # Main application page
├── style.css            # Glassmorphism styling and animations
├── script.js            # Application logic and calculations
├── test-manual.html     # Integration test page
├── README.md            # Project documentation
└── .kiro/
    └── specs/
        └── age-calculator/
            ├── requirements.md  # Feature requirements
            ├── design.md        # Design document
            └── tasks.md         # Implementation tasks
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup with native date input
- **CSS3**: Glassmorphism effects, flexbox, animations
- **Vanilla JavaScript**: No frameworks or libraries

### Key Functions

**Validation**
```javascript
validateBirthDate(dateString)
// Returns: { valid: boolean, error: string | null }
```

**Age Calculation**
```javascript
calculateAge(birthDate, currentDate)
// Returns: { years, months, days, totalMonths, totalDays }
```

**Rendering**
```javascript
renderResult(ageData)  // Displays formatted age results
renderError(message)   // Displays validation errors
```

## 🌟 Features in Detail

### Input Validation
- Prevents empty submissions
- Blocks future dates automatically
- Provides clear, user-friendly error messages
- Maintains application state on validation failure

### Age Calculation Algorithm
The calculator uses a borrowing algorithm similar to manual subtraction:
1. Calculate year difference
2. Calculate month difference
3. Calculate day difference
4. Adjust for negative days (borrow from months)
5. Adjust for negative months (borrow from years)
6. Calculate total days using millisecond precision
7. Calculate total months as (years × 12) + months

### Accessibility Features
- Keyboard navigation support (Tab, Enter)
- Visible focus indicators on all interactive elements
- Semantic HTML for screen readers
- Logical tab order through the interface

## 🎯 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

**Note**: Requires modern browser with ES6+ support and HTML5 date input.

## 📝 Development

This project was developed using a spec-driven development approach:

1. **Requirements**: Defined user stories and acceptance criteria
2. **Design**: Created detailed design document with correctness properties
3. **Implementation**: Built incrementally following the task list
4. **Testing**: Verified all functionality with integration tests

See the `.kiro/specs/age-calculator/` directory for complete documentation.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created with ❤️ using Kiro AI

## 🙏 Acknowledgments

- Design inspired by modern glassmorphism trends
- Built as part of the Kiro Week 1 Challenge

---

**Enjoy calculating your age! 🎉**
