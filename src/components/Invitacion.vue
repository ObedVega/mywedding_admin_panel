<template>
    <div class="w3-panel">
    <div><h3><b>Diseño Invitacion</b></h3></div>
    <div>
        <form  @submit.prevent="selectTemplate" class="w3-container w3-card-4">
            <div class="w3-container">
                <h2>Elige tu diseño</h2>
            </div>
            <div class="w3-row-padding">
                <div class="w3-half w3-border" style="text-align: center;">
                  <label for="img1">
                      <img src="https://www.w3schools.com/w3css/img_temp_wedding.jpg" class="w3-padding" style="width:98%;margin:20px 0" alt="Wedding Invitation Template 1"/>
                  </label>
                  <input type="radio" id="img1" name="selectedImage1" value="template1" v-model="template1" :checked="uTemplate === 'template1'">
                </div>
                <div class="w3-half w3-border" style="text-align: center;">
                  <label for="img2">
                      <img src="../assets/wedding-template-2.jpg" class="w3-padding" style="width:98%;margin:20px 0" alt="Wedding Invitation Template 2"/>
                  </label>
                  <input type="radio" id="img2" name="selectedImage2" value="template2" v-model="template2" :checked="uTemplate === 'template2'">
                </div>
            </div>
            <br>
            <div class="w3-row-padding">
                <button class="w3-btn w3-blue">{{ isLoading ? '' : Msg   }} <span class="loading" v-if="isLoading">Actualizando</span></button>
                </div>
            <br>
        </form>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {  
        template1: '',      
        template2: '',           
        template0:'',
        Msg: 'Seleccionar',         
        isLoading: false
    };
  },
  props: ['uEmail', 'uTemplate'],
  methods: {
    // Metodo para enviar los datos al servidor
    
    async selectTemplate() {
        this.isLoading = true; 
      // Validar que los campos no esten vacios
   //   if (this.template1 === '' || this.template2 === '') {
   //     console.log('Faltan Datos');
   //   } else {
        // Enviar los datos al servidor
        
        try {
          
          if(this.template1!==''){
            this.template0 = this.template1;
          } 
          if(this.template2!=='') {
            this.template0 = this.template2;
          }
            console.log('Actualizando datos...');
            console.log(this.template0);
            const response = await AuthService.eligueDiseno('4', this.uEmail, this.template0);
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
 //   }
  }
};
</script>