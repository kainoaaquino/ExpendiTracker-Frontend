let content = document.getElementById("content");
let loadButton = document.getElementById("loadButton");

let entryInput = document.getElementById("entryInput");
let dateInput = document.getElementById("dateInput");
let categoryInput = document.getElementById("categoryInput");
let userIdInput = document.getElementById("userIdInput");
let submitButton = document.getElementById("submitButton");



let dateLoadButton = document.getElementById("dateLoadButton");
let getDateInput = document.getElementById("getDateInput");


let necessaryButton = document.getElementById("necessaryButton");
let necessaryUsernameInput = document.getElementById("necessaryUsernameInput");

let notnecessaryButton = document.getElementById("notnecessaryButton");
let notnecessaryUsernameInput = document.getElementById("notnecessaryUsernameInput");

let allUsersButton = document.getElementById("allUsersButton");

let displayUsers = document.getElementById("displayUsers");

let usernameButton = document.getElementById("usernameButton");
let getUsernameInput = document.getElementById("getUsernameInput");

let addUserButton = document.getElementById("addUserButton");
let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");



loadButton.addEventListener("click", apiGetEntries);
submitButton.addEventListener("click", apiPostEntry);
//dateLoadButton.addEventListener("click", apiGetEntriesByDate);
necessaryButton.addEventListener("click", apiGetNecessaryEntries);
notnecessaryButton.addEventListener("click", apiGetNotNecessaryEntries);
allUsersButton.addEventListener("click", apiGetUsers);
usernameButton.addEventListener("click", apiGetEntriesByUsername);
addUserButton.addEventListener("click", apiAddUser);


async function apiGetEntries() {
    console.log("Button clicked");
    let response = await fetch("http://20.169.51.125:9000/entries");
    response = await response.json();
    loadEntries(response);
}
async function apiGetEntriesByDate(){
    console.log("Button clicked");
    let dateEntry = getDateInput.value;
    
   // console.log(dateEntry);
    let response = await fetch("http://20.169.51.125:9000/entries/date/" + dateEntry, {
        method:'GET',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
       
     });
    response = await response.json();
    //console.log(response);
    loadEntries(response);
   

    

}
async function apiGetNecessaryEntries(){
    console.log("Button clicked");
    let nui = necessaryUsernameInput.value;
    
    let response = await fetch("http://20.169.51.125:9000/users/necessary/" + nui, {
        method:'GET',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
       
     });
    response = await response.json();
    //console.log(response);
    loadEntries(response);
}
async function apiGetNotNecessaryEntries(){
    console.log("Button clicked");
    let nnui = notnecessaryUsernameInput.value;
    
    let response = await fetch("http://20.169.51.125:9000/users/notnecessary/" + nnui, {
        method:'GET',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
       
     });
     response = await response.json();
     //console.log(response);
     loadEntries(response);
}


async function loadEntries(response)
{
    content.innerHTML = "";
    console.log(response)
    let entryList = document.createElement("p");
    
    for(let i = 0; i < response.length; i++){
        
        //ul is unordered list - bullet points 
        //li is a list element 
        let entryAmount = document.createElement("p");
        let entryTitle = document.createElement("p");
        //let categoryName = document.createElement("p");
        entryTitle.innerText = "Amount: $" + response[i].amount;
        entryAmount.innerText = "Date: " + response[i].entryDate;
        //categoryName.innerText = "Category: " + response[i].category;
        
        entryList.appendChild(entryAmount);
        entryList.appendChild(entryTitle);
        //entryList.appendChild(categoryName);

    }
    content.appendChild(entryList);
}

async function apiPostEntry(){
    let inputEntry = {
        amount:entryInput.value,
        entryDate:dateInput.value,
        category:categoryInput.value,
        entryuserid:userIdInput.value
    }
    let response = await fetch("http://20.169.51.125:9000/entries", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(inputEntry)
    });



}

async function apiGetUsers(){
    console.log("Yeah it worked");
   
    let response = await fetch("http://20.169.51.125:9000/users");
    response = await response.json();
    console.log(response);
    loadUsers(response);
    }

async function loadUsers(response){

    displayUsers.innerHTML = "";
    console.log(response)
    let userList = document.createElement("p");
    
    for(let i = 0; i < response.length; i++){
        
        //ul is unordered list - bullet points 
        //li is a list element 
        let user_id = document.createElement("p");
        let username = document.createElement("p");
        
        //let categoryName = document.createElement("p");

        user_id.innerText = "user id: " + response[i].user_id;

        username.innerText = "username: " + response[i].username;
       
        //categoryName.innerText = "Category: " + response[i].category;
        
         userList.appendChild(user_id);
        userList.appendChild(username);
       
        //entryList.appendChild(categoryName);

    }
    displayUsers.appendChild(userList);




}
async function apiGetEntriesByUsername(){

    console.log("Button clicked");
    let usernameInput = getUsernameInput.value;
    
    let response = await fetch("http://20.169.51.125:9000/users/username/" + usernameInput, {
        method:'GET',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
       
     });
    response = await response.json();
    //console.log(response);
    loadEntries(response);


}

async function apiAddUser(){
    let inputUser = {
        username:usernameInput.value,
        password:passwordInput.value,
      
    }
    let response = await fetch("http://20.169.51.125:9000/users", {
        method:'POST',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(inputUser)
    });


}


