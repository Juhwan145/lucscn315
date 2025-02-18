document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("churchForm");
    const resultMessage = document.getElementById("resultMessage");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        // Get form values
        const name = document.getElementById("name").value.trim();
        const age = document.getElementById("age").value.trim();
        const sex = document.querySelector('input[name="sex"]:checked')?.value;
        const churchAttend = document.querySelector('input[name="churchAttend"]:checked')?.value;
        const serviceAreas = Array.from(document.querySelectorAll('input[name="service"]:checked'))
                                  .map(checkbox => checkbox.value);

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

        // Calculate birth year
        function calculateBirthYear(age) {
            const currentYear = new Date().getFullYear();
            return currentYear - age;
          }
        function getServiceMessage(serviceAreas) {
            return serviceAreas.length > 0
              ? `Ministries you'd like to serve in: ${serviceAreas.join(", ")}`
              : "You have not selected any ministry preferences.";
          }

        // Use the function to calculate the birth year
const birthYear = calculateBirthYear(age);

// Generate a service message
const serviceMessage = getServiceMessage(serviceAreas);

// Log the results
console.log(`Birth Year: ${birthYear}`);
console.log(serviceMessage);

        // Display results
        resultMessage.innerHTML = `
            Hello, <strong>${name}</strong>!<br>
            You are <strong>${age}</strong> years old (${sex}), likely born in <strong>${birthYear}</strong>.<br>
            Church attendance: <strong>${churchAttend}</strong><br>
            ${serviceMessage}<br>
            ${generateMessage(name)}
        `;

        // Log results in the console
        console.log({ name, age, sex, churchAttend, serviceAreas, birthYear });
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
