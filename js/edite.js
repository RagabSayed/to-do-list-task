
// /////////////// Handling Edit Task (Varible Declertion , Draw in HTML & Save Edits)
let editTaskData = document.querySelector(".edit-form");
let editTaskBtn = document.querySelector(".edit-task-btn");
let getEditTask = localStorage.getItem("editTask")? JSON.parse(localStorage.getItem("editTask")): [];

// /////////////////// Draw in HTML
function drawEditForm() {
    let edFo = getEditTask.map(m => {
        return `
            <div class="edit-task">
                <div class="item1">
                    <label for="">Task Desc</label>
                    <input type="text" name="desc" id="taskDesc" required value="${m.taskDesc}">
                </div>
                <div class="item2">
                    <label for="">Start Date</label>
                    <input type="date" name="date" id="startDate" required value="${m.startDate}">
                </div>
                <div class="item3">
                    <label for="">Start Time</label>
                    <input type="time" name="time" id="startTime" required  value="${m.startTime}">
                </div>
            </div>
            <input class="edit-task-btn" type="button" value="Save Edited Task" onclick="saveEdit(${m.id})">
        `
    }).join(' ');
    editTaskData.innerHTML = edFo;
}
drawEditForm()

// /////////////////// Save Edits Function
function saveEdit(id) {
    let taskDesc = document.getElementById("taskDesc").value.trim();
    let startDate = document.getElementById("startDate").value.trim();
    let startTime = document.getElementById("startTime").value.trim();
    let savedWaitingTasks = localStorage.getItem("savedWaitingTasks")? JSON.parse(localStorage.getItem("savedWaitingTasks")): [];
    savedWaitingTasks.map(task => {
        if(task.id == id){
            task.taskDesc = taskDesc;
            task.startDate = startDate;
            task.startTime = startTime;
        }
    })
    localStorage.setItem("savedWaitingTasks", JSON.stringify(savedWaitingTasks));
    window.close();
    window.opener.location.reload();
    alert(`Changes saved successfully`);
}