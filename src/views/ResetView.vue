<template>
   <div class="bod">
    <div class="wrap">
      <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
        <div class="wrapper">
          <HelloWorld msg="Felicidades!" />
        </div>
      </header>
      <form action="/action_page.php" class="forma">
        <div class="container">
            <h1>¿Olvidaste tu contraseña?</h1>
            <p>Ingresa tu dirección de correo electrónico para recuperar tu contraseña.</p>
            <hr>
            <label for="email"><b>Emai electrónico</b></label>
            <input type="email" placeholder="Ingresar correo electrónico" name="email" id="email" required>
            <hr>
            <button type="submit" class="registerbtn">Enviar</button>
            <div class="container signin">
            <p><a href="/">Regresar para iniciar sesión</a></p>
        </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import HelloWorld from '../components/HelloWorld.vue';
</script>
<style>

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