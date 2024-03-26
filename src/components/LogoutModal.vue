<template>
    <div class="w3-modal" style="display: block;">
        <div class="w3-modal-content">
        <div class="w3-container">
            <span class="w3-button w3-display-topright">&times;</span>
            <span class="" @click="closeModal">&times;</span>
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <button @click="confirmLogout">Cerrar sesión</button>
        </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closeModal() {
        this.$emit('close'); // Emite un evento para cerrar el modal
      },
      confirmLogout() {
        this.$emit('logout'); // Emite un evento para confirmar el logout
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para el modal */
  </style>