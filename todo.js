let form = document.getElementById('form');
let title = document.getElementById('title');
let descript = document.getElementById('des');

let remainlist = document.getElementById('rlist');
let donelist = document.getElementById('dlist');

window.addEventListener('DOMContentLoaded',getData)
form.addEventListener('submit',addIt);

function getData(){
    axios.get('https://crudcrud.com/api/71c8535e94b748f9af8eb0ed59bfd314/tododata')
        .then((response) =>{
            response.data.forEach((element) => {
                displayToDo(element.title,element.descript,element._id,element.completed);
            });
    }).catch((error)=>{console.log("This is a error in getData" + error)});
}

function addIt(e){
    e.preventDefault();
    
    //Add dispaly data code

    let userData = {
        title : title.value ,
        descript : descript.value,
        completed : false
    }
    axios.post('https://crudcrud.com/api/71c8535e94b748f9af8eb0ed59bfd314/tododata',userData)
        .then((response)=>{
            displayToDo(response.data.title, response.data.descript, response.data._id, response.data.completed);
        }).catch((error)=>{console.log("This is a error in addIt" + error)});

    e.target.reset();
}

function displayToDo(title,descript,id,completed){
    let newLi = document.createElement('li');
    newLi.innerHTML = `To-do Detail:-${title}-Detail:-${descript}`;

    if(completed == false){
        let addBtn = document.createElement('button');
        addBtn.appendChild(document.createTextNode('Done'));
        addBtn.onclick = function(e){
            editCompleted(title,descript,id,e);
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.onclick = function(e){
            deleteItem(id,e);
        }

        newLi.appendChild(addBtn);
        newLi.appendChild(deleteBtn);
        remainlist.appendChild(newLi);
    }else{
        let deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.onclick = function(e){
            deleteItem(id,e);
        }
        newLi.appendChild(deleteBtn);
        donelist.appendChild(newLi);
    }
}

function editCompleted(title,descript,id,e){
    axios.put(`https://crudcrud.com/api/71c8535e94b748f9af8eb0ed59bfd314/tododata/${id}`,{
        title : title,
        descript : descript,
        completed : true
    }).then((response)=>{ 
        displayToDo(title,descript,id,true);
        let li = e.target.parentElement;
        remainlist.removeChild(li);
        
    }).catch((error)=>{
        console.log("Error in editcompleted "+error)
    });
}

function deleteItem(id,e){
    axios.delete(`https://crudcrud.com/api/71c8535e94b748f9af8eb0ed59bfd314/tododata/${id}`,{

    }).then((response)=>{
        let li = e.target.parentElement;
        let parentList = li.parentElement;
        
        if(parentList === remainlist){
            remainlist.removeChild(li);
        }else if(parentList === donelist){
            donelist.removeChild(li);
        }

    }).catch((error)=>{
        console.log("Error in deleteBtn " + error)
    });
}
