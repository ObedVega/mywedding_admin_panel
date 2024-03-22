<script setup>
import HelloWorld from '../components/HelloWorld.vue';  
import Loader from '../components/Loader.vue';
</script>
<template>
  <div class="bod">
    <div class="wrap">
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
        <div class="wrapper">
          <HelloWorld msg="Felicidades!" />
        </div>
      </header>
      <div class="mensaje">
        <div class="container">
          <h1>Registro exitoso</h1>
          <p>Te hemos enviado un correo electrónico de confirmación. ¡Gracias por registrarte! Ahora puedes iniciar sesión con tus credenciales.</p>
        </div>
        <div class="signin">
            <p>O puedes iniciar sesión <a href="/"> Aqui!</a></p>
          </div>
      </div>
      <form @submit.prevent="register" class="forma">
        <div class="container">
          <h1>Registro</h1>
          <p>Por favor complete este formulario para crear una cuenta.</p>
          <hr>
          <div class="sections">
            <label for="email"><b>Correo electrónico</b></label>
            <input type="email" placeholder="Ingresar correo electrónico" name="email" id="email" v-model="email" required>
            <span v-if="emailError" class="error">{{ emailError }}</span>
          </div>
          
          <div class="sections">
            <label for="psw"><b>Contraseña</b></label>
            <input type="password" placeholder="Introduce tu contraseña" name="psw" id="psw" v-model="psw" required>
            <span v-if="passwordError1" class="error">{{ passwordError1 }}</span>
          </div>
          
          <div class="sections">
            <label for="psw-repeat"><b>Repetir Contraseña</b></label>
            <input type="password" placeholder="Repetir Contraseña" name="pswRepeat" id="pswRepeat" v-model="pswRepeat" required>
            <span v-if="passwordError2" class="error">{{ passwordError2 }}</span>
          </div>
          
          <hr>
          <p>Al crear una cuenta aceptas nuestra <a href="#"> Términos y Privacidad</a>.</p>

          <button type="submit" class="registerbtn">{{ isLoading ? '' : registrarMsg }} <Loader v-if="isLoading" /> </button>
          <div class="signin">
            <p>¿Ya tienes una cuenta? <a href="/">Iniciar sesión.</a>.</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
    data() {
    return {
      email: '',
      emailError:'',
      psw: '',
      pswRepeat: '',
      passwordError1: '',
      passwordError2: '',
      registrarMsg: 'Registrar',
      isLoading: false
    };
  },
  methods: {
    async register() {
      // Reset errors
      this.emailError = '';
      this.passwordError1 = '';
      this.passwordError2 = '';
      this.registrarMsg= '';
      this.isLoading = true; 

 
      if (!this.email) {
        this.emailError = 'Introduce tu correo electronico.';
      }
      if (!this.psw) {
        this.passwordError1 = 'Introduce tu contraseña.';
      }
      if (!this.pswRepeat) {
        this.passwordError2 = 'Confirma tu contraseña.';
      }

      if (this.psw !== this.pswRepeat) {
        this.passwordError2 = 'Las contraseñas no coinciden.';
      }

      if (!this.emailError && !this.passwordError1 && !this.passwordError2) {
        try {
            console.log('Registrando...');
            const response = await AuthService.register(this.email, this.psw);
            if (response.status === 200) {
              // Muestra el mensaje de registro exitoso
              const mensajeDiv = document.querySelector('.mensaje');
              const formaForm = document.querySelector('.forma');
              if (mensajeDiv) {
                mensajeDiv.style.display = 'block';
              }
              if (formaForm) {
                formaForm.style.display = 'none';
              }
            } 
            console.log(response); 
        } catch (error) {
            
        } finally {
          this.registrarMsg = 'Registrar';
          this.isLoading = false; // Desactiva el loader cuando se recibe la respuesta
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
.mensaje{
  display: none;
}
.sections{
  margin: 0 0 22px 0;
}
.error {
  color: #ed4c78;
}
* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type=email], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 0 0;
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
