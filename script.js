const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthIndicator = document.getElementById("strength");
const togglePassword = document.getElementById("toggle-password");
const copySound = document.getElementById("copy-sound");
const toast = document.getElementById("toast");

// Function to generate a random password
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordInput.value = password;
    checkStrength(password);
}

// Function to check password strength
function checkStrength(password) {
    let strength = "Weak";
    let color = "red";
    if (password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
        strength = "Strong";
        color = "green";
    } else if (password.length >= 6) {
        strength = "Moderate";
        color = "orange";
    }
    strengthIndicator.textContent = `Strength: ${strength}`;
    strengthIndicator.style.color = color;
}

// Function to show toast notification
function showToast() {
    toast.classList.add("show");
    copySound.play(); // Play sound effect

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Event Listeners
generateBtn.addEventListener("click", generatePassword);
passwordInput.addEventListener("input", () => checkStrength(passwordInput.value));

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordInput.value)
        .then(() => showToast())
        .catch(err => console.error("Error copying: ", err));
});

togglePassword.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});
