const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function switchMode(mode) {
  document.getElementById("stack-controls").style.display =
    mode === "stack" ? "block" : "none";
  document.getElementById("graph-controls").style.display =
    mode === "graph" ? "block" : "none";
  document.getElementById("stack-viz").style.display =
    mode === "stack" ? "flex" : "none";
  document.getElementById("graph-viz").style.display =
    mode === "graph" ? "block" : "none";
  if (mode === "graph") initGraph();
}
let stack = [];
function push() {
  const val = document.getElementById("stackValue").value;
  if (!val) return;
  stack.push(val);
  renderStack();
}

function pop() {
  if (stack.length === 0) return setStatus("Stack Underflow!");
  stack.pop();
  renderStack();
}

function renderStack() {
  const container = document.getElementById("stack-viz");
  container.innerHTML = stack
    .map((v) => `<div class="stack-node">${v}</div>`)
    .join("");
}

const nodes = [
  { id: 0, x: 100, y: 200 },
  { id: 1, x: 300, y: 100 },
  { id: 2, x: 300, y: 300 },
  { id: 3, x: 500, y: 200 },
];
const edges = [
  { from: 0, to: 1, w: 5 },
  { from: 0, to: 2, w: 2 },
  { from: 1, to: 3, w: 4 },
  { from: 2, to: 1, w: 1 },
  { from: 2, to: 3, w: 10 },
];

function initGraph() {
  const nodesLayer = document.getElementById("nodes-layer");
  const svg = document.getElementById("svg-edges");
  nodesLayer.innerHTML = "";
  svg.innerHTML = "";
  edges.forEach((edge) => {
    const n1 = nodes[edge.from],
      n2 = nodes[edge.to];
    svg.innerHTML += `<line x1="${n1.x + 25}" y1="${n1.y + 25}" x2="${n2.x + 25}" y2="${n2.y + 25}" class="edge-line" id="edge-${edge.from}-${edge.to}" />`;
    svg.innerHTML += `<text x="${(n1.x + n2.x) / 2}" y="${(n1.y + n2.y) / 2}" class="edge-weight">${edge.w}</text>`;
  });

  nodes.forEach((n) => {
    nodesLayer.innerHTML += `<div id="node-${n.id}" class="node" style="left:${n.x}px; top:${n.y}px;">
            ${n.id}<small id="dist-${n.id}">∞</small>
        </div>`;
  });
}

function setStatus(txt) {
  document.getElementById("status-text").innerText = txt;
}

async function startDijkstra() {
  let dist = Array(nodes.length).fill(Infinity);
  let visited = Array(nodes.length).fill(false);
  dist[0] = 0;

  for (let i = 0; i < nodes.length; i++) {
    let u = getMinDistNode(dist, visited);
    if (u === -1) break;

    visited[u] = true;
    const uEl = document.getElementById(`node-${u}`);
    uEl.classList.add("active");
    setStatus(`Visiting Node ${u}`);
    await sleep(1000);

    for (let edge of edges.filter((e) => e.from === u)) {
      const v = edge.to;
      const weight = edge.w;
      document.getElementById(`node-${v}`).classList.add("checking");
      await sleep(500);

      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        document.getElementById(`dist-${v}`).innerText = dist[v];
      }
      document.getElementById(`node-${v}`).classList.remove("checking");
    }
  }
  setStatus("Dijkstra Finished!");
}

async function startBellmanFord() {
  let dist = Array(nodes.length).fill(Infinity);
  dist[0] = 0;
  document.getElementById(`dist-0`).innerText = "0";

  for (let i = 0; i < nodes.length - 1; i++) {
    setStatus(`Iteration ${i + 1}`);
    for (let edge of edges) {
      const { from, to, w } = edge;
      document.getElementById(`node-${from}`).classList.add("checking");
      document.getElementById(`node-${to}`).classList.add("checking");
      await sleep(400);

      if (dist[from] !== Infinity && dist[from] + w < dist[to]) {
        dist[to] = dist[from] + w;
        document.getElementById(`dist-${to}`).innerText = dist[to];
      }

      document.getElementById(`node-${from}`).classList.remove("checking");
      document.getElementById(`node-${to}`).classList.remove("checking");
    }
  }
  setStatus("Bellman-Ford Finished!");
}

function getMinDistNode(dist, visited) {
  let min = Infinity,
    index = -1;
  for (let i = 0; i < dist.length; i++) {
    if (!visited[i] && dist[i] <= min) {
      min = dist[i];
      index = i;
    }
  }
  return index;
}

function resetGraph() {
  initGraph();
  setStatus("Graph Reset");
}
switchMode("stack");
