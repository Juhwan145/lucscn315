document.addEventListener("DOMContentLoaded", function() {
    const form = document.forms["registrationForm"];
    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        clearErrors();
        
        try {
            let valid = validateForm();
            if (valid) {
                console.log("Form submitted successfully.");
                alert("Registration successful!");
                form.submit(); // Uncomment this line when integrating with the backend
            }
        } catch (error) {
            console.error("Form validation error:", error);
            displayError("generalError", "An unexpected error occurred. Please try again.");
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Full Name Validation
        const fullName = form["fullName"].value.trim();
        if (!/^[a-zA-Z ]+$/.test(fullName) || fullName === "") {
            displayError("fullNameError", "Full Name must contain only letters and spaces.");
            isValid = false;
        }
        
        // Username Validation
        const username = form["username"].value.trim();
        if (!/^[a-zA-Z][a-zA-Z0-9]{5,14}$/.test(username)) {
            displayError("usernameError", "Username must be 6-15 characters long, start with a letter, and contain only letters and numbers.");
            isValid = false;
        }
        
        // Email Validation
        const email = form["email"].value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            displayError("emailError", "Invalid email format.");
            isValid = false;
        }
        
        // Password Validation
        const password = form["password"].value;
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(password)) {
            displayError("passwordError", "Password must be 8-20 characters long, include at least one uppercase, one lowercase, one number, and one special character (!@#$%^&*).");
            isValid = false;
        }
        
        // Confirm Password Validation
        const confirmPassword = form["confirmPassword"].value;
        if (confirmPassword !== password) {
            displayError("confirmPasswordError", "Passwords do not match.");
            isValid = false;
        }
        
        // Phone Number Validation
        const phoneNumber = form["phoneNumber"].value.trim();
        if (!/^\d{10,15}$/.test(phoneNumber)) {
            displayError("phoneNumberError", "Phone number must contain 10-15 digits.");
            isValid = false;
        }
        
        // Date of Birth Validation (Must be at least 18 years old)
        const dob = form["dob"].value;
        if (!validateAge(dob)) {
            displayError("dobError", "You must be at least 18 years old.");
            isValid = false;
        }
        
        // Terms and Conditions Validation
        const agreeToTerms = form["agreeToTerms"].checked;
        if (!agreeToTerms) {
            displayError("agreeToTermsError", "You must agree to the terms and conditions.");
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        }
        return age >= 18;
    }
    
    function displayError(fieldId, message) {
        const errorElement = document.getElementById(fieldId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
        console.warn("Validation Warning:", message);
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll(".error-message");
        errorElements.forEach(el => el.style.display = "none");
    }
});
