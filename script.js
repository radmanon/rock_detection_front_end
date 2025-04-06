let backendURL = "https://0c52-2605-8d80-8020-8b9-e19a-45fa-102c-e9fc.ngrok-free.app/";


function login() {
    const username = document.getElementById("username").value;
    if (username.trim()) {
        document.getElementById("userDisplay").innerText = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
}

function startDetection() {
    fetch(`${backendURL}/start-detection`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("response").innerText = data.status || "Triggered!";
        })
        .catch(err => {
            document.getElementById("response").innerText = "❌ Failed to connect to Pi.";
            console.error(err);
        });
}

function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    if (fileInput.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch(`${backendURL}/predict-image`, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("response").innerText = data.status;
        })
        .catch(err => {
            document.getElementById("response").innerText = "❌ Prediction failed.";
            console.error(err);
        });
}
