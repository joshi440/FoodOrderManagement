
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const food = document.getElementById("food").value;

    if (!name || !email || !phone || !food) {
        message.style.color = "red";
        message.textContent = "Please fill in all fields.";
        return;
    }

    message.style.color = "green";
    message.textContent =
        "Thank you, " + name + "! Your " + food +
        " order has been registered successfully.";

    form.reset();
});
