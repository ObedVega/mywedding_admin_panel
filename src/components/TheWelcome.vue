<script setup>
import Loader from '../components/LoaderDos.vue';
</script>
<template>
  <form  @submit.prevent="login" class="forma">
    <div class="container">
      <h1>Bienvenido</h1>
      <p>Inicie sesión para administrar su cuenta.</p>
      <hr>

      <label for="email"><b>Correo electrónico</b></label>
      <input type="email" placeholder="Ingresar correo electrónico" v-model="email" name="email" id="email" required>
      <span v-if="email" class="error">{{ emailError }}</span>
      
      <label for="psw"><b>Contraseña</b></label>
      <input type="password" placeholder="Introduce tu contraseña" v-model="password" name="psw" id="psw" required>
      <span v-if="passwordError" class="error">{{ passwordError }}</span>  

      <hr>
      <p>Olvidaste tu <a href="/reset">contraseña</a>?</p>

      <button type="submit" class="registerbtn">{{ isLoading ? '' : Msg   }} <Loader v-if="isLoading" /> </button>
      <div class="container signin">  
        <p>¿Todavia no tienes cuenta? <a href="/registro">Registrate aqui.</a></p>
      </div>
    </div>
    

  </form>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      Msg: 'Inicio sesión',
      passwordError: '',
      isLoading: false,
      user: null
    };
  },
  mounted() {
    // Verifica si hay un token en sessionStorage al cargar la página
    if (sessionStorage.getItem('token')) {
      // Si hay un token, redirecciona al Dashboard
      this.$router.push('/dashboard');
    }
  },
  methods: {
    async login() {
      // Reset errors
      this.emailError = '';
      this.passwordError = '';
      this.isLoading = true; 

      // Validate username
      if (!this.email) {
        this.usernameError = 'Introduce tu correo electronico.';
      }

      // Validate password
      if (!this.password) {
        this.passwordError = 'Introduce tu contraseña.';
      }

      // Perform login if no errors
      if (!this.emailError && !this.passwordError) {
        try{
        // Aquí puedes realizar una llamada a una API para autenticar al usuario
          console.log('Autenticado usuario...');
          const response = await AuthService.login(this.email, this.password);
          console.log('response:', response); 
          console.log('response.status:', response.status);
          if (response.status === 200) {
            
            this.user = response.data.user;
            const token = response.data.token; 
            //const userEmail = response.data.email; 
            //console.log('Usuario autenticado: ', userEmail);
            //console.log('token:', token);
            sessionStorage.setItem('token', token);
            this.$store.dispatch('login', { token, userEmail: this.email });
            this.$router.push('/dashboard');
          } else {
            console.log('Usuario no autenticado');
            this.emailError = 'Usuario o contraseña incorrectos.';
          }
        } catch (error) {
          console.error('Error al autenticar usuario:', error);
        } finally {
          this.Msg = 'Inicio sesión';
          this.isLoading = false;
        }
  
      }
    }
  },
  components: {
    Loader
  }
};
</script>
<style>
.error {
  color: #ed4c78;
}
* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white !important;
}

/* Full-width input fields */
input[type=email], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=email]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
/*  background-color: #f1f1f1; */
  text-align: center;
}
</style>
