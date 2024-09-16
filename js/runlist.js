
// /////////////// Handling Running list (Draw in HTML & Other Action)
let runRowTableDetails = document.querySelector(".run-row-table-details");
let getRunningTasks = localStorage.getItem("runningTasks")? JSON.parse(localStorage.getItem("runningTasks")): [];
let savedWaitingTasks = localStorage.getItem("savedWaitingTasks")? JSON.parse(localStorage.getItem("savedWaitingTasks")): [];
let getTaskEnded = localStorage.getItem("tasksEnd")? JSON.parse(localStorage.getItem("tasksEnd")): [];

function drawRunningData(dd) {
    let runRow = dd.map(ta => {
        return `
                <tr key="${ta.id}">
                    <td>${ta.taskDesc}</td>
                    <td>${ta.runStartDate}</td>
                    <td>${ta.statues}</td>
                    <td onclick="pauseRunFun(${ta.id})"><i class="fa-regular fa-circle-pause" id="pauseBtn"></i></td>
                    <td><i class="fa-solid fa-hourglass-end" onclick="endTaskFun(${ta.id})"></i></td>
                </tr>
                `
    }).join(' ');
    runRowTableDetails.innerHTML = runRow;
}
drawRunningData(getRunningTasks)

// ///////////////// Pausind & Re_Running tasks Function
function pauseRunFun(id) {
    let pauseBtn = document.querySelector("#pauseBtn");
    let changeTaskIndex = getRunningTasks.findIndex(f => f.id == id);
    if (getRunningTasks[changeTaskIndex].statues == "Running") {
        getRunningTasks[changeTaskIndex].statues = "Paused";
        pauseBtn.classList.remove("fa-circle-pause");
        pauseBtn.classList.add("fa-circle-play");
        alert(`Task: "${getRunningTasks[changeTaskIndex].taskDesc}" is Paused`);
        drawRunningData(getRunningTasks);
        location.reload("runlist.html");
        localStorage.setItem("runningTasks", JSON.stringify(getRunningTasks));
    } else if ( getRunningTasks[changeTaskIndex].statues == "Paused"){
        getRunningTasks[changeTaskIndex].statues = "Running";
        pauseBtn.classList.remove("fa-circle-play");
        pauseBtn.classList.add("fa-circle-pause");
        alert(`Task: "${getRunningTasks[changeTaskIndex].taskDesc}" is Re_Running`);
        drawRunningData(getRunningTasks);
        location.reload("runlist.html");
        localStorage.setItem("runningTasks", JSON.stringify(getRunningTasks));
    }
}

// /////////////////// Convert Task To Be Ended Function
function endTaskFun(id) {
    let taskEnd = getRunningTasks.find(f => f.id == id);
    let endDate = (new Date()).toLocaleString();
    taskEnd.statues = "End";
    taskEnd.endDate = endDate;
    getTaskEnded = [...getTaskEnded, taskEnd]
    localStorage.setItem("tasksEnd", JSON.stringify(getTaskEnded));
    getRunningTasks = getRunningTasks.filter(fi => fi.statues == "Running");
    drawRunningData(getRunningTasks);
    location.reload("runlist.html");
    localStorage.setItem("runningTasks", JSON.stringify(getRunningTasks));
    alert(`Task: "${taskEnd.taskDesc}" is finished `);
}
