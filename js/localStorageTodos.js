window.addEventListener('load', function() {
	
//	taskCounter.innerHTML = activeTasks.length;
	
/* first load and no task exist */
	if (!localStorage.todos) {
			localStorage.setItem('todos', '{}');
			footer.style.display = 'none';
			showHideBtn.style.display = 'none';
	}	
		
	var todos = JSON.parse(localStorage.todos),
    	todosPropNames = Object.getOwnPropertyNames(todos),
	 		todosLength = todosPropNames.length;

	
/* loadin todos from localStorage and showing them */
	if(todosLength > 0){
		var taskReq = new XMLHttpRequest();
			taskReq.addEventListener("load", function(){
			taskTemplate = taskReq.responseText;
			showStorageTodos();	
		});
			taskReq.open("GET", "templates/task.html");
			taskReq.send();		
			mainSection.classList.toggle('show');
	} else {
			footer.style.display = 'none';
			showHideBtn.style.display = 'none';
	}
		
	/* upload todos from locale storage and put them into document */	
	function showStorageTodos() {	
		todosPropNames.forEach(function(item){
			var storageTaskCompleted = todos[item].completed,
					storageTaskContent = todos[item].content,
					taskNode = document.createElement('div');
			
			taskId = item;
			taskNode.classList.add('task', 'show');
			taskNode.setAttribute('data-id', taskId);
			
			taskNode.innerHTML = taskTemplate;
			mainSection.insertBefore(taskNode, mainSection.childNodes[0]);

			var taskContent = mainSection.querySelector("[data-id='task-content']");
			taskContent.innerHTML = storageTaskContent;

			var inputId = mainSection.querySelector("[type='checkbox']");
			inputId.setAttribute('id', item);

			var checkboxLabel = mainSection.querySelector('.checkbox');
			checkboxLabel.setAttribute('for', item);
			
			if(storageTaskCompleted){
				inputId.checked = true;
				taskNode.classList.add('completed');
			} else {
				taskNode.classList.add('active');
			}
			
			var activeTasks = todoApp.getElementsByClassName('active');
			
			if (activeTasks.length === 1) {
				taskCounter.innerHTML = 1;
				itemsLeftNode.innerHTML = 'item left';
			} else {
				taskCounter.innerHTML = activeTasks.length;
			}
		})	
	}
	
/* show and hide tasks button init */
	showHideBtn.addEventListener('click', function() {
		mainSection.classList.toggle('show');
		showHideBtn.classList.toggle('up');
	});
	
});