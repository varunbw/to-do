// Function to fetch tasks from local JSON file
async function FetchTasks() {
    console.log('here');
    
	try {
		const response = await fetch("tasks.json"); // Load local JSON file
		if (!response.ok) {
			throw new Error("Failed to load tasks.json");
		}
		const data = await response.json(); // Parse JSON file
		RenderTasks(data); // Pass tasks array to rendering function
	} catch (error) {
		console.error("Error:", error);
	}
}

// Function to render tasks dynamically
function RenderTasks(tasks) {

    // Get `content` div
	const contentDiv = document.querySelector(".content");
	contentDiv.innerHTML = "<h2>Your Tasks</h2>";

    // Render a task card for each task in `tasks` array
	tasks.forEach((task) => {
        // task-card div
		const taskCard = document.createElement("div");
		taskCard.classList.add("task-card", "mb-3", "d-flex", "align-items-center");

		// task-checkbox div
		const checkboxDiv = document.createElement("div");
		checkboxDiv.classList.add("task-checkbox");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = task.completed;
		checkbox.id = "taskComplete";
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
