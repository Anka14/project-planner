const inputTask = document.querySelector('.inputTask');
const inputDate = document.querySelector('.inputDate');
const btn_add = document.querySelector('.btn-add');
const taskBox= document.querySelector('.task-box');
 const filters = document.querySelectorAll('.filters span');
 const clearAll = document.querySelector('.clear-btn')
 
let editId;
let isEditedTask = false;

//getting localStorage todo list
let todos =JSON.parse(localStorage.getItem('todo-list'));

filters.forEach(btn =>{
  btn.addEventListener('click', ()=> {
    document.querySelector('span.active').classList.remove('active');
    btn.classList.add('active');
    showTodo(btn.id)
  })
})

function showTodo(filter){
  let li = '';
  if (todos){

 todos.forEach((todo, id) => {
  //if todo status is completed, set the isCompleted value to checked
  let isCompleted = todo.status === 'completed'? 'checked' : '';
  if (filter === todo.status || filter == 'all') {
    li += `<li class ='task'>
            <label for="${id}">
            <input onclick = 'updateStatus(this)'type="checkbox" id ='${id}'${isCompleted}>
             <p class ='${isCompleted}'>${todo.name}<span> ${todo.date}</span></p>
      </label>
        <div class ='settings'>
         <i onclick ='showMenu(this)'class='uil uil-ellipsis-h'></i>
      <ul class ='task-menu'>
         <li onclick ='editTask (${id}, "${todo.name}")'><i class ='uil uil-pen'></i>edit</li>
          <li onclick ='deleteTask(${id})'><i class ='uil uil-trash'></i>delete</li>
      </ul>
        </div>
      </li>`
  }

  });
  taskBox.innerHTML = li || `<span>You do not have any task here</span>`;

  }
 
}
showTodo('all');

function showMenu(selectedTask){
  //getting task-menu div
let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add('show');
  document.addEventListener('click', e => {
    //removing 'show class' from the task menu by clickin on the document
    if (e.target.tagName !== 'I' || e.target !== selectedTask) {
      taskMenu.classList.remove('show');
    }
  })

}

function editTask(taskId, taskName, taskDate){
  editId = taskId;
  isEditedTask =true;
inputTask.value = taskName;

}


function deleteTask(deleteId){
  //removing selected task from array/todos
  todos.splice(deleteId,1);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo('all')

}

clearAll.addEventListener('click', ()=>{
  //removing all item of array
  todos.splice(0,todos.length);
  localStorage.setItem('todo-list', JSON.stringify(todos));
  showTodo('all')
})

function updateStatus(selectedTask) {
  //getting the paragraph that contains task name
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked){
    taskName.classList.add('checked');
    todos[selectedTask.id].status = 'completed'
    
  } else {
    taskName.classList.remove('checked');
    todos[selectedTask.id].status = 'pending'
  }
  localStorage.setItem('todo-list', JSON.stringify(todos));
}


btn_add.addEventListener ('click',() => {
let userTask = inputTask.value;
let userDate = inputDate.value;
if (userTask ){
  if (!isEditedTask) {//if the editedtask is not true
    if(!todos){ //if todos does not exist, pass an empty array to todos 
      todos =[]
    }
     let taskInfo = {name:userTask, status:'pending',date:userDate};
    todos.push(taskInfo); //adding new task to todos
  } else {
    isEditedTask = false
      todos[editId].name = userTask;
  }
  
  inputTask.value ='';
  inputDate.value ='';

localStorage.setItem('todo-list', JSON.stringify(todos));
showTodo('all')
}
})

