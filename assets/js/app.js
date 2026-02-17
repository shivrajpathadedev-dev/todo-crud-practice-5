const cl=console.log;


const todocontainer=document.getElementById('todocontainer');
const subbtn=document.getElementById('subbtn');
const updbtn=document.getElementById('updbtn');
const todoItem=document.getElementById('todoItem');
const todoform=document.getElementById('todoform');


let arr=[
    {
        todoItem:"software",
        todoId:"1234567"
    },
    {
        todoItem:"hardware",
        todoId:"12345676789"
    }
]

function snackbar (msg,icon) {
    Swal.fire({
        title:msg,
        timer:3000,
        icon:'icon'
    })
} 

function createList(arr){
    let result=`<ul class="list-group">`

    arr.forEach(c=>{
        result+=`<li id="${c.todoId}"class="list-group-item d-flex justify-content-between align-items-center"> 
                                    <strong>${c.todoItem}</strong>
                                    <div>
                                        <i onClick="onEditbtn(this)" class="fa-solid fa-pen-to-square text-primary fa-2x"></i>
                                        <i onClick="onRemove(this)" class="fa-solid fa-trash text-danger fa-2x"></i>
                                    </div>
                                </li>`
    });
    result+=`</ul>`
    todocontainer.innerHTML=result;

}

//add
function onaddtodo(eve){
    eve.preventDefault();

    let obj={
        todoItem:todoItem.value,
        todoId:Date.now().toString()
    }
      
    todoform.reset();
    arr.push(obj)
    let li=document.createElement('li');
    li.id=obj.todoId;
    li.className=`list-group-item d-flex justify-content-between align-items-center`
    li.innerHTML=` <strong>${obj.todoItem}</strong>
                                    <div>
                                        <i onClick="onEditbtn(this)" class="fa-solid fa-pen-to-square text-primary fa-2x"></i>
                                        <i onClick="onRemove(this)" class="fa-solid fa-trash text-danger fa-2x"></i>
                                    </div>`

    let ul=document.querySelector('#todocontainer ul')
    ul.prepend(li);

    snackbar(`The new Todo Item ${obj.todoItem} is added successfully !!!`,'success')


}

//remove

function onRemove(eve){
    let REMOVE_ID=eve.closest('li');

    let getIndex=arr.find(c=>c.todoId===REMOVE_ID);
    arr.splice(getIndex,1);
    eve.closest('li').remove();
}

//edit
let EDIT_ID;
function onEditbtn(eve){
    EDIT_ID=eve.closest('li').id;
    let EDIT_OBJ=arr.find(c=>c.todoId===EDIT_ID);
    todoItem.value=EDIT_OBJ.todoItem;
    subbtn.classList.add('d-none');
    updbtn.classList.remove('d-none');
}

//update
function onupdatebtn(eve){
    let UPDATE_OBJ={
        todoItem:todoItem.value,
        todoId:EDIT_ID
    }

    todoform.reset()

   cl(UPDATE_OBJ);
   
    let getIndex=arr.findIndex(c=>c.todoId===EDIT_ID);
    arr[getIndex]=UPDATE_OBJ  
    updbtn.classList.add('d-none');
    subbtn.classList.remove('d-none');
    
    let li=document.getElementById(EDIT_ID).firstElementChild
    li.innerText=UPDATE_OBJ.todoItem;

    snackbar(`the todoItem ${UPDATE_OBJ.todoItem} is updated successfully !!!`,'success')
}

createList(arr);
todoform.addEventListener('submit',onaddtodo);
updbtn.addEventListener('click',onupdatebtn);

