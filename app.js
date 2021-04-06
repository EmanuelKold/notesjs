document.getElementById('form-notes').addEventListener('submit', saveNote);

function saveNote(event) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    const note = {
        title,
        description
    };

    //Si en el local storage no hay items los crea
    if (localStorage.getItem('notes') == null) {
        //Crea un arreglo
        let notes = [];
        //mete el objeto en el arreglo
        notes.push(note);
        //Guarda en el local storage el arreglo convertido en un string 
        localStorage.setItem('notes', JSON.stringify(notes));
        //Si no los actualiza
    } else {
        //crea unarreglo de objetos y lo iguala a los strings del local storage convertidos en objetos
        let notes = JSON.parse(localStorage.getItem('notes'));
        //agrega el nuevo objeto al arreglo de objetos
        notes.push(note);
        //Guarda el arreglo con todos los objetos en el local storage en forma de strings
        localStorage.setItem('notes', JSON.stringify(notes))
    }
    event.preventDefault();
    getNotes();
}

function getNotes() {
    //Borra el contenido del formulario
    document.getElementById('form-notes').reset();
    //Crea un objeto y lo iguala al objeto de notas contenido en el local storage
    let notes = JSON.parse(localStorage.getItem('notes'));
    //Crea una variable para modificar el div con el id notes
    let notesView = document.getElementById('notes');
    //Borra lo que tiene el div
    notesView.innerHTML = '';
    //for que recorre el array y obtiene el index
    //Rellena nuestro div con el objeto notes
    for (let index in notes) {
        //Iguala el atributo title del objeto notes a una variable de nombre title
        let title = notes[index].title;
        //Iguala el atributo description del objeto notes a una variable de nombre description
        let description = notes[index].description;
        //Crea las cards en el div con id notes
        notesView.innerHTML += `<div class="card mb-3">
            <div class="card-body"><p>${title} - ${description}</p>
            <a class="btn btn-danger" onclick="deleteNotes('${index}')">Delete</a>
            </div>
        </di>`
    }
}

function deleteNotes(id) {
    /*Obtiene el arreglo de strings notes desde el local storage, lo convierte en un 
    objeto y lo guarda en la varible notes*/
    let notes = JSON.parse(localStorage.getItem('notes'));
    //console.log(id);
    //Borra una pocisión del arreglo con el metodo splice
    notes.splice(id, 1);
    //Guarda el nuevo array en el local storage
    localStorage.setItem('notes', JSON.stringify(notes));
    //Llama a la funcion get notes para que se actualice la vista
    getNotes();
}
getNotes();