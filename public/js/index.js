// Fetch tasks from local JSON file
async function FetchTasks() {
	try {
		// Load local JSON file
		const response = await fetch("http://localhost:5050/tasks/1", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to load tasks.json");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error:", error);
	}
}

// Render tasks dynamically
async function RenderTasks() {
	const tasks = await FetchTasks();

	// Get `content` div
	const contentDiv = document.querySelector(".content");
	contentDiv.innerHTML = "<h2>Your Tasks</h2>";

	// Render a task card for each task in `tasks` array
	tasks.forEach((task) => {
		// task-card div
		const taskCard = document.createElement("div");
		taskCard.classList.add("task-card");
		if (task.completed) taskCard.classList.add("task-completed");
		taskCard.id = task.uuid;

		// task-checkbox div
		const checkboxDiv = document.createElement("div");
		checkboxDiv.classList.add("task-checkbox");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.completed;
		checkbox.id = task.uuid;
		checkboxDiv.appendChild(checkbox);

		// task-content div
		const taskContentDiv = document.createElement("div");
		taskContentDiv.classList.add("task-content");

		// task-title div
		const titleDiv = document.createElement("div");
		titleDiv.classList.add("task-title");
		titleDiv.textContent = task.title;

		// task-dates div
		const datesDiv = document.createElement("div");
		datesDiv.classList.add("task-dates");
		datesDiv.innerHTML = `
          <div>Due: ${FormatDate(task.due_date)}</div>
          <div>Complete by: ${FormatDate(task.complete_by_target)}</div>`;

		// Append task-title and task-dates to task-content
		taskContentDiv.appendChild(titleDiv);
		taskContentDiv.appendChild(datesDiv);

		// task-priority div
		const priorityDiv = document.createElement("div");
		priorityDiv.classList.add("task-priority");
		priorityDiv.classList.add(GetPriorityClass(task.priority));
		priorityDiv.title = `${CapitalizeString(task.priority)} Priority`;

		// Append all divs to the task-card div
		taskCard.appendChild(checkboxDiv);
		taskCard.appendChild(taskContentDiv);
		taskCard.appendChild(priorityDiv);

		// Append task-card to content div
		contentDiv.appendChild(taskCard);
	});
}

// Helper function: Map priority to a CSS class
function GetPriorityClass(priority) {
	switch (priority) {
		case "high":
			return "tp-high";
		case "medium":
			return "tp-medium";
		case "low":
			return "tp-low";
		default:
			return "";
	}
}

// Helper function: Capitalize a string
function CapitalizeString(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function: Format date to DD/MM/YYYY
function FormatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-GB"); // Returns in "DD/MM/YYYY" format
}

document.querySelector(".content").addEventListener("change", async (event) => {
	if (event.target.type === "checkbox" && event.target.id) {
		const taskUUID = event.target.id;
		const isCompleted = event.target.checked;

		console.log(
			`Task with ID ${taskUUID} is now ${isCompleted ? "completed" : "pending"}`
		);

		const taskCard = document.getElementById(taskUUID)?.closest(".task-card");

		if (taskCard) {
			if (isCompleted) {
				taskCard.classList.add("task-completed");
			} else {
				taskCard.classList.remove("task-completed");
			}

			const response = await fetch(`http://localhost:5050/tasks/${taskUUID}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ completed: isCompleted }),
			});

			if (!response.ok) {
				throw new Error("Failed to update task status1");
			}
		}
	}
});
