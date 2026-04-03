import createSVG from "./create-svg.js";
export default async function loadTasks(tasksJSON) {
    document.querySelector("#tasks").innerHTML = "";
    tasksJSON.forEach(async task => {
        const task_div = document.createElement("div");
        task_div.id = `${task.epoch}-${task.subOrder}`;
        task_div.classList.add("task-item");
        if (task.isDone) task_div.classList.add("done");
        const now = new Date();
        if (!task.isOverdue && task.epoch < now.getTime()) task.isOverdue = true;
        if (task.isOverdue) task_div.classList.add("overdue");
        const done_buttton = await createSVG(
            task.isDone
                ? "m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                : "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
        );
        done_buttton.classList.add("done-check");
        done_buttton.addEventListener("click", function doneCheckClick() {
            const _tasksJSON = tasksJSON;
            const _task = task;
            if (task_div.classList.toggle("done")) {
                this.querySelector("path").setAttribute(
                    "d",
                    "m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
                );
            } else {
                this.querySelector("path").setAttribute(
                    "d",
                    "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
                );
            }
            const switch_isdone = _tasksJSON.map(e => {
                if (
                    e.epoch === _task.epoch &&
                    e.subOrder === _task.subOrder &&
                    e.description === _task.description
                ) {
                    e.isDone = !e.isDone;
                }
                return e;
            });
            localStorage.setItem("tasklist", JSON.stringify(switch_isdone));
        });
        const description = document.createElement("span");
        description.classList.add("task-description");
        description.innerHTML = task.description;
        const validity = document.createElement("span");
        validity.classList.add("task-validity");
        const this_task_epoch = new Date(task.epoch);
        validity.innerHTML = this_task_epoch.toLocaleString().replace(", ", "-").slice(0, -3);
        const buttons_div = document.createElement("div");
        buttons_div.classList.add("buttons-task");
        const edit_button = await createSVG(
            "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
        );
        edit_button.classList.add("edit-icon");
        edit_button.addEventListener("click", function editTask() {
            // TODO: EDICAO DE TASKS
        });
        const delete_button = await createSVG(
            "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
        );
        delete_button.classList.add("delete-icon");
        delete_button.addEventListener("click", function deleteTask() {
            // TODO: DELETAR TAREFAS
        });
        [edit_button, delete_button].forEach(element => buttons_div.appendChild(element));
        [done_buttton, description, validity, buttons_div].forEach(element => task_div.appendChild(element));
        const task_section = document.querySelector("#tasks");
        task_section.appendChild(task_div);
    });
}
