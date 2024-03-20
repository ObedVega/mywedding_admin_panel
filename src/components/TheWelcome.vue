<template>
  <form action="/action_page.php">
    <div class="container">
      <h1>Bienvenido</h1>
      <p>Inicie sesión para administrar su cuenta.</p>
      <hr>

      <label for="email"><b>Correo electrónico</b></label>
      <input type="text" placeholder="Ingresar correo electrónico" name="email" id="email" required>

      <label for="psw"><b>Contraseña</b></label>
      <input type="password" placeholder="Introduce tu contraseña" name="psw" id="psw" required>

      <hr>
      <p>Olvidaste tu <a href="#"> Contraseña</a>?</p>

      <button type="submit" class="registerbtn">Inicio sesión</button>
    </div>
    
    <div class="container signin">
      <p>¿Todavia no tienes cuenta? <a href="/">Registrate aqui.</a>.</p>
    </div>
  </form>
</template>
