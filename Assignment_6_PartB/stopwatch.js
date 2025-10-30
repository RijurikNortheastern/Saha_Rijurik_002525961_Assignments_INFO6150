let timerInterval;
let seconds = 0;
let isRunning = false;

// Convert seconds -> HH:MM:SS
const formatTime = (s) => {
    const h = String(Math.floor(s/3600)).padStart(2,"0");
    const m = String(Math.floor((s%3600)/60)).padStart(2,"0");
    const sec = String(s%60).padStart(2,"0");
    return `${h}:${m}:${sec}`;
};

// Async wait
const wait = (ms) => new Promise(res => setTimeout(res, ms));

// Load history
function loadHistory(filter="") {
    const data = JSON.parse(localStorage.getItem("sessions")) || [];
    let filtered = filter ? data.filter(x => x.date === filter) : data;

    $("#history").html(
        filtered.length === 0
            ? "No sessions recorded yet."
            : filtered.map(x =>
                `<div class="history-item">
                    <b>${x.event}</b><br>
                    Date: ${x.date}<br>
                    Duration: ${x.time}
                </div>`
              ).join("")
    );

    // Stats
    let totalSessions = filtered.length;
    let totalTime = filtered.reduce((sum,x)=> sum + x.seconds, 0);
    $("#stats").text(
        `Sessions: ${totalSessions} | Total Time: ${formatTime(totalTime)}`
    );
}

$(document).ready(function() {

    loadHistory();

    $("#startBtn").click(async function() {
        let date = $("#eventDate").val().trim();
        let name = $("#eventName").val().trim();

        $("#dateError, #nameError").text("");

        if(!date) return $("#dateError").text("Please select a date");
        if(!name) return $("#nameError").text("Event name is required");
        if(name.length < 3) return $("#nameError").text("Minimum 3 characters");
        if(name.length > 100) return $("#nameError").text("Maximum 100 characters");
        if(!/^[A-Za-z0-9\s\-']+$/.test(name))
            return $("#nameError").text("Invalid characters used");

        isRunning = true;
        $("#pauseBtn, #stopBtn").prop("disabled", false);
        $("#startBtn, #eventDate, #eventName").prop("disabled", true);

        timerInterval = setInterval(() => {
            seconds++;
            $("#timer").text(formatTime(seconds));
        }, 1000);
    });

    $("#pauseBtn").click(function() {
        if(isRunning) {
            clearInterval(timerInterval);
            $("#pauseBtn").text("Resume");
        } else {
            $("#pauseBtn").text("Pause");
            timerInterval = setInterval(() => {
                seconds++;
                $("#timer").text(formatTime(seconds));
            }, 1000);
        }
        isRunning = !isRunning;
    });

    $("#stopBtn").click(async function() {
        clearInterval(timerInterval);

        const date = $("#eventDate").val();
        const event = $("#eventName").val();

        let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

        sessions.unshift({
            date,
            event,
            time: formatTime(seconds),
            seconds
        });

        localStorage.setItem("sessions", JSON.stringify(sessions));

        $("#pauseBtn").text("Pause");
        $("#startBtn, #eventDate, #eventName").prop("disabled", false);
        $("#pauseBtn, #stopBtn").prop("disabled", true);

        await wait(300);
        loadHistory();

        seconds = 0;
        $("#timer").text("00:00:00");
    });

    $("#resetBtn").click(function() {
        clearInterval(timerInterval);
        seconds = 0;
        $("#timer").text("00:00:00");
        isRunning = false;
        $("#pauseBtn").text("Pause");
        $("#startBtn, #eventDate, #eventName").prop("disabled", false);
        $("#pauseBtn, #stopBtn").prop("disabled", true);
    });

    $("#filterBtn").click(() => loadHistory($("#filterDate").val()));
    $("#clearFilterBtn").click(() => {
        $("#filterDate").val("");
        loadHistory();
    });
});
