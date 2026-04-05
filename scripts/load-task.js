import createSVG from "./create-svg.js";
import PopUp from "./pop-up.js";
import addTask from "./add-task.js";
export default async function loadTasks(tasksJSON) {
    document.querySelector("#tasks").innerHTML = "";
    function isSomeTask(taskA, taskB) {
        return (
            taskA.epoch === taskB.epoch &&
            taskA.subOrder === taskB.subOrder &&
            taskA.description === taskB.description
        );
    }
    function doneCheckClick(task_for_done, class_toggle_target, path_toggle_target) {
        if (class_toggle_target.classList.toggle("done")) {
            path_toggle_target
                .querySelector("path")
                .setAttribute(
                    "d",
                    "m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
                );
        } else {
            path_toggle_target
                .querySelector("path")
                .setAttribute(
                    "d",
                    "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
                );
        }
        const data = JSON.parse(localStorage.getItem("tasklist"));
        const switch_isdone = data.map(el => {
            if (isSomeTask(el, task_for_done)) el.isDone = !el.isDone;
            return el;
        });
        localStorage.setItem("tasklist", JSON.stringify(switch_isdone));
    }
    function deleteTask() {
        // TODO: DELETAR TAREFAS
    }
    function editTask(taskForEdit) {
        const originalDescription =
            taskForEdit.querySelector(".task-description").innerHTML;
        const originalDate = new Date(Number.parseInt(taskForEdit.id.slice(0, -2)));
        const originalSubOrder = Number.parseInt(taskForEdit.id.slice(-1));
        const originalIsDone = taskForEdit.classList.contains("done");
        PopUp(
            "Edite sua tarefa.",
            "Pronto",
            () => {
                const description_input = document.createElement("input");
                description_input.type = "text";
                description_input.id = "pop-up-txt-input";
                description_input.value = originalDescription;
                const date_input = document.createElement("input");
                date_input.type = "datetime-local";
                date_input.id = "pop-up-date-input";
                date_input.valueAsNumber = originalDate.getTime() - originalDate.getTimezoneOffset()*60*1000;
                return [description_input, date_input];
            },
            async () => {
                const newDescription = document.querySelector("#pop-up-txt-input").value;
                const newDate = document.querySelector("#pop-up-date-input").value;
                const newDateEpoch = Date.parse(newDate);
                if (
                    originalDescription === newDescription &&
                    originalDate.getTime() === newDateEpoch
                )
                    return;

                const data = JSON.parse(localStorage.getItem("tasklist"));
                const filtered = data.filter(
                    el =>
                        !isSomeTask(el, {
                            epoch: originalDate.getTime(),
                            subOrder: originalSubOrder,
                            description: originalDescription,
                        }),
                );
                localStorage.setItem("tasklist", JSON.stringify(filtered));
                const tasklist = await addTask(newDescription, newDateEpoch, originalIsDone);
                if (tasklist) {
                    loadTasks(tasklist);
                }
            },
            false,
        );
    }
    tasksJSON.forEach(async task => {
        const task_div = document.createElement("div");
        task_div.id = `${task.epoch}-${task.subOrder}`;
        task_div.classList.add("task-item");
        if (task.isDone) task_div.classList.add("done");
        if (!task.isOverdue && task.epoch < Date.now()) task.isOverdue = true;
        if (task.isOverdue) task_div.classList.add("overdue");
        const done_button = await createSVG(
            task.isDone
                ? "m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
                : "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",
        );
        done_button.classList.add("done-check");
        done_button.addEventListener("click", () =>
            doneCheckClick(task, task_div, done_button),
        );
        const description = document.createElement("span");
        description.classList.add("task-description");
        description.innerHTML = task.description;
        const validity = document.createElement("span");
        validity.classList.add("task-validity");
        const thisTaskDate = new Date(task.epoch);
        const dmyFormater = new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        validity.innerHTML = dmyFormater.format(thisTaskDate);
        const buttons_div = document.createElement("div");
        buttons_div.classList.add("buttons-task");
        const edit_button = await createSVG(
            "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
        );
        edit_button.classList.add("edit-icon");
        edit_button.addEventListener("click", () => editTask(task_div));
        const delete_button = await createSVG(
            "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
        );
        delete_button.classList.add("delete-icon");
        delete_button.addEventListener("click", () => deleteTask());
        [edit_button, delete_button].forEach(element => buttons_div.appendChild(element));
        [done_button, description, validity, buttons_div].forEach(element =>
            task_div.appendChild(element),
        );
        const task_section = document.querySelector("#tasks");
        task_section.appendChild(task_div);
    });
}
