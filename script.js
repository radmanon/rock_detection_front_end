let backendURL = "https://aa1d-2605-8d80-8020-8b9-e19a-45fa-102c-e9fc.ngrok-free.app";

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
        .then(response => {
            if (!response.ok) throw new Error("❌ Server returned error for live detection");
            return response.json();
        })
        .then(data => {
            document.getElementById("response").innerText = data.status || "✅ Live Detection Started!";
        })
        .catch(err => {
            document.getElementById("response").innerText = "❌ Failed to connect to backend.";
            console.error("Live detection error:", err);
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
        .then(res => {
            if (!res.ok) {
                throw new Error("❌ Prediction endpoint returned error");
            }
            return res.json();
        })
        .then(data => {
            document.getElementById("response").innerText = data.status || "✅ Prediction complete!";
        })
        .catch(err => {
            document.getElementById("response").innerText = "❌ Prediction failed.";
            console.error("Upload error:", err);
        });
}


function startDetection() {
    document.getElementById("response").innerText = "Starting live detection...";
    const liveFeed = document.getElementById("liveFeed");
    liveFeed.src = `${backendURL}/video_feed`; // MJPEG stream
    liveFeed.style.display = "block";
}
