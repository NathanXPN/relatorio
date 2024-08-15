document.addEventListener('DOMContentLoaded', function() {
    // Certifique-se de que o Firebase foi inicializado corretamente
    if (!firebase.apps.length) {
      console.error('Firebase não foi inicializado corretamente.');
      return;
    }
  
    // Selecionar elementos do DOM
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
  
    // Adicionar evento de envio ao formulário
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      // Login com Firebase Authentication
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Login bem-sucedido
          console.log('Login bem-sucedido:', userCredential.user);
  
          // Salvar token no localStorage
          userCredential.user.getIdToken().then((token) => {
            localStorage.setItem('authToken', token);
            window.location.href = 'home.html'; // Redirecionar para outra página após o login
          });
        })
        .catch((error) => {
          // Tratar erros de login
          console.error('Erro ao fazer login:', error);
          errorMessage.textContent = error.message;
        });
    });
  });
  