<template>
    <div class="w3-panel">
      <div><h3><b>Datos de la novia</b></h3></div>
      <form @submit.prevent="sendData" class="w3-container w3-card-4">
        <div class="w3-container">
          <h2>Datos de la novia</h2>
        </div>
        <div class="w3-row-padding">
          <div class="w3-half">
            <label>Nombre</label>
            <input class="w3-input w3-border" type="text" placeholder="Nombre..." v-model="nombreNovia" required>
          </div>
          <div class="w3-half">
            <label>Apellido</label>
            <input class="w3-input w3-border" type="text" placeholder="Apellido..." v-model="apellidoNovia" required>
          </div>
          <div class="w3-row-padding">
            <button class="w3-btn w3-blue">{{ isLoading ? '' : Msg   }} <span class="loading" v-if="isLoading">Actualizando</span></button>
          </div>
        </div>
        <br>
      </form>  
    </div> 
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {  
        nombreNovia: '',           
        apellidoNovia: '',
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
      if (this.nombreNovia === '' || this.apellidoNovia === '') {
        console.log('Faltan Datos');
      } else {
        // Enviar los datos al servidor
        try {
            console.log('Actualizando datos...');
            console.log('Nombre:', this.nombreNovia);
            console.log('Apellido:', this.apellidoNovia);
            const response = await AuthService.actualizaDatosNovia(this.uEmail, this.nombreNovia, this.apellidoNovia);
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