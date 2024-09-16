// //////////   Varible Definition
let taskFields = {
    id: 0,
    taskDesc: "",
    startDate: "",
    startTime: "",
    statues: ""
};
let rowTableDetails = document.querySelector(".row-table-details");
let addToListBtn = document.querySelector(".add-to-list-btn");
let savedWaitingTasks = localStorage.getItem("savedWaitingTasks")? JSON.parse(localStorage.getItem("savedWaitingTasks")): [];
let runningTasks = localStorage.getItem("runningTasks")? JSON.parse(localStorage.getItem("runningTasks")): [];

// //////////////// Draw HTML Elements to show waiting to do list
function drawTableData(data) {
    let tableRow = data.map(task => {
        return `
                <tr key="${task.id}">
                    <td>${task.taskDesc}</td>
                    <td>${task.startDate}</td>
                    <td>${task.startTime}</td>
                    <td><i class="fa-regular fa-circle-play" onclick="startTask(${task.id})"></i></td>
                    <td><i class="fa-regular fa-pen-to-square" onclick="editTask(${task.id})"></i></td>
                    <td><i class="fa-regular fa-trash-can" onclick="removeTask(${task.id})"></i></td>
                </tr>
                `
    }).join(' ');
    rowTableDetails.innerHTML = tableRow
}
drawTableData(savedWaitingTasks);

// /////////////////////// Add New Task Function
addToListBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let addNewTask = taskFields;
    let setId = savedWaitingTasks.length > 0? savedWaitingTasks[savedWaitingTasks.length -1].id + 1: 1;
    let taskDesc = document.getElementById("taskDesc").value.trim();
    let startDate = document.getElementById("startDate").value.trim();
    let startTime = document.getElementById("startTime").value.trim();
    addNewTask.id = setId;
    addNewTask.taskDesc = taskDesc;
    addNewTask.startDate = startDate;
    addNewTask.startTime = startTime;
    addNewTask.statues = "New";
    if (taskDesc && startDate && startTime) {
        savedWaitingTasks=[...savedWaitingTasks, addNewTask];
        drawTableData(savedWaitingTasks);
        localStorage.setItem("savedWaitingTasks", JSON.stringify(savedWaitingTasks));
        alert("Task saved successfully, And added to waiting list");
        location.reload("index.html");
    }else{
        alert("You must fill data in all input form")
    }
})

// ////////////////////// Convert Task to be Running Function
function startTask(id) {
    let runTask =  savedWaitingTasks.find(f => f.id == id);
    let runStartDate = (new Date()).toLocaleString();
    runTask.statues = "Running";
    runTask.runStartDate = runStartDate;
    alert(`Task "${runTask.taskDesc}" is running`);
    runningTasks = [...runningTasks, runTask];
    localStorage.setItem("runningTasks", JSON.stringify(runningTasks));
    savedWaitingTasks = savedWaitingTasks.filter(f => f.statues == "New");
    drawTableData(savedWaitingTasks);
    localStorage.setItem("savedWaitingTasks", JSON.stringify(savedWaitingTasks));
    location.reload("index.html");
}

// /////////////////// Edit Data of Current Task Function
function editTask(id) {
    let getEditTask =  savedWaitingTasks.filter(f => f.id == id);
    localStorage.setItem("editTask", JSON.stringify(getEditTask));
    window.open("edite.html", "Edit Task", "width=500, height=500");
}

// ////////////////////////// Remove Task Function
function removeTask(id) {
    if (confirm("Do you wante to remove this task?") == true) {
        let getRemoveTaskIndex =  savedWaitingTasks.findIndex(f => f.id == id);
        savedWaitingTasks.splice(getRemoveTaskIndex, 1);
        drawTableData(savedWaitingTasks);
        localStorage.setItem("savedWaitingTasks", JSON.stringify(savedWaitingTasks));
        location.reload("index.html");
    }
}