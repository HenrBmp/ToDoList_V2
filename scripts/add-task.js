import { PopUp } from "./pop-up.js";
export async    function addTask(){
    event.preventDefault();
    const DESC_INPUT = document.getElementById("description-entry");
    const DATE_INPUT = document.getElementById("validity-entry");
    if (!DESC_INPUT.value) {
        PopUp("Descrição inválida.");
        return;
    } else if (!DESC_INPUT.value) {
        PopUp("Data inválida.");
        return;
    } else if (!DESC_INPUT.value && !DESC_INPUT.value) {
        PopUp("Descrição e data inválidas.");
        return;
    }
    const DATE_OBJECT = DATE_INPUT.valueAsDate;
    const NOW = new Date;
    const THIS_TASK_OBJECT = {
        "description": DESC_INPUT.value,
        "epoch": DATE_OBJECT.getTime(),
        "subOrder": 0,
        "isDone": false,
        "isOverdue": DATE_OBJECT.getTime() < NOW.getTime() ? true : false
    };
    const tasklist = JSON.parse(localStorage.getItem("tasklist"));
    const task_already_exists = tasklist.some(
        function CheckRepeatedTask (target_task) {
            THIS_TASK_OBJECT.description === target_task.description &&
            THIS_TASK_OBJECT.epoch === target_task.epoch &&
            THIS_TASK_OBJECT.subOrder === target_task.subOrder
        }
    );
    if (task_already_exists) {
        PopUp("Esta tarefa já existe.");
        return;
    };
    tasklist.forEach(
        function CheckOrder (target) {
            if (
                target.epoch === THIS_TASK_OBJECT.epoch &&
                target.description === THIS_TASK_OBJECT.description
            ) {
                THIS_TASK_OBJECT.subOrder = target.subOrder + 1;
            }
        }
    );
    tasklist.push(THIS_TASK_OBJECT);
    tasklist.sort((taskA, taskB) => taskA.epoch - taskB.epoch);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
    return tasklist;
}