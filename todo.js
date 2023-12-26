let form = document.getElementById('form');
let title = document.getElementById('title');
let descript = document.getElementById('des');

let remainlist = document.getElementById('rlist');
let donelist = document.getElementById('dlist');

window.addEventListener('DOMContentLoaded',getData)
form.addEventListener('submit',addIt);

async function getData(){
    try{
        const response = await axios.get('https://crudcrud.com/api/5fed7c0f20ec47739dde1e60cecd7595/tododata');
        response.data.forEach((element) => {
        displayToDo(element.title,element.descript,element._id,element.completed);
        });
    }catch(error){
        console.log(error);
    }
    
}

async function addIt(e){
    e.preventDefault();
    
    let userData = {
        title : title.value ,
        descript : descript.value,
        completed : false
    }
    try{
        const response = await axios.post('https://crudcrud.com/api/5fed7c0f20ec47739dde1e60cecd7595/tododata',userData); 
        displayToDo(response.data.title, response.data.descript, response.data._id, response.data.completed);
    }catch(error){
        console.log(error);
    }

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

async function editCompleted(title,descript,id,e){
    try{
        const response = await axios.put(`https://crudcrud.com/api/5fed7c0f20ec47739dde1e60cecd7595/tododata/${id}`,{
            title : title,
            descript : descript,
            completed : true
        }); 
        displayToDo(title,descript,id,true);
        let li = e.target.parentElement;
        remainlist.removeChild(li);
    }catch(error){
        console.log(error);
    }        
}

async function deleteItem(id,e){
    try{
        const response = await axios.delete(`https://crudcrud.com/api/5fed7c0f20ec47739dde1e60cecd7595/tododata/${id}`);
            let li = e.target.parentElement;
            let parentList = li.parentElement;
                
            if(parentList === remainlist){
                remainlist.removeChild(li);
            }else if(parentList === donelist){
                donelist.removeChild(li);
            }
    }catch(error){
        console.log(error);
    }
    
}
