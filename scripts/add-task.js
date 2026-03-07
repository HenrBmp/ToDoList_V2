import { PopUp } from "./pop-up";
function addTask(){
    event.preventDefault();
    const DESC_INPUT = document.getElementById("description-entry");
    const DATE_INPUT = document.getElementById("validity-entry");
    if (!DESC_INPUT.value) {
        PopUp("Descrição inválida.");
        return
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
        "isOverdue": DATE_OBJECT.getTime() < NOW.getTime() ? false : true
    };
    const tasklist = JSON.parse(localStorage.getItem("tasklist"));
    function CheckRepeatedTask(target_task) {
        return (
            THIS_TASK_OBJECT.description === target_task.description &&
            THIS_TASK_OBJECT.epoch === target_task.epoch &&
            THIS_TASK_OBJECT.subOrder === target_task.subOrder
        )
    };
    if (tasklist.some(CheckRepeatedTask)) {
        PopUp("Esta tarefa já existe.");
        return;
    };
    tasklist.push(THIS_TASK_OBJECT);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
}
export { addTask };