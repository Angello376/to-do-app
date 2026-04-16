const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

let tasks = [];

/* =========================
   TOAST
   ========================= */
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 200);
  }, 2200);
}

/* =========================
   SUBMIT
   ========================= */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = input.value.trim();
  const priority = document.querySelector('input[name="priority"]:checked').value;

  if (!name) return;

  const exists = tasks.some(
    t => t.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    showToast("Essa tarefa já existe!", "error");
    return;
  }

  tasks.push({
    id: Date.now(),
    name,
    priority,
    done: false
  });

  input.value = "";

  showToast("Tarefa adicionada!", "success");

  render();
});

/* =========================
   RENDER
   ========================= */
function render() {
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.className = `todo-item todo-item--${task.priority}`;
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <span class="text">${task.name}</span>
      <button class="remove-btn">✕</button>
    `;

    li.addEventListener("click", () => {
      task.done = !task.done;
      render();
    });

    li.querySelector(".remove-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      render();
      showToast("Tarefa removida!", "success");
    });

    list.appendChild(li);
  });
}