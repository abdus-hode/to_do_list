const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let submit_btn = document.querySelector(".submit_btn");
    if (submit_btn.dataset.action == "add_task") {
        // console.log("Hello", document.querySelector("#text").value);
        insertTask(form);
        form.reset();
    }
    else if (submit_btn.dataset.action == "update_task") {
        updateTask(form);
        form.reset();
    }
})

async function insertTask(form) {

    try {
        let date = new Date();
        let dateTask = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

        let formData = new FormData(form);
        formData.append("date", dateTask);
        formData.append("state", "false");
        formData.append("action", "insert");

        const response = await fetch("todo_backend.php", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        console.log(data);

        listTask();
        // showMessage("New task added successfully!", "");
        showMessage("New task added successfully!", "green");
    }
    catch (error) {
        console.error(error);
    }
}


async function listTask() {

    try {
        document.querySelector(".display").innerHTML = "";
        let response = await fetch("todo_backend.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "action=select"
        });
        let tasks = await response.json();

        tasks.forEach(task => {
            let task_div = document.createElement("div");
            task_div.classList.add("data");

            if (task.states === "true") {
                task_div.innerHTML = `
                <p class="todo_text" style="text-decoration: line-through">${task.task_text}</p>
                <p class="date_hour" style="text-decoration: line-through">${task.task_date}</p>
                <div class="buttons">
                    <button onclick="checkTask(this)" data-state="${task.states}"><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/filled-circle.png" alt="filled-circle"/></button>
                    <button onclick="deleteTask(this)"><img class="delete_btn" width="50" height="50" src="https://img.icons8.com/color/50/cancel--v1.png" alt="cancel--v1"/></button>
                    <button onclick="insertDataInput(this)"><img class="update_btn" width="67" height="67" src="https://img.icons8.com/external-others-inmotus-design/67/external-Edit-virtual-keyboard-others-inmotus-design.png" alt="external-Edit-virtual-keyboard-others-inmotus-design"/></button>
                </div>`;
                task_div.querySelector("img").src = "https://img.icons8.com/forma-light-filled-sharp/50/40C057/checked.png";
            }
            else if (task.states === "false") {
                task_div.innerHTML = `
                <p class="todo_text" style="text-decoration: none">${task.task_text}</p>
                <p class="date_hour" style="text-decoration: none">${task.task_date}</p>
                <div class="buttons">
                    <button onclick="checkTask(this)" data-state="${task.states}"><img width="50" height="50" src="https://img.icons8.com/ios-filled/50/40C057/filled-circle.png" alt="filled-circle"/></button>
                    <button onclick="deleteTask(this)"><img class="delete_btn" width="50" height="50" src="https://img.icons8.com/color/50/cancel--v1.png" alt="cancel--v1"/></button>
                    <button onclick="insertDataInput(this)"><img class="update_btn" width="67" height="67" src="https://img.icons8.com/external-others-inmotus-design/67/external-Edit-virtual-keyboard-others-inmotus-design.png" alt="external-Edit-virtual-keyboard-others-inmotus-design"/></button>
                </div>`;
                task_div.querySelector("img").src = "https://img.icons8.com/ios-filled/50/40C057/filled-circle.png";
            }



            document.querySelector(".display").appendChild(task_div);
        });
    }
    catch (error) {
        console.error(error);
    }
}

window.addEventListener("load", listTask);

async function checkTask(button) {
    let task_div = button.closest(".data");
    if (task_div) {
        let todo_text = task_div.querySelector(".todo_text").textContent;
        let date_hour = task_div.querySelector(".date_hour").textContent;
        if (button.dataset.state === "false") {
            button.dataset.state = "true";
            task_div.querySelector(".todo_text").style.textDecoration = "line-through";
            task_div.querySelector(".date_hour").style.textDecoration = "line-through";
            task_div.querySelector("img").src = "https://img.icons8.com/forma-light-filled-sharp/50/40C057/checked.png";
        }
        else if (button.dataset.state === "true") {
            button.dataset.state = "false";
            task_div.querySelector(".todo_text").style.textDecoration = "none";
            task_div.querySelector(".date_hour").style.textDecoration = "none";
            task_div.querySelector("img").src = "https://img.icons8.com/ios-filled/50/40C057/filled-circle.png";
        }

        const response = await fetch("todo_backend.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `task_text=${todo_text}&&task_date=${date_hour}&&state=${button.dataset.state}&&action=checkTask`
        })
        const data = await response.json();
        console.log(data);
    }
}



async function deleteTask(button) {
    let task_div = button.closest(".data");

    if (task_div) {
        // task_div.remove();
        // console.log("");
        let msg = task_div.querySelector(".todo_text").textContent;
        let date = task_div.querySelector(".date_hour").textContent;
        const response = await fetch("todo_backend.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `msg=${msg}&&date=${date}&&action=delete`
        });
        // const data = await response.json();
        listTask();
        showMessage("Task deleted successfully!", "red");
    }
}

function pad(n) {
    return n.toString().padStart(2, "0");
}

async function updateTask(form) {

    let old_msg = form.dataset.msg_old;
    let old_date = form.dataset.date_old;

    let date_now = new Date();
    let date_new = `${pad(date_now.getDate())}/${pad(date_now.getMonth() + 1)}/${date_now.getFullYear()} ${pad(date_now.getHours())}:${pad(date_now.getMinutes())}`;

    const formData = new FormData(form);
    formData.append("date", date_new);
    formData.append("old_msg", old_msg);
    formData.append("old_date", old_date);
    formData.append("action", "update");
    const response = await fetch("todo_backend.php", {
        method: "POST",
        body: formData
    });

    listTask();
    document.querySelector(".submit_btn").dataset.action = "add_task";
    showMessage("Task updated successfully!", "hsl(212, 100%, 50%)");
}

function insertDataInput(button) {
    // let tasks = document.querySelector  
    let task_div = button.closest(".data");
    if (task_div) {
        task_div.style.backgroundColor = "hsl(0, 0%, 20%)";
        let old_msg = task_div.querySelector(".todo_text").textContent;
        let old_date = task_div.querySelector(".date_hour").textContent; // <- CORRETO AGORA
        let input = document.querySelector("#text");
        input.value = old_msg;
        document.querySelector(".submit_btn").dataset.action = "update_task";
        document.querySelector(".form").dataset.msg_old = old_msg;
        document.querySelector(".form").dataset.date_old = old_date;
    }
}


function showMessage(message, color) {
    let msg_box = document.querySelector(".modal_msg");
    msg_box.textContent = message;
    msg_box.style.backgroundColor = color;
    msg_box.style.display = "flex";

    setTimeout(() => {
        msg_box.textContent = "";
        msg_box.style.display = "none";
    }, 3000)

}