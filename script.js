let backendURL = "https://4582-2605-8d80-8020-8b9-e19a-45fa-102c-e9fc.ngrok-free.app";

function login() {
    const username = document.getElementById("username").value;
    if (username.trim()) {
        document.getElementById("userDisplay").innerText = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
}

// ✅ New: open /video_feed in a separate browser tab
function openLiveStream() {
    document.getElementById("response").innerText = "Opening live stream page...";
    window.open(`${backendURL}/video_feed`, '_blank');
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
            if (!res.ok) throw new Error("❌ Prediction error");
            return res.json();
        })
        .then(data => {
            document.getElementById("response").innerText = data.status;

            // ✅ Open predicted image in new tab
            const fullImageURL = `${backendURL}${data.result_path}`;
            window.open(fullImageURL, '_blank');
        })
        .catch(err => {
            document.getElementById("response").innerText = "❌ Prediction failed.";
            console.error("Upload error:", err);
        });
}
