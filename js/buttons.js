/* add button init*/
addBtn.addEventListener('click', addTaskTemplate);
newToDo.addEventListener('keydown', function(e) {
	if(e.which === 13 || e.keyCode === 13){
		addTaskTemplate();
		if (activeTasks.length === 1) {
			taskCounter.innerHTML = 1;
			itemsLeftNode.innerHTML = 'item left';
		} else {
			taskCounter.innerHTML = activeTasks.length;
			itemsLeftNode.innerHTML = 'items left';
		}	
		return false;		
	}
});

/* tasks field buttons */
	mainSection.addEventListener('click', function(e) {
		taskId = e.target.parentNode.dataset.id;
		var todos = JSON.parse(localStorage.todos),
				storageTaskObj = todos[taskId],
				taskNode = e.target.parentNode;
		
		/* delete button init*/
		if(e.target.dataset.id === 'close-button'){
			mainSection.removeChild(e.target.parentNode);
			delete todos[taskId];
			localStorage.setItem('todos', JSON.stringify(todos));
			taskCounter.innerHTML = activeTasks.length;
			
			var allTasks = todoApp.querySelectorAll('.main .task');
			
			if (activeTasks.length === 1) {
			taskCounter.innerHTML = 1;
			itemsLeftNode.innerHTML = 'item left';
			}
			
			if(allTasks.length === 0){
			showHideBtn.style.display = 'none';
			footer.style.display = 'none';	
			}
	}
		
		/* check button init */
		if(e.target.dataset.id === 'check'){
			taskNode.classList.toggle('completed');
			taskNode.classList.toggle('active');
			taskCounter.innerHTML = activeTasks.length;
			
			if(!storageTaskObj.completed){
				storageTaskObj.completed = true;
			}	else {
				storageTaskObj.completed = false;
			}
			
			localStorage.setItem('todos', JSON.stringify(todos));
			
			if(activeTasks.length === 1) {
			taskCounter.innerHTML = 1;
			itemsLeftNode.innerHTML = 'item left';
			} else {
			itemsLeftNode.innerHTML = 'items left';	
			}
		}
	});

/* edit input init */
function checkEditInput() {
	var editInput = mainSection.querySelector('.edit-input'),
			taskNode = editInput.parentNode,
			taskContentNode = taskNode.querySelector('.content'),
			taskContent = taskContentNode.innerHTML;
	
	/* if no changes */
	if(editInput.value === taskContent){
		taskNode.lastChild.remove();
	}
	
	var newTaskContent = editInput.value,
	 		todos = JSON.parse(localStorage.todos),
			taskId = taskNode.dataset.id,
			currentTaskObj = todos[taskId];
	
	/* if empty value */
	if(editInput.value === '') {
		taskNode.remove();
		delete todos[taskId];
		localStorage.setItem('todos', JSON.stringify(todos));
//		taskCounter.innerHTML = activeTasks.length;
		
		var allTasks = todoApp.querySelectorAll('.main .task');
		
		if (activeTasks.length === 1) {
			taskCounter.innerHTML = 1;
			itemsLeftNode.innerHTML = 'item left';
		}
			
		if(allTasks.length === 0){
			showHideBtn.style.display = 'none';
			footer.style.display = 'none';	
		}
	}
	
/* if changed */
	else {
		var newTaskContent = editInput.value,
		 		todos = JSON.parse(localStorage.todos),
				taskId = taskNode.dataset.id,
				currentTaskObj = todos[taskId];
		taskContentNode.innerHTML = newTaskContent;
		taskNode.lastChild.remove();
		currentTaskObj.content = newTaskContent;
		localStorage.setItem('todos', JSON.stringify(todos));
	}
	
	taskCounter.innerHTML = activeTasks.length;
};
	
/* if Enter pressed */
function writeChanges(e) {
	if(e.which === 13 || e.keyCode === 13){
		checkEditInput();
		return false;
	}
};
	
/* double click edit input init */
mainSection.addEventListener('dblclick', function(e) {

	if(e.target.dataset.id === 'task-content'){
		var	taskNode = e.target.parentNode,
				taskContent = e.target.innerHTML,
				editInput = document.createElement('input');
		
		editInput.type = 'text';
		editInput.value = taskContent;		
		editInput.classList.add('edit-input');
		editInput.setAttribute('onchange', 'checkEditInput()');
		editInput.setAttribute('keydown', 'writeChanges()');
		editInput.setAttribute('onblur', 'checkEditInput()');
		taskNode.appendChild(editInput);
		editInput.focus();
	}
});

/*  task counter init  */
todoApp.addEventListener('click', function() {
//	taskCounter.innerHTML = activeTasks.length;
});

/* visibility show/hide helper */
function displayForEach(taskNodes, action, visibility){
	
	if(action === 'add'){
Array.prototype.forEach.call(taskNodes, function(task) {
		task.classList.add(visibility);
	})

	} else if (action === 'remove'){
Array.prototype.forEach.call(taskNodes, function(task) {
		task.classList.remove(visibility);
	})		
	}
}

/* show all button init */												 
showAll.addEventListener('click', function() {
	var allTasks = todoApp.querySelectorAll('.main .task');
	displayForEach(allTasks, 'add', 'show');
	displayForEach(allTasks, 'remove', 'hide');
});

/* show active tasks button init */
showActive.addEventListener('click', function() {
	var completedTasks = todoApp.querySelectorAll('.completed');
	displayForEach(completedTasks, 'add', 'hide');
	displayForEach(completedTasks, 'remove', 'show');
	displayForEach(activeTasks, 'add', 'show');
	displayForEach(activeTasks, 'remove', 'hide');
});

/* show completed tasks button init */
showCompleted.addEventListener('click', function() {
	var completedTasks = todoApp.querySelectorAll('.completed');
	displayForEach(activeTasks, 'add', 'hide');
	displayForEach(activeTasks, 'remove', 'show');
	displayForEach(completedTasks, 'add', 'show');
	displayForEach(completedTasks, 'remove', 'hide');
});

/* clear completed tasks button init */
clearCompleted.addEventListener('click', function() {
	var completedTasks = todoApp.querySelectorAll('.completed');
	
	if (completedTasks.length > 0){
	var todos = JSON.parse(localStorage.todos);
	
	Array.prototype.forEach.call(completedTasks, function(task){
		mainSection.removeChild(task);
		delete todos[task.dataset.id];
		localStorage.setItem('todos', JSON.stringify(todos));
	})
	}
	
	var allTasks = todoApp.querySelectorAll('.main .task');
			
	if(allTasks.length === 0){
		showHideBtn.style.display = 'none';
		footer.style.display = 'none';	
	}
})