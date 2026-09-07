const ROWS = 20;
const COLS = 30;

const gridElement =
    document.getElementById("grid");

const algorithmSelect =
    document.getElementById("algorithm");

const startBtn =
    document.getElementById("startBtn");

const clearPathBtn =
    document.getElementById("clearPathBtn");

const clearGridBtn =
    document.getElementById("clearGridBtn");

const randomBtn =
    document.getElementById("randomBtn");

const algorithmName =
    document.getElementById("algorithmName");

const visitedNodes =
    document.getElementById("visitedNodes");

const pathLength =
    document.getElementById("pathLength");

const executionTime =
    document.getElementById("executionTime");

const timeComplexity =
    document.getElementById("timeComplexity");

const spaceComplexity =
    document.getElementById("spaceComplexity");


let grid = [];

let startNode = {
    row: 5,
    col: 5
};

let endNode = {
    row: 14,
    col: 24
};

let mouseDown = false;


/* =========================
   CREATE GRID
========================= */

function createGrid() {

    grid = [];

    gridElement.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {

        const gridRow = [];

        for (let col = 0; col < COLS; col++) {

            const node = {
                row,
                col,
                wall: false
            };

            gridRow.push(node);

            const element =
                document.createElement("div");

            element.classList.add("node");

            element.dataset.row = row;
            element.dataset.col = col;

            if (
                row === startNode.row &&
                col === startNode.col
            ) {
                element.classList.add("start");
            }

            if (
                row === endNode.row &&
                col === endNode.col
            ) {
                element.classList.add("end");
            }

            element.addEventListener(
                "mousedown",
                () => toggleWall(row, col)
            );

            element.addEventListener(
                "mouseenter",
                () => {

                    if (mouseDown) {
                        toggleWall(row, col);
                    }

                }
            );

            gridElement.appendChild(element);
        }

        grid.push(gridRow);
    }

    updateComplexity();
}


/* =========================
   WALL MANAGEMENT
========================= */

function toggleWall(row, col) {

    if (
        (row === startNode.row &&
            col === startNode.col) ||

        (row === endNode.row &&
            col === endNode.col)
    ) {
        return;
    }

    grid[row][col].wall =
        !grid[row][col].wall;

    const element =
        getNodeElement(row, col);

    element.classList.toggle(
        "wall",
        grid[row][col].wall
    );
}


function getNodeElement(row, col) {

    return document.querySelector(
        `.node[data-row="${row}"][data-col="${col}"]`
    );
}


/* =========================
   CLEAR PATH
========================= */

function clearPath() {

    document
        .querySelectorAll(".visited, .path")
        .forEach(element => {

            element.classList.remove(
                "visited",
                "path"
            );
        });

    visitedNodes.textContent = "0";
    pathLength.textContent = "0";
    executionTime.textContent = "0 ms";
}


/* =========================
   CLEAR GRID
========================= */

function clearGrid() {

    grid.forEach(row => {

        row.forEach(node => {

            node.wall = false;

        });

    });

    createGrid();
    clearPath();
}


/* =========================
   RANDOM OBSTACLES
========================= */

function randomObstacles() {

    clearPath();

    grid.forEach(row => {

        row.forEach(node => {

            if (
                Math.random() < 0.25 &&
                !(
                    node.row === startNode.row &&
                    node.col === startNode.col
                ) &&
                !(
                    node.row === endNode.row &&
                    node.col === endNode.col
                )
            ) {

                node.wall = true;

                getNodeElement(
                    node.row,
                    node.col
                ).classList.add("wall");
            }

        });

    });
}


/* =========================
   VISUALIZE ALGORITHM
========================= */

async function visualize() {

    clearPath();

    startBtn.disabled = true;

    const algorithm =
        algorithmSelect.value;

    let result;

    const startTime =
        performance.now();

    if (algorithm === "bfs") {

        result =
            bfs(
                grid,
                startNode,
                endNode
            );

        algorithmName.textContent = "BFS";

    } else if (algorithm === "dfs") {

        result =
            dfs(
                grid,
                startNode,
                endNode
            );

        algorithmName.textContent = "DFS";

    } else {

        result =
            dijkstra(
                grid,
                startNode,
                endNode
            );

        algorithmName.textContent =
            "Dijkstra";
    }

    const endTime =
        performance.now();

    executionTime.textContent =
        `${(endTime - startTime).toFixed(2)} ms`;

    visitedNodes.textContent =
        result.visitedOrder.length;

    pathLength.textContent =
        result.path.length;

    updateComplexity();

    await animateVisited(
        result.visitedOrder
    );

    await animatePath(
        result.path
    );

    startBtn.disabled = false;
}


/* =========================
   VISITED ANIMATION
========================= */

function animateVisited(nodes) {

    return new Promise(resolve => {

        let index = 0;

        function next() {

            if (index >= nodes.length) {

                resolve();

                return;
            }

            const node =
                nodes[index];

            const element =
                getNodeElement(
                    node.row,
                    node.col
                );

            if (
                !element.classList.contains("start") &&
                !element.classList.contains("end")
            ) {

                element.classList.add("visited");
            }

            index++;

            setTimeout(next, 15);
        }

        next();
    });
}


/* =========================
   PATH ANIMATION
========================= */

function animatePath(path) {

    return new Promise(resolve => {

        let index = 0;

        function next() {

            if (index >= path.length) {

                resolve();

                return;
            }

            const node =
                path[index];

            const element =
                getNodeElement(
                    node.row,
                    node.col
                );

            if (
                !element.classList.contains("start") &&
                !element.classList.contains("end")
            ) {

                element.classList.remove("visited");

                element.classList.add("path");
            }

            index++;

            setTimeout(next, 40);
        }

        next();
    });
}


/* =========================
   COMPLEXITY
========================= */

function updateComplexity() {

    const algorithm =
        algorithmSelect.value;

    if (algorithm === "bfs") {

        timeComplexity.textContent =
            "O(V + E)";

        spaceComplexity.textContent =
            "O(V)";

    } else if (algorithm === "dfs") {

        timeComplexity.textContent =
            "O(V + E)";

        spaceComplexity.textContent =
            "O(V)";

    } else {

        timeComplexity.textContent =
            "O(V²)";

        spaceComplexity.textContent =
            "O(V)";
    }
}


/* =========================
   EVENTS
========================= */

document.body.addEventListener(
    "mousedown",
    () => {
        mouseDown = true;
    }
);

document.body.addEventListener(
    "mouseup",
    () => {
        mouseDown = false;
    }
);

startBtn.addEventListener(
    "click",
    visualize
);

clearPathBtn.addEventListener(
    "click",
    clearPath
);

clearGridBtn.addEventListener(
    "click",
    clearGrid
);

randomBtn.addEventListener(
    "click",
    randomObstacles
);

algorithmSelect.addEventListener(
    "change",
    updateComplexity
);


/* INITIALIZE */

createGrid();
