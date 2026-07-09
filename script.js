document.getElementById("registrationForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event").value
    };

    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const message = await response.text();

    document.getElementById("message").innerText = message;
});