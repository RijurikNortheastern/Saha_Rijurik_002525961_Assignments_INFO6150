$(document).ready(function () {

    // Hardcoded users
    const users = [
        { email: "student1@northeastern.edu", password: "password123" },
        { email: "test@northeastern.edu", password: "testing123" }
    ];

    // Validate inputs
    function validateFields() {
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        let valid = true;

        // Validate email
        if (!email.endsWith("@northeastern.edu") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $("#emailError").text("Please enter a valid Northeastern email");
            valid = false;
        } else {
            $("#emailError").text("");
        }

        // Validate password
        if (password.length < 8) {
            $("#passError").text("Password must be at least 8 characters");
            valid = false;
        } else {
            $("#passError").text("");
        }

        $("#loginBtn").prop("disabled", !valid);
    }

    $("#email, #password").on("keyup blur focus", validateFields);

    // Form submit
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        const remember = $("#rememberMe").is(":checked");

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            $("#loginError").text("Invalid email or password");
            return;
        }

        $("#loginError").text("");

        const username = email.split("@")[0];
        const data = {
            username,
            email,
            loginTime: new Date().toLocaleString(),
            isLoggedIn: true
        };

        // Store login session
        remember 
            ? localStorage.setItem("user", JSON.stringify(data))
            : sessionStorage.setItem("user", JSON.stringify(data));

        $("#loginSuccess")
            .text("Login successful! Redirecting...")
            .fadeIn()
            .delay(1500)
            .fadeOut();

        setTimeout(() => {
            window.location.href = "calculator.html";
        }, 2000);
    });
});
