// Get DOM elements
const form = document.getElementById('registrationForm');
const messageBox = document.getElementById('message');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const phoneInput = document.getElementById('phone');
const confirmPasswordInput = document.getElementById('confirmPassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const nameInput = document.getElementById('name');

// Show/hide password functionality
togglePasswordBtn.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';
    }
});

// Show/hide confirm password functionality
toggleConfirmPasswordBtn.addEventListener('click', function () {
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        toggleConfirmPasswordBtn.textContent = 'Hide';
    } else {
        confirmPasswordInput.type = 'password';
        toggleConfirmPasswordBtn.textContent = 'Show';
    }
});

// Utility: Show message (updated to handle multiple errors)
function showMessage(text, type) {
    if (Array.isArray(text)) {
        messageBox.innerHTML = text.map(msg => `<div>${msg}</div>`).join('');
    } else {
        messageBox.textContent = text;
    }
    messageBox.className = '';
    messageBox.classList.add(type === 'error' ? 'error' : 'success');
    messageBox.style.display = 'block';
}

// Utility: Hide message
function hideMessage() {
    messageBox.style.display = 'none';
    messageBox.textContent = '';
    messageBox.className = '';
}

// Validate email format
function isValidEmail(email) {
    // Stricter email regex
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Validate phone number (exactly 10 digits)
function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
}

// Update password validation: exactly 8 chars, at least one letter and one number
function isValidPassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8}$/;
    return passwordPattern.test(password);
}

// Restrict password and confirm password input to 8 characters max
function restrictToEightChars(inputElement) {
    inputElement.addEventListener('input', function () {
        this.value = this.value.slice(0, 8);
    });
}
restrictToEightChars(passwordInput);
restrictToEightChars(confirmPasswordInput);

// Only allow numbers for phone input, max 10 digits
phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

// Only allow letters and spaces for name input
nameInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
});

// Form submit handler
form.addEventListener('submit', function (event) {
    event.preventDefault();
    hideMessage();

    // Get trimmed field values
    const nameValue = form.name.value.trim();
    const emailValue = form.email.value.trim();
    const phoneValue = form.phone.value.trim();
    const passwordValue = form.password.value;
    const confirmPasswordValue = form.confirmPassword.value;

    // Collect validation errors
    const errors = [];
    if (!nameValue) errors.push('Name is required.');
    if (!emailValue) errors.push('Email is required.');
    if (!phoneValue) errors.push('Phone number is required.');
    if (!passwordValue) errors.push('Password is required.');
    if (!confirmPasswordValue) errors.push('Confirm password is required.');
    if (emailValue && !isValidEmail(emailValue)) errors.push('Please enter a valid email address.');
    if (phoneValue && !isValidPhone(phoneValue)) errors.push('Phone number must be exactly 10 digits.');
    if (passwordValue && !isValidPassword(passwordValue)) {
        errors.push(
            'Password must be exactly 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        );
    }
    if (passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue) {
        errors.push('Passwords do not match.');
    }

    // Show errors or success message
    if (errors.length > 0) {
        showMessage(errors, 'error');
        return;
    }

    showMessage('Registration successful!', 'success');
    form.reset();
    togglePasswordBtn.textContent = 'Show';
    toggleConfirmPasswordBtn.textContent = 'Show';
});