$(document).ready(function () {

    // Check login session
    const user =
        JSON.parse(sessionStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    $("#welcomeText").text(`Welcome, ${user.username}!`);

    // Single arrow function for calculations
    const calculate = (n1, n2, op) => {
        switch (op) {
            case "add": return n1 + n2;
            case "subtract": return n1 - n2;
            case "multiply": return n1 * n2;
            case "divide": return n2 !== 0 ? n1 / n2 : "Error: Division by 0";
        }
    };

    // Handle operation buttons
    $(".op").click(function () {
        const val1 = $("#num1").val().trim();
        const val2 = $("#num2").val().trim();
        const op = $(this).data("op");

        let valid = true;

        if (!/^-?\d*\.?\d+$/.test(val1)) {
            $("#num1Err").text("Please enter a valid number");
            valid = false;
        } else $("#num1Err").text("");

        if (!/^-?\d*\.?\d+$/.test(val2)) {
            $("#num2Err").text("Please enter a valid number");
            valid = false;
        } else $("#num2Err").text("");

        if (!valid) return;

        const n1 = parseFloat(val1);
        const n2 = parseFloat(val2);

        const result = calculate(n1, n2, op);
        $("#result").val(result);
    });

    // Logout
    $("#logoutBtn").click(() => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");

        $(".container").fadeOut(600, () => {
            window.location.href = "login.html";
        });
    });
});
