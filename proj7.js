document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("churchForm");
    const resultMessage = document.getElementById("resultMessage");
    const prayerInput = document.getElementById("prayerRequest");
    const prayerError = document.getElementById("prayerError");
    const profilePictureInput = document.getElementById("profilePicture");
    const uploadedImage = document.getElementById("uploadedImage");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        // Get form values
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();
        const sex = document.querySelector('input[name="sex"]:checked')?.value;
        const churchAttend = document.querySelector('input[name="churchAttend"]:checked')?.value;
        const serviceAreas = Array.from(document.querySelectorAll('input[name="service"]:checked'))
                                  .map(checkbox => checkbox.value);
        const prayerRequest = prayerInput.value.trim();

        // Validation
        if (!name || !age || !sex || !churchAttend) {
            resultMessage.textContent = "Please fill in all required fields.";
            console.error("Validation Error: Missing required input.");
            return;
        }

        if (isNaN(age) || age <= 0) {
            resultMessage.textContent = "Age must be a positive number.";
            console.error("Validation Error: Invalid age input.");
            return;
        }

        if (prayerRequest.length < 10) {
            prayerError.textContent = "Prayer request must be at least 10 characters long.";
            return;
        } else {
            prayerError.textContent = "";
        }

        // Calculate birth year
        function calculateBirthYear(age) {
            const currentYear = new Date().getFullYear();
            return currentYear - age;
        }

        // Generate list of selected ministries
        function generateServiceList(serviceAreas) {
            if (serviceAreas.length === 0) {
                return "<p>You have not selected any ministry preferences.</p>";
            }
            return `<ul>${serviceAreas.map(area => `<li>${area}</li>`).join("")}</ul>`;
        }

        // Use the function to calculate the birth year
        const birthYear = calculateBirthYear(age);

        // Generate a service message
        const serviceMessage = generateServiceList(serviceAreas);

        // Display results
        resultMessage.innerHTML = `
            Hello, <strong>${name}</strong>!<br>
            You are <strong>${age}</strong> years old (${sex}), likely born in <strong>${birthYear}</strong>.<br>
            Church attendance: <strong>${churchAttend}</strong><br>
            Ministries you'd like to serve in:<br>
            ${serviceMessage}
            <strong>Prayer Request:</strong> "${prayerRequest}"<br>
            ${generateMessage(name)}
        `;

        // Handle profile picture upload
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

    // Generate a personalized welcome message
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
