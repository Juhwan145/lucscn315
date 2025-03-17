document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("churchForm");
    const resultMessage = document.getElementById("resultMessage");
    const prayerInput = document.getElementById("prayerRequest");
    const prayerError = document.getElementById("prayerError");
    const profilePictureInput = document.getElementById("profilePicture");
    const uploadedImage = document.getElementById("uploadedImage");
    const phoneNumberInput = document.getElementById("phoneNumber");
    const phoneError = document.getElementById("phoneError");
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    const ageInput = document.getElementById("age");
    const ageError = document.getElementById("ageError");

    phoneNumberInput.addEventListener("input", () => {
        const phonePattern = /^[0-9]{10,}$/;
        phoneError.textContent = phonePattern.test(phoneNumberInput.value) ? "" : "Please enter a valid phone number with at least 10 digits.";
    });

    nameInput.addEventListener("input", () => {
        const namePattern = /^[a-zA-Z\s]+$/;
        nameError.textContent = namePattern.test(nameInput.value) ? "" : "Please enter a valid name (letters and spaces only).";
    });

    ageInput.addEventListener("input", () => {
        const agePattern = /^[1-9][0-9]*$/;
        ageError.textContent = agePattern.test(ageInput.value) ? "" : "Please enter a valid age (positive numbers only).";
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (phoneError.textContent || nameError.textContent || ageError.textContent) {
            resultMessage.textContent = "Please fix the errors before submitting.";
            return;
        }

        const name = nameInput.value.trim();
        const age = ageInput.value.trim();
        const sex = document.querySelector('input[name="sex"]:checked')?.value;
        const churchAttend = document.querySelector('input[name="churchAttend"]:checked')?.value;
        const serviceAreas = Array.from(document.querySelectorAll('input[name="service"]:checked')).map(checkbox => checkbox.value);
        const prayerRequest = prayerInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();

        if (!name || !age || !sex || !churchAttend || !phoneNumber) {
            resultMessage.textContent = "Please fill in all required fields.";
            return;
        }

        const birthYear = new Date().getFullYear() - age;
        const serviceMessage = serviceAreas.length ? `<ul>${serviceAreas.map(area => `<li>${area}</li>`).join("")}</ul>` : "<p>You have not selected any ministry preferences.</p>";

        resultMessage.innerHTML = `
            Hello, <strong>${name}</strong>!<br>
            You are <strong>${age}</strong> years old (${sex}), likely born in <strong>${birthYear}</strong>.<br>
            Phone Number: <strong>${phoneNumber}</strong><br>
            Church attendance: <strong>${churchAttend}</strong><br>
            Ministries you'd like to serve in:<br>
            ${serviceMessage}
            <strong>Prayer Request:</strong> "${prayerRequest}"<br>
            ${generateMessage(name)}
        `;

        const file = profilePictureInput.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    function generateMessage(name) {
        const messages = [
            `May God bless ${name} in their journey of faith!`,
            `${name}, continue shining the light of Christ in all that you do!`,
            `God loves you, ${name}! Keep growing in faith and love.`,
            `Welcome, ${name}! We are excited to have you in our church community.`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
});

