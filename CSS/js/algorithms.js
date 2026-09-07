function getNeighbors(node, rows, cols) {

    const neighbors = [];

    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    for (const [dr, dc] of directions) {

        const nr = node.row + dr;
        const nc = node.col + dc;

        if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols
        ) {
            neighbors.push({
                row: nr,
                col: nc
            });
        }
    }

    return neighbors;
}


/* =========================
   BREADTH FIRST SEARCH
========================= */

function bfs(grid, start, end) {

    const rows = grid.length;
    const cols = grid[0].length;

    const queue = [start];

    const visited = new Set();

    const parent = new Map();

    const visitedOrder = [];

    const startKey = `${start.row}-${start.col}`;

    visited.add(startKey);

    while (queue.length > 0) {

        const current = queue.shift();

        visitedOrder.push(current);

        if (
            current.row === end.row &&
            current.col === end.col
        ) {
            break;
        }

        const neighbors =
            getNeighbors(current, rows, cols);

        for (const neighbor of neighbors) {

            const key =
                `${neighbor.row}-${neighbor.col}`;

            if (
                grid[neighbor.row][neighbor.col].wall ||
                visited.has(key)
            ) {
                continue;
            }

            visited.add(key);

            parent.set(key, current);

            queue.push(neighbor);
        }
    }

    const path =
        reconstructPath(parent, start, end);

    return {
        visitedOrder,
        path
    };
}


/* =========================
   DEPTH FIRST SEARCH
========================= */

function dfs(grid, start, end) {

    const rows = grid.length;
    const cols = grid[0].length;

    const stack = [start];

    const visited = new Set();

    const parent = new Map();

    const visitedOrder = [];

    const startKey =
        `${start.row}-${start.col}`;

    visited.add(startKey);

    while (stack.length > 0) {

        const current = stack.pop();

        visitedOrder.push(current);

        if (
            current.row === end.row &&
            current.col === end.col
        ) {
            break;
        }

        const neighbors =
            getNeighbors(current, rows, cols);

        for (const neighbor of neighbors) {

            const key =
                `${neighbor.row}-${neighbor.col}`;

            if (
                grid[neighbor.row][neighbor.col].wall ||
                visited.has(key)
            ) {
                continue;
            }

            visited.add(key);

            parent.set(key, current);

            stack.push(neighbor);
        }
    }

    const path =
        reconstructPath(parent, start, end);

    return {
        visitedOrder,
        path
    };
}


/* =========================
   DIJKSTRA
========================= */

function dijkstra(grid, start, end) {

    const rows = grid.length;
    const cols = grid[0].length;

    const distances = {};
    const parent = new Map();

    const visited = new Set();

    const visitedOrder = [];

    const nodes = [];

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < cols; c++) {

            const key = `${r}-${c}`;

            distances[key] = Infinity;

            nodes.push({
                row: r,
                col: c,
                distance: Infinity
            });
        }
    }

    const startKey =
        `${start.row}-${start.col}`;

    distances[startKey] = 0;

    while (true) {

        let current = null;

        for (const node of nodes) {

            const key =
                `${node.row}-${node.col}`;

            if (
                visited.has(key) ||
                grid[node.row][node.col].wall
            ) {
                continue;
            }

            if (
                current === null ||
                distances[key] < current.distance
            ) {
                current = {
                    row: node.row,
                    col: node.col,
                    distance: distances[key]
                };
            }
        }

        if (
            current === null ||
            current.distance === Infinity
        ) {
            break;
        }

        const currentKey =
            `${current.row}-${current.col}`;

        visited.add(currentKey);

        visitedOrder.push({
            row: current.row,
            col: current.col
        });

        if (
            current.row === end.row &&
            current.col === end.col
        ) {
            break;
        }

        const neighbors =
            getNeighbors(current, rows, cols);

        for (const neighbor of neighbors) {

            const key =
                `${neighbor.row}-${neighbor.col}`;

            if (
                grid[neighbor.row][neighbor.col].wall ||
                visited.has(key)
            ) {
                continue;
            }

            const newDistance =
                current.distance + 1;

            if (newDistance < distances[key]) {

                distances[key] = newDistance;

                parent.set(key, {
                    row: current.row,
                    col: current.col
                });
            }
        }
    }

    const path =
        reconstructPath(parent, start, end);

    return {
        visitedOrder,
        path
    };
}


/* =========================
   PATH RECONSTRUCTION
========================= */

function reconstructPath(parent, start, end) {

    const path = [];

    let current = {
        row: end.row,
        col: end.col
    };

    const startKey =
        `${start.row}-${start.col}`;

    let currentKey =
        `${current.row}-${current.col}`;

    while (currentKey !== startKey) {

        path.unshift(current);

        if (!parent.has(currentKey)) {
            return [];
        }

        current =
            parent.get(currentKey);

        currentKey =
            `${current.row}-${current.col}`;
    }

    path.unshift(start);

    return path;
}
