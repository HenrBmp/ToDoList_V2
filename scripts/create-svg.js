export async function createSVG (dPath) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.setAttribute("viewBox", "0 -960 960 960");
    element.classList.add("svg-btn");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", dPath);
    element.appendChild(path);
    return element;
};