const database = firebase.database();
const headerEl = document.querySelector("#form_header");
const descriptionEl = document.querySelector("#form_description");
const form = document.querySelector("form");
const template = document.querySelector("#noteTemp").content;
const app = document.querySelector("#app");


//add new notes
form.addEventListener("submit", e=>{
    e.preventDefault();
    database.ref("notes/").push({
        header: headerEl.value,
        description: descriptionEl.value
    })
    //clear our form
    headerEl.value="";
    descriptionEl.value="";
});

//LISTEN FOR NEW DATA
database.ref("notes/").on("child_added", (snapshot)=>{
//console.log(snapshot);
const key = snapshot.key;
const data = snapshot.val();
//console.log(key, data);
const clone = template.cloneNode(true);
clone.querySelector("article").dataset.key = key;

clone.querySelector("h1").textContent = data.header;
clone.querySelector("div.description").textContent = data.description;
clone.querySelector("button.delete").addEventListener("click", e=>{
    database.ref("notes/"+key).remove();
});

app.appendChild(clone);
});

//LISTEN FOR REMOVAL OF DATA child_removed
database.ref("notes/").on("child_removed", (snapshot)=>{
    //console.log("k og d", snapshot.key, snapshot.val());
    const key = snapshot.key;
    let el = document.querySelector(`article[data-key=${key}]`)
    el.remove();
});
