let api = axios.create({
   baseURL: `http://localhost:9999`,
});

getLoggedUserID = () => {
   if (!localStorage.getItem('loggedID')) {
      alert('Faça login ou crie uma conta!');
      window.location.assign('index.html');
   } else return localStorage.getItem('loggedID');
};

let logUserID = getLoggedUserID();

let objUser;

loggedUserBaseCreation = async (logUser) => {
   let user = await api.get(`/login/${logUser}`);
   objUser = user.data.user;
   createNotesList();
};

loggedUserBaseCreation(logUserID);

createNewNote = () => {
   if (!!document.querySelectorAll('input')[0].value && !!document.querySelectorAll('input')[1].value) {
      api.post(`/newNote/${logUserID}`, {
         description: document.querySelectorAll('input')[0].value,
         detail: document.querySelectorAll('input')[1].value,
      })
         .then((result) => {
            document.querySelectorAll('input')[0].value = '';
            document.querySelectorAll('input')[1].value = '';

            document.querySelector('#modalNewNoteTitle').innerHTML = `Novo recado salvo!`;
            document.querySelector('#modalNewNoteBody').innerHTML = `Seu novo recado foi salvo com sucesso.`;

            let listBody = document.querySelector('#listBody');
            listBody.innerHTML = '';

            loggedUserBaseCreation(logUserID);
         })
         .catch((err) => {
            console.log(err);
         });
   } else {
      document.querySelector('#modalNewNoteTitle').innerHTML = `Deu ruim!`;
      document.querySelector('#modalNewNoteBody').innerHTML = `Precisa adicionar descrição E detalhamento!`;
   }
};

setNewNoteButton = () => {
   let newNoteButton = document.querySelector('#newNoteButton');
   newNoteButton.setAttribute('onclick', 'createNewNote();');
};
setNewNoteButton();

createNotesList = () => {
   for (let note of objUser.notes) {
      let listBody = document.querySelector('#listBody');
      let row = document.createElement('tr');
      let th = document.createElement('th');
      th.setAttribute('scope', 'row');
      th.innerHTML = objUser.notes.findIndex((x) => x.noteNumb == note.noteNumb) + 1;
      let td1 = document.createElement('td');
      td1.innerHTML = note.description;
      let td2 = document.createElement('td');
      td2.innerHTML = note.detail;
      let td3 = document.createElement('td');
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = `APAGAR`;
      deleteButton.setAttribute('class', 'btn btn-danger mx-2');
      deleteButton.setAttribute('data-bs-toggle', 'modal');
      deleteButton.setAttribute('data-bs-target', '#modalDeleteNote');
      deleteButton.setAttribute('onclick', `changeModalDeleteButton(${note.noteNumb});`);
      let editButton = document.createElement('button');
      editButton.innerHTML = `EDITAR`;
      editButton.setAttribute('class', 'btn btn-success');
      editButton.setAttribute('onclick', `changeModalEditButton(${note.noteNumb})`);
      editButton.setAttribute('data-bs-toggle', 'modal');
      editButton.setAttribute('data-bs-target', '#modalEditNote');

      td3.appendChild(deleteButton);
      td3.appendChild(editButton);
      row.appendChild(th);
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      listBody.appendChild(row);
   }
};

changeModalDeleteButton = (number) => {
   let deleteButtonModal = document.querySelector('#deleteButtonModal');
   deleteButtonModal.setAttribute('onclick', `deleteNote(${number});`);
};

deleteNote = (number) => {
   api.delete(`/deleteNote/${logUserID}/${number}`)
      .then((result) => {
         let listBody = document.querySelector('#listBody');
         listBody.innerHTML = '';
         loggedUserBaseCreation(logUserID);
      })
      .catch((err) => {
         console.log(err);
      });
};

editNote = (numb) => {
   if (!!document.querySelectorAll('input')[2].value && document.querySelectorAll('input')[3].value) {
      api.put(`/editNote/${logUserID}/${numb}`, {
         detail: document.querySelectorAll('input')[3].value,
         description: document.querySelectorAll('input')[2].value,
      })
         .then((result) => {
            document.querySelectorAll('input')[2].value = '';
            document.querySelectorAll('input')[3].value = '';
            let listBody = document.querySelector('#listBody');
            listBody.innerHTML = '';
            loggedUserBaseCreation(logUserID);
         })
         .catch((err) => {
            console.log(err);
         });
   } else {
      alert('Preencha todos os campos!');
      document.querySelectorAll('input')[2].value = '';
      document.querySelectorAll('input')[3].value = '';
   }
};

changeModalEditButton = (numb) => {
   let editButtonModal = document.querySelector('#editButtonModal');
   editButtonModal.setAttribute('onclick', `editNote(${numb});`);
};

window.onbeforeunload = () => localStorage.removeItem('loggedID');
