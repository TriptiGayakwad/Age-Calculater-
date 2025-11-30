// Set max date to today on page load
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('birthDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
    
    // Add Enter key listener
    dateInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleCalculate();
        }
    });
});

// Main calculation handler
function handleCalculate() {
    const birthDateInput = document.getElementById('birthDate').value;
    const resultSection = document.getElementById('result');
    
    // Validate input
    const validation = validateBirthDate(birthDateInput);
    if (!validation.valid) {
        renderError(validation.error);
        return;
    }
    
    // Calculate age
    const birthDate = new Date(birthDateInput);
    const currentDate = new Date();
    const ageData = calculateAge(birthDate, currentDate);
    
    // Render result
    renderResult(ageData);
}

// Validation module
function validateBirthDate(dateString) {
    if (!dateString || dateString.trim() === '') {
        return {
            valid: false,
            error: 'Please select your birth date'
        };
    }
    
    const birthDate = new Date(dateString);
    const currentDate = new Date();
    
    if (birthDate > currentDate) {
        return {
            valid: false,
            error: 'Birth date cannot be in the future'
        };
    }
    
    return {
        valid: true,
        error: null
    };
}

// Age calculation module
function calculateAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += previousMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate total days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((currentDate - birthDate) / millisecondsPerDay);
    
    // Calculate total months
    const totalMonths = (years * 12) + months;
    
    return {
        years,
        months,
        days,
        totalMonths,
        totalDays
    };
}

// Format number with commas
function formatNumber(num) {
    if (num > 999) {
        return num.toLocaleString('en-US');
    }
    return num.toString();
}

// Render result
function renderResult(ageData) {
    const resultSection = document.getElementById('result');
    
    const html = `
        <div class="age-display">${ageData.years} Years</div>
        <div class="age-details">
            ${ageData.years} years, ${ageData.months} months, ${ageData.days} days
        </div>
        <div class="age-details">
            Total: ${formatNumber(ageData.totalMonths)} months
        </div>
        <div class="age-details">
            Total: ${formatNumber(ageData.totalDays)} days
        </div>
    `;
    
    resultSection.innerHTML = html;
    resultSection.classList.add('show');
}

// Render error
function renderError(errorMessage) {
    const resultSection = document.getElementById('result');
    
    resultSection.innerHTML = `<div class="error-message">${errorMessage}</div>`;
    resultSection.classList.add('show');
}
