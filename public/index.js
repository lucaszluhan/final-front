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
};
