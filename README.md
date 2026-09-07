# 🗺️ PathFinder DSA

An interactive pathfinding algorithm visualizer built using HTML, CSS, and JavaScript.

This project demonstrates how fundamental graph traversal and shortest-path algorithms work by visualizing them on an interactive grid.

## 🚀 Features

- Interactive grid-based environment
- Add and remove obstacles
- Visualize BFS
- Visualize DFS
- Visualize Dijkstra's Algorithm
- Animated node exploration
- Animated path reconstruction
- Random obstacle generation
- Visited node counter
- Path length calculation
- Execution time measurement
- Time complexity display
- Space complexity display
- Responsive interface

## 🧠 Algorithms Implemented

### 1. Breadth-First Search — BFS

BFS explores nodes level by level using a queue.

It guarantees the shortest path when all edges have equal weight.

**Data Structure:** Queue

**Time Complexity:**
```text
O(V + E)
```

**Space Complexity:**
```text
O(V)
```

### 2. Depth-First Search — DFS

DFS explores as far as possible along one branch before backtracking.

It is implemented using a stack.

DFS does not necessarily produce the shortest path.

**Data Structure:** Stack

**Time Complexity:**
```text
O(V + E)
```

**Space Complexity:**
```text
O(V)
```

### 3. Dijkstra's Algorithm

Dijkstra's algorithm finds the shortest path from a starting node to a destination node for graphs with non-negative edge weights.

This implementation uses a simple array-based minimum-distance selection.

**Data Structure:** Distance Map + Visited Set

**Time Complexity:**
```text
O(V²)
```

**Space Complexity:**
```text
O(V)
```

## 🔄 How It Works

```text
Create Grid
     ↓
Select Start & End
     ↓
Add Obstacles
     ↓
Select Algorithm
     ↓
Run Algorithm
     ↓
Explore Nodes
     ↓
Reconstruct Path
     ↓
Display Result
```

## 🎮 How to Use

1. Open `index.html`.
2. Select an algorithm.
3. Click or drag on the grid to create obstacles.
4. Click **Start**.
5. Watch the algorithm explore the grid.
6. The final path will be highlighted.
7. Compare visited nodes, path length, and execution time.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Data Structures
- Graph Algorithms
- BFS
- DFS
- Dijkstra's Algorithm

## 📁 Project Structure

```text
Path-Finder-DSA/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    └── algorithms.js
```

## 🎯 DSA Concepts Demonstrated

- Graph traversal
- Breadth-First Search
- Depth-First Search
- Shortest Path
- Queue
- Stack
- Hash Map
- Set
- Backtracking / Path Reconstruction
- Time Complexity
- Space Complexity

## 💡 Example

A grid can be represented as:

```text
S . . # . . .
. # . # . # .
. # . . . # .
. . . # . . E
```

Where:

```text
S = Start
E = End
# = Obstacle
. = Open Node
```

The selected algorithm explores the graph and determines a path from the start node to the destination.

## 🔮 Future Improvements

- A* Search Algorithm
- Weighted nodes
- Priority Queue implementation
- Custom start/end positions
- Maze generation
- Algorithm comparison mode
- Performance charts
- Mobile touch controls

## 👩‍💻 Author

**MACHUKURI NIKITHA**

B.Tech Computer Science & Engineering Graduate — 2026

### GitHub

https://github.com/Nikki-121

### LinkedIn

https://www.linkedin.com/in/nikitha-m-3a069533a/

---

## ⭐ Learning Goal

This project was created to strengthen practical understanding of Data Structures and Algorithms through an interactive software application.

### 🚀 Build • Learn • Improve • Repeat
