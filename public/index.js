let api = axios.create({
   baseURL: `https://final-back-modulo3.herokuapp.com`,
});

loginValidation = () => {
   let username = document.querySelectorAll('input')[0].value;
   let password = document.querySelectorAll('input')[1].value;
   if (!username || !password) {
      alert('Preencha login e senha ou crie sua conta.');
   } else {
      api.post('/login', {
         username: username,
         password: password,
      }).then((result) => {
         alert(result.data.message);
         localStorage.setItem('loggedID', result.data.user.id);
         window.location.assign('recados.html');
      });
   }

   // let username = document.querySelectorAll('input')[0].value;
   // let password = document.querySelectorAll('input')[1].value;
   // let users = JSON.parse(localStorage.getItem('users'));
   // for (let user of users) {
   //    if (user.username == username && user.password == password) {
   //       localStorage.setItem('loggedIn', username);
   //       document.querySelectorAll('input')[0].value = '';
   //       window.location.assign('recados.html');
   //       return;
   //    }
   // }
   // if (!username || !password) {
   //    alert('Preencha login e senha ou crie sua conta.');
   //    return;
   // }
   // alert('Username e/ou senha não encontrados.');
};
