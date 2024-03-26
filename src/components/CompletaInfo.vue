<template>
      <div class="w3-modal">
    <div class="w3-modal-content w3-card-4">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('id01').style.display='none'" 
        class="w3-button w3-display-topright">&times;</span>
        <h2>Completa tu registro</h2>
      </header>
      <br>
      <div class="w3-container">
        <div class="w3-row">
          <div class="w3-row-padding">
            <p class="w3-xlarge">Estamos encantados que nos hayas elegito para tu sitio web invitacion, asi que necesitamos mas datos para poder continuar...</p>
          </div>
        </div>
        <hr>
        <form @submit.prevent="sendData">
            <div class="w3-row">
            <div class="w3-half w3-container">
                <label for="fname">Nombre</label>
                <input type="text" id="fname" name="firstname" placeholder="Tu nombre.." v-model="nombre" required>
            </div>
            <div class="w3-half w3-container">
                <label for="fname">Apellido</label>
            <input type="text" id="fname" name="firstname" placeholder="Tu apellido.." v-model="apellido" required>
            </div>
            </div>
            <div class="w3-row">
            <div class="w3-half w3-container">
                <label for="evento">Tipo de evento</label>
                <select id="evento" name="evento" v-model="selectedEvento" required>
                    <option value="boda">Boda</option>
                    <option value="aniversario">Aniversario</option>
                    <option value="graduacion">Graduacion</option>
                    <option value="cumpleaños">Cumpleaños</option>
                </select>
            </div>
            <div class="w3-half w3-container">
                <label for="tipo">Quien eres?</label>
                <select id="tipo" name="tipo" v-model="selectedTipo" required>
                    <option value="novio">Soy el novio</option>
                    <option value="novia">Soy la novia</option>
                </select>
            </div>
            </div>
            <hr>
            <div class="w3-row">
            <div class="w3-half w3-container"></div>
            <div class="w3-half w3-container">
                <button type="submit" class="boton">{{ isLoading ? '' : Msg   }} <span class="loading" v-if="isLoading">Actualizando</span></button>
            </div>
            </div>
        </form>
        <br>
      </div>
      <footer class="w3-container w3-teal">
        <p>Modal Footer</p>
      </footer>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      selectedEvento: '',  
      selectedTipo: '',    
      nombre: '',           
      apellido: '',
      Msg: 'Continuar',         
      isLoading: false
    };
  },
  props: ['uEmail'],
  methods: {
    // Metodo para enviar los datos al servidor
    async sendData() {
        this.isLoading = true; 
      // Validar que los campos no esten vacios
      if (this.nombre === '' || this.apellido === '') {
        console.log('Faltan Datos');
      } else {
        // Enviar los datos al servidor
        try {
            console.log('Actualizando datos...');
            const response = await AuthService.actualizaDatos(this.uEmail, this.nombre, this.apellido, this.selectedEvento, this.selectedTipo);
            console.log('Status:', response.status)
            if (response.status === 200) {
                console.log('Datos actualizados');
                this.$emit('datos-actualizados')
            }

        } catch (error) {
            console.log('Error al enviar los datos');
        } finally{
            this.Msg = 'Continuar';
            this.isLoading = false;
        }
      }
    }
  }
};
</script>
<style>
.boton {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.boton:hover {
  opacity: 1;
}
span {
  color: white;
/*  font: 300 4em/150% Impact;*/
  text-align: center;
}


/* loading dots */

.loading:after {
  content: '.';
  animation: dots 1s steps(5, end) infinite;}

@keyframes dots {
  0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: white;
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;}}
</style>
