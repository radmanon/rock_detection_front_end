let ngrokURL = "https://afaf-2605-8d80-8020-8b9-00-fe4.ngrok-free.";  // Replace this with your Pi ngrok URL

function login() {
    const username = document.getElementById("username").value;
    if (username.trim()) {
        document.getElementById("userDisplay").innerText = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
}

function startDetection() {
    fetch(`${ngrokURL}/start-detection`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("response").innerText = data.status || "Triggered!";
        })
        .catch(err => {
            document.getElementById("response").innerText = "❌ Failed to connect to Pi.";
            console.error(err);
        });
}
