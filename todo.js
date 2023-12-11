let form = document.getElementById('form');
let title = document.getElementById('title');
let descript = document.getElementById('des');

let remainlist = document.getElementById('rlist');
let donelist = document.getElementById('dlist');

window.addEventListener('DOMContentLoaded',getData)
form.addEventListener('submit',addIt);

function getData(){
    axios.get('https://crudcrud.com/api/e78e460f2e10414b85f8c54568d81d59/tododata')
        .then((response) =>{
            response.data.forEach((element) => {
                let id = element._id;
                displayToDo(element,id);
            });
    })
}

function addIt(e){
    e.preventDefault();
    
    //Add dispaly data code

    let userData = {
        title : title.value ,
        descript : descript.value,
        completed : false
    }
    axios.post('https://crudcrud.com/api/e78e460f2e10414b85f8c54568d81d59/tododata',userData)
        .then((response)=>{
            remainlist.innerHTML="";
            donelist.innerHTML="";
            getData();
        }).catch((error)=>{console.log("This is a error in addIt")});

    e.target.reset();
}

function displayToDo(response,id){
    let newLi = document.createElement('li');
    newLi.innerHTML = `To-do Detail:-${response.title}-Detail:-${response.descript}`;

    if(response.completed == false){
        let addBtn = document.createElement('button');
        addBtn.appendChild(document.createTextNode('Done'));
        addBtn.onclick = function(){
            editCompleted(id);
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.onclick = function(){
            deleteItem(id);
        }

        newLi.appendChild(addBtn);
        newLi.appendChild(deleteBtn);
        remainlist.appendChild(newLi);
    }else{
        let deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.onclick = function(){
            deleteItem(id);
        }
        newLi.appendChild(deleteBtn);
        donelist.appendChild(newLi);
    }
}

function editCompleted(id){
    axios.put(`https://crudcrud.com/api/e78e460f2e10414b85f8c54568d81d59/tododata/${id}`,{
        completed:true
    }).then((response)=>{
        remainlist.innerHTML="";
        donelist.innerHTML="";
        getData();
    }).catch((error)=>{
        console.log("Error in editcompleted")
    });
}

function deleteItem(id){
    axios.delete(`https://crudcrud.com/api/e78e460f2e10414b85f8c54568d81d59/tododata/${id}`,{
        completed:true
    }).then((response)=>{
        remainlist.innerHTML="";
        donelist.innerHTML="";
        getData();
    }).catch((error)=>{
        console.log("Error in deleteBtn")
    });
}