# Age Calculator Application - Design Document

## Overview

The Age Calculator Application is a client-side web application built with HTML, CSS, and vanilla JavaScript. The application follows a simple, single-page architecture with no backend dependencies. All calculations are performed in the browser using JavaScript's Date API. The design emphasizes clean code organization, accurate date arithmetic, and a modern glassmorphism UI aesthetic.

## Architecture

### System Architecture

The application follows a simple client-side architecture:

```
┌─────────────────────────────────────┐
│         Browser (Client)            │
│  ┌───────────────────────────────┐  │
│  │      HTML Structure           │  │
│  │   (index.html)                │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   Presentation Layer          │  │
│  │   (CSS Styling)               │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │   Application Logic           │  │
│  │   - Input Validation          │  │
│  │   - Age Calculation           │  │
│  │   - Result Rendering          │  │
│  │   (JavaScript)                │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Glassmorphism styling, animations, responsive design
- **JavaScript (ES6+)**: Application logic, date calculations, DOM manipulation
- **Native Date API**: Date arithmetic and calculations

## Components and Interfaces

### HTML Components

1. **Container**: Main wrapper with glassmorphism styling
2. **Header**: Application title
3. **Input Section**: 
   - Date input field (type="date")
   - Calculate button
4. **Result Section**: Dynamic display area for age results

### JavaScript Modules

#### Input Validation Module

```javascript
function validateBirthDate(dateString)
// Input: dateString (string) - ISO format date string
// Output: { valid: boolean, error: string | null }
// Validates that date is not empty, not in future, and is valid
```

#### Age Calculation Module

```javascript
function calculateAge(birthDate, currentDate)
// Input: birthDate (Date), currentDate (Date)
// Output: {
//   years: number,
//   months: number,
//   days: number,
//   totalMonths: number,
//   totalDays: number
// }
// Performs accurate age calculation with proper borrowing
```

#### UI Rendering Module

```javascript
function renderResult(ageData)
// Input: ageData (object from calculateAge)
// Output: void (updates DOM)
// Renders formatted age results with animations

