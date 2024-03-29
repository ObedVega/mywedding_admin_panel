<template>
    <div class="w3-panel">
    <div><h3><b>Datos del evento</b></h3></div>
    <form  @submit.prevent="sendDatosEvento" class="w3-container w3-card-4">
      <div class="w3-container">
        <h2>Datos del evento</h2>
      </div>
      <div class="w3-row-padding">
        <div class="w3-half">
          <label>Fecha del evento</label>
          <input class="w3-input w3-border" type="date" v-model="diaEvento" required>
        </div>
        <div class="w3-half">
          <label>Hora</label>
          <input class="w3-input w3-border" type="time" v-model="timeEvento" required>
        </div>
        <div class="">
            <label>Direccion</label>
            <input class="w3-input w3-border" type="text" placeholder="Direccion..." v-model="direccionEvento" required>
        </div>
        <div class="">
            <label>Palabras para los invitados</label>
            <textarea class="w3-input w3-border" name="w3review" rows="4" cols="50" placeholder="Excribe algo sobre ustedes..." v-model="palabrasInvitados">
            </textarea>
        </div>
        <br>
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
        diaEvento: '',           
        timeEvento: '',
        direccionEvento:'',
        palabrasInvitados:'',
        Msg: 'Continuar',         
        isLoading: false
    };
  },
  props: ['uEmail'],
  methods: {
    // Metodo para enviar los datos al servidor
    async sendDatosEvento() {
        this.isLoading = true; 
      // Validar que los campos no esten vacios
      if (this.diaEvento === '') {
        console.log('Faltan Datos');
      } else {
        // Enviar los datos al servidor
        try {
            console.log('Actualizando datos...');
            console.log('Dia:', this.diaEvento);
            console.log('Hora:', this.timeEvento);
            console.log('Direccion:', this.direccionEvento);
            console.log('Palabras:', this.palabrasInvitados);
        
            const response = await AuthService.actualizaDatosEvento('3', this.uEmail, this.diaEvento, this.timeEvento, this.direccionEvento, this.palabrasInvitados);
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