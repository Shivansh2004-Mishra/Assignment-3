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

// Allow only 8 characters, letters and numbers, in password input
passwordInput.addEventListener('input', function () {
    // Remove non-letter/number and limit to 8 chars
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
});

// Allow only 8 characters, letters and numbers, in confirm password input
confirmPasswordInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
});

// Update password validation: exactly 8 chars, at least one letter and one number
function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(password);
}

// Allow only numeric input for phone number
phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

// Allow only letters for name input
nameInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
});

// Form submit handler
form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideMessage();

    // Get field values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Collect all errors
    const errors = [];
    if (!name) errors.push('Name is required.');
    if (!email) errors.push('Email is required.');
    if (!phone) errors.push('Phone number is required.');
    if (!password) errors.push('Password is required.');
    if (!confirmPassword) errors.push('Confirm password is required.');
    if (email && !isValidEmail(email)) errors.push('Please enter a valid email address.');
    if (phone && !isValidPhone(phone)) errors.push('Phone number must be exactly 10 digits.');
    if (password && !isValidPassword(password)) errors.push('Password must be exactly 8 characters and include both letters and numbers.');
    if (password && confirmPassword && password !== confirmPassword) errors.push('Passwords do not match.');

    if (errors.length > 0) {
        showMessage(errors, 'error');
        return;
    }

    // Success
    showMessage('Registration successful!', 'success');
    form.reset();
    togglePasswordBtn.textContent = 'Show';
    toggleConfirmPasswordBtn.textContent = 'Show';
});