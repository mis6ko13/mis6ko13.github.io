var	todoApp = document.querySelector('.todo-app'),	
		showHideBtn = todoApp.querySelector("[data-id='show-hide-tasks']"),
		mainSection = todoApp.querySelector("[data-id='main-section']"),
		addBtn = todoApp.querySelector("[data-id='add-button']"),
		newToDo = todoApp.querySelector("[data-id='new-todo']"),
		mainSection = todoApp.querySelector("[data-id='main-section']"),
		footer = todoApp.querySelector('.footer'),
		taskCounter = todoApp.querySelector("[data-id='active-task-counter']"),
		activeTasks = todoApp.getElementsByClassName('active'),
		showAll = todoApp.querySelector("[data-id='show-all']"),
		showActive = todoApp.querySelector("[data-id='show-active']"),
		showCompleted = todoApp.querySelector("[data-id='show-completed']"),
		clearCompleted = todoApp.querySelector("[data-id='clear-completed']"),
		itemsLeftNode = todoApp.querySelector("[data-id='items-left']"),
		taskTemplate = "";

/* function is  adding ready html template with task into document */	
	function addNewTask () {
		var idPrefix = Math.random()*1000,
				counter = Math.random()*1000,
				taskNode = document.createElement('div'),
				counterId = Math.round((idPrefix + counter)),
				taskId = 'task'+ counterId;
		
		taskNode.classList.add('task', 'active', 'show');
		taskNode.setAttribute('data-id', taskId);
		taskNode.innerHTML = taskTemplate;
		mainSection.insertBefore(taskNode, mainSection.childNodes[0]);
		
		var taskContent = mainSection.querySelector("[data-id='task-content']");
		taskContent.innerHTML = newToDo.value;
		newToDo.value = ''; 
		
		var inputId = mainSection.querySelector("[type='checkbox']");
		inputId.setAttribute('id', taskId);
		
		
		var checkboxLabel = mainSection.querySelector('.checkbox');
		checkboxLabel.setAttribute('for', taskId);
			
		var todos = JSON.parse(localStorage.todos);
			
		todos[taskId] = {
			completed: false,
			content: taskContent.textContent
		};
		
		localStorage.setItem('todos', JSON.stringify(todos));	
		footer.style.display = 'block';
		showHideBtn.style.display = 'block';
		showHideBtn.classList.toggle('up');
		mainSection.classList.add('show');
		showHideBtn.classList.toggle('up');		
	};
	
/* controller for template download */
	function addTaskTemplate() {
		if(newToDo.value) {
			if(taskTemplate === ''){
				var taskReq = new XMLHttpRequest();
				taskReq.addEventListener("load", function(){
				taskTemplate = taskReq.responseText;
				addNewTask();
			});
				taskReq.open("GET", "templates/task.html");
				taskReq.send();

			} else {
				addNewTask();
			}
		}
	};









