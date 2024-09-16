
// ///////////////////////// Draw Ended Tasks in HTML
let endRowTableDetails = document.querySelector(".end-row-table-details");
let getEndedTasks = localStorage.getItem("tasksEnd")? JSON.parse(localStorage.getItem("tasksEnd")): [];

function drawEndedTsks(end) {
    let endData = end.map(fin => {
        return `
            <tr key="${fin.id}">
                <td>${fin.taskDesc}</td>
                <td>${fin.runStartDate}</td>
                <td>${fin.endDate}</td>
                <td>${fin.statues}</td>
            </tr>
        `
    }).join(' ')
    endRowTableDetails.innerHTML = endData;
}
drawEndedTsks(getEndedTasks)