function renderError(errorMessage)
// Input: errorMessage (string)
// Output: void (updates DOM)
// Displays error message with appropriate styling
```

## Data Models

### AgeData Object

```javascript
{
  years: number,        // Complete years lived
  months: number,       // Additional months (0-11)
  days: number,         // Additional days (0-30)
  totalMonths: number,  // Total months lived
  totalDays: number     // Total days lived
}
```

### ValidationResult Object

```javascript
{
  valid: boolean,       // Whether input is valid
  error: string | null  // Error message if invalid
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Birth date storage consistency
*For any* valid date selected by the user, storing and retrieving the birth date value should preserve the exact date without modification.
**Validates: Requirements 1.2**

### Property 2: Calculation trigger consistency
*For any* valid birth date input, submitting via button click or Enter key press should produce identical calculation results.
**Validates: Requirements 1.3, 6.1**

### Property 3: Empty input rejection
*For any* calculation attempt with an empty birth date field, the system should display an error message and prevent calculation without modifying application state.
**Validates: Requirements 3.1**

### Property 4: Future date rejection
*For any* date value that is after the current date, the system should reject the input and display an appropriate error message.
**Validates: Requirements 3.2**

### Property 5: Age calculation accuracy - years
*For any* valid birth date, the calculated years should equal the difference between current year and birth year, minus one if the birthday has not yet occurred in the current year.
**Validates: Requirements 4.1**

### Property 6: Age calculation accuracy - months borrowing
*For any* valid birth date where the current day is less than the birth day, the months calculation should borrow from years correctly, resulting in months being reduced by 1 and days being adjusted by adding days from the previous month.
**Validates: Requirements 4.2**

### Property 7: Age calculation accuracy - days borrowing
*For any* valid birth date where the current day is less than the birth day, the days calculation should correctly compute the remaining days by adding the number of days in the previous month.
**Validates: Requirements 4.3**

### Property 8: Total days calculation accuracy
*For any* valid birth date, the total days should equal the exact number of milliseconds between birth date and current date divided by milliseconds per day, rounded down.
**Validates: Requirements 4.4**

### Property 9: Total months calculation consistency
*For any* valid birth date, the total months should equal (years × 12) + months.
**Validates: Requirements 4.5**

### Property 10: Result format completeness
*For any* successful calculation, the displayed result should contain all five age formats: years alone, years-months-days breakdown, total months, and total days.
**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

### Property 11: Number formatting for readability
*For any* total days value greater than 999, the displayed number should include comma separators for thousands.
**Validates: Requirements 2.5**

### Property 12: Error message visibility
*For any* validation failure, an error message should be displayed in the result area with distinct error styling.
**Validates: Requirements 3.4, 5.6**

### Property 13: Glassmorphism styling presence
*For any* page load, the main container element should have CSS properties for semi-transparent background, backdrop blur, and border styling applied.
**Validates: Requirements 5.2**

### Property 14: Focus indicator visibility
*For any* interactive element that receives keyboard focus, a visible focus indicator should be present.
**Validates: Requirements 6.3**

## Error Handling

### Input Validation Errors

1. **Empty Input**: Display "Please select your birth date"
2. **Future Date**: Display "Birth date cannot be in the future"
3. **Invalid Format**: Prevented by HTML5 date input type

### Error Display Strategy

- Errors are displayed in the result section with distinct styling
- Error messages are clear and actionable
- Application state is preserved on error (no partial updates)
- Error styling uses red color (#e74c3c) for visibility

### Edge Cases

1. **Leap Year Handling**: JavaScript Date API handles leap years automatically
2. **Month Boundaries**: Borrowing logic accounts for varying month lengths
3. **Same Day Birthday**: Results in 0 days, proper month/year calculation
4. **Very Old Ages**: No upper limit, calculations remain accurate

## Testing Strategy

### Unit Testing

The application will use **Vitest** as the testing framework for unit tests. Unit tests will cover:

1. **Validation Function Tests**:
   - Empty string input returns validation error
   - Future date returns validation error
   - Valid past date returns success
   - Current date (today) returns success

2. **Age Calculation Tests**:
   - Birthday already occurred this year
   - Birthday not yet occurred this year
   - Same day as birthday
   - End of month edge cases (e.g., born on 31st, current month has 30 days)

3. **Formatting Tests**:
   - Numbers above 999 include comma separators
   - Numbers below 1000 have no commas

### Property-Based Testing

The application will use **fast-check** as the property-based testing library. Each property-based test will run a minimum of 100 iterations.

Property-based tests will verify:

1. **Property 1: Birth date storage consistency** - Generate random valid dates, verify storage/retrieval
2. **Property 5: Age calculation accuracy - years** - Generate random birth dates, verify year calculation logic
3. **Property 8: Total days calculation accuracy** - Generate random birth dates, verify total days matches millisecond difference
4. **Property 9: Total months calculation consistency** - Generate random birth dates, verify totalMonths = years × 12 + months
5. **Property 11: Number formatting** - Generate random large numbers, verify comma placement

Each property-based test will be tagged with a comment in this format:
```javascript
// **Feature: age-calculator, Property X: [property description]**
```

### Integration Testing

Manual testing will verify:
- Complete user workflows from input to result display
- Keyboard navigation and Enter key functionality
- Visual appearance of glassmorphism UI
- Responsive behavior across screen sizes
- Animation smoothness and timing

## UI Design Specifications

### Glassmorphism Styling

```css
.container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Color Scheme

- **Primary Background**: Linear gradient (e.g., purple to blue)
- **Glass Container**: Semi-transparent white with blur
- **Text Primary**: Dark gray (#333)
- **Text Secondary**: Medium gray (#666)
- **Accent**: Purple/blue gradient
- **Error**: Red (#e74c3c)

### Typography

- **Font Family**: System fonts (Segoe UI, Roboto, sans-serif)
- **Heading**: 2em, bold
- **Body**: 1em, regular
- **Age Display**: 3em, bold

### Responsive Design

- **Mobile**: Single column, full width with padding
- **Tablet/Desktop**: Centered container, max-width 500px
- **Breakpoints**: Handled via flexible units (%, em, rem)

### Animations

- **Result Display**: Fade in with slide up (0.5s)
- **Button Hover**: Lift effect with shadow
- **Focus States**: Smooth border color transition (0.3s)

## Implementation Notes

### Date Calculation Algorithm

The age calculation uses a borrowing algorithm similar to manual subtraction:

1. Calculate year difference
2. Calculate month difference
3. Calculate day difference
4. If days < 0: borrow from months, add days from previous month
5. If months < 0: borrow from years, add 12 to months

### Browser Compatibility

- Modern browsers with ES6+ support
- HTML5 date input support (fallback to text input in older browsers)
- CSS backdrop-filter support (graceful degradation without blur)

### Performance Considerations

- All calculations are synchronous and near-instantaneous
- No external API calls or network requests
- Minimal DOM manipulation for optimal performance
- CSS animations use GPU-accelerated properties (transform, opacity)

## File Structure

```
age-calculator/
├── index.html          # Main HTML structure
├── style.css           # Glassmorphism styling and responsive design
├── script.js           # Application logic and calculations
└── tests/
    ├── validation.test.js    # Unit tests for validation
    ├── calculation.test.js   # Unit tests for age calculation
    └── properties.test.js    # Property-based tests
```
