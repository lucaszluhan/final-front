let api = axios.create({
   baseURL: `https://final-back-modulo3.herokuapp.com`,
});

createAccount = () => {
   let username = document.querySelectorAll('input')[0].value;
   let password = document.querySelectorAll('input')[1].value;
   let passwordConfirm = document.querySelectorAll('input')[2].value;
   if (password == passwordConfirm) {
      api.post('/createAcc', {
         username: username,
         password: password,
      })
         .then((result) => {
            alert(result.data.message);
            window.location.assign('index.html');
         })
         .catch((err) => {
            alert(err.response.data.message);
            return;
         });
   } else {
      alert('senhas nao conferem');
   }
};
