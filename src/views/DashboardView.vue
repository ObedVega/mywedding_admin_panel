<template>
    <body class="w3-light-grey">

<!-- Top container -->
<div class="w3-bar w3-top w3-black w3-large" style="z-index:4">
  <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" @click="toggleSidebar">
    <i class="fa fa-bars"></i> &nbsp;Menu
  </button>  
  <span class="w3-bar-item w3-right">nvite.me</span>
</div>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" :style="{ display: sidebarOpen ? 'block' : 'none' }" style="z-index: 3; width: 300px;" id="mySidebar">
<br>
  <div class="ml w3-container w3-row">
    <div class="w3-col s4">
      <img src="https://www.w3schools.com/w3images/avatar2.png" class="w3-circle w3-margin-right" style="width:46px">
    </div>
    <div class="w3-col s8 w3-bar">
      Bienvenido, {{ user.nombre }}, {{ userEmail }}<br>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
  </div>
  <hr>
  <div class="ml w3-container">
    <h5>Dashboard</h5>
  </div>
  <div class="ml w3-bar-block">
    <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" @click="closeSidebar" title="close menu"><i class="fa fa-remove fa-fw"></i>&nbsp; Close Menu</a>
    <a href="#" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-users fa-fw"></i>&nbsp; Overview</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-eye fa-fw"></i>&nbsp; Views</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>&nbsp; Traffic</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bullseye fa-fw"></i>&nbsp; Geo</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-diamond fa-fw"></i>&nbsp; Orders</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bell fa-fw"></i>&nbsp; News</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bank fa-fw"></i>&nbsp; General</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-history fa-fw"></i>&nbsp; History</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
    <hr>
    <button class="w3-bar-item w3-button w3-padding" @click="showLogoutModal"><i class="fa fa-remove fa-fw"></i>&nbsp;Cerrar sesión</button>
    <br><br>
    <button class="w3-bar-item w3-button w3-padding" @click="logout"><i class="fa fa-remove fa-fw"></i>&nbsp;Cerrar sesión</button>
  </div>
</nav>


<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" @click="closeSidebar" style="cursor: pointer;" title="close side menu" id="myOverlay"></div>
  

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px;margin-top:43px;">
  
  <CompletaInfo :uEmail="userEmail" :style="{ display: user.nombreNovio !== '' || user.nombreNovia !== '' ? 'none' : 'block' }" @datos-actualizados="refreshData"/>


  <!-- Modal de confirmación de cierre de sesión -->
  <LogoutModal v-if="showModal" @close="closeModal" @logout="logout" />
  <!-- Modal -->
  
  <!-- Header -->
  <header class="w3-container" style="padding-top:22px">
    <h5><b><i class="fa fa-dashboard"></i> My Dashboard</b></h5>
  </header>

  
  <div class="w3-row-padding w3-margin-bottom">
      <div class="success">
        <p><strong>Bienvenido</strong> {{ user.nombre }}</p>
        <p>Aun necesitamos los datos de tu novia para poder generar la invitacion</p>
      </div>
  </div>
  <div class="w3-panel" v-if="user.sitioweb !== ''">
    <a :href="'https://mywedding-cyks.onrender.com/' + (user.nombre ? user.nombre.trim() : '') + '&' + (user.nombreNovia ? user.nombreNovia.trim() : '')" target="_blank">
      {{ 'https://mywedding-cyks.onrender.com/' + (user.nombre ? user.nombre.trim() : '') + '&' + (user.nombreNovia ? user.nombreNovia.trim() : '') }}
    </a>
  </div>
  <div class="w3-panel" v-else>
    <p>Aún no hay sitio web disponible</p>
  </div>
  
  <div class="w3-panel" v-if="user.nombreNovia !== ''">
      <div><h3><b>Datos de la novia</b></h3></div>
      {{ user.nombreNovia }}
  </div>
  <DatosNovia :uEmail="userEmail" :uName="user.nombre" v-if="user.nombreNovia === ''" @datos-actualizados="refreshData"/>

  <DatosEvento :uEmail="userEmail"/>
  
  <Invitacion :uEmail="userEmail"/>



<!--
  <div class="w3-container">
    <h5>Recent Comments</h5>
    <div class="w3-row">
      <div class="w3-col m2 text-center">
        <img class="w3-circle" src="https://www.w3schools.com/w3images/avatar3.png" style="width:96px;height:96px">
      </div>
      <div class="w3-col m10 w3-container">
        <h4>John <span class="w3-opacity w3-medium">Sep 29, 2014, 9:12 PM</span></h4>
        <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br>
      </div>
    </div>
   </div> 
  <div class="w3-panel">
    <div class="w3-row-padding" style="margin:0 -16px">
      <div class="w3-third">
        <h5>Regions</h5>
        <img src="https://www.w3schools.com/w3images/region.jpg" style="width:100%" alt="Google Regional Map">
      </div>
      <div class="w3-twothird">
        <h5>Feeds</h5>
        <table class="w3-table w3-striped w3-white">
          <tbody><tr>
            <td><i class="fa fa-user w3-text-blue w3-large"></i></td>
            <td>New record, over 90 views.</td>
            <td><i>10 mins</i></td>
          </tr>
          <tr>
            <td><i class="fa fa-bell w3-text-red w3-large"></i></td>
            <td>Database error.</td>
            <td><i>15 mins</i></td>
          </tr>
          <tr>
            <td><i class="fa fa-users w3-text-yellow w3-large"></i></td>
            <td>New record, over 40 users.</td>
            <td><i>17 mins</i></td>
          </tr>
          <tr>
            <td><i class="fa fa-comment w3-text-red w3-large"></i></td>
            <td>New comments.</td>
            <td><i>25 mins</i></td>
          </tr>
          <tr>
            <td><i class="fa fa-bookmark w3-text-blue w3-large"></i></td>
            <td>Check transactions.</td>
            <td><i>28 mins</i></td>
          </tr>
          <tr>
            <td><i class="fa fa-laptop w3-text-red w3-large"></i></td>
            <td>CPU overload.</td>
            <td><i>35 mins</i></td>
          </tr>
          <tr>
            <td><i class="fa fa-share-alt w3-text-green w3-large"></i></td>
            <td>New shares.</td>
            <td><i>39 mins</i></td>
          </tr>
        </tbody></table>
      </div>
    </div>
  </div>
  <hr>
  <div class="w3-container">
    <h5>General Stats</h5>
    <p>New Visitors</p>
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-green" style="width:25%">+25%</div>
    </div>

    <p>New Users</p>
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-orange" style="width:50%">50%</div>
    </div>

    <p>Bounce Rate</p>
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-red" style="width:75%">75%</div>
    </div>
  </div>
  <hr>

  <div class="w3-container">
    <h5>Countries</h5>
    <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
      <tbody><tr>
        <td>United States</td>
        <td>65%</td>
      </tr>
      <tr>
        <td>UK</td>
        <td>15.7%</td>
      </tr>
      <tr>
        <td>Russia</td>
        <td>5.6%</td>
      </tr>
      <tr>
        <td>Spain</td>
        <td>2.1%</td>
      </tr>
      <tr>
        <td>India</td>
        <td>1.9%</td>
      </tr>
      <tr>
        <td>France</td>
        <td>1.5%</td>
      </tr>
    </tbody></table><br>
    <button class="w3-button w3-dark-grey">More Countries &nbsp;<i class="fa fa-arrow-right"></i></button>
  </div>
  <hr>
  <div class="w3-container">
    <h5>Recent Users</h5>
    <ul class="w3-ul w3-card-4 w3-white">
      <li class="w3-padding-16">
        <img src="https://www.w3schools.com/w3images/avatar2.png" class="w3-left w3-circle w3-margin-right" style="width:35px">
        <span class="w3-xlarge">Mike</span><br>
      </li>
      <li class="w3-padding-16">
        <img src="https://www.w3schools.com/w3images/avatar5.png" class="w3-left w3-circle w3-margin-right" style="width:35px">
        <span class="w3-xlarge">Jill</span><br>
      </li>
      <li class="w3-padding-16">
        <img src="https://www.w3schools.com/w3images/avatar6.png" class="w3-left w3-circle w3-margin-right" style="width:35px">
        <span class="w3-xlarge">Jane</span><br>
      </li>
    </ul>
  </div>
  <hr>

  <div class="w3-container">
    <h5>Recent Comments</h5>
    <div class="w3-row">
      <div class="w3-col m2 text-center">
        <img class="w3-circle" src="https://www.w3schools.com/w3images/avatar3.png" style="width:96px;height:96px">
      </div>
      <div class="w3-col m10 w3-container">
        <h4>John <span class="w3-opacity w3-medium">Sep 29, 2014, 9:12 PM</span></h4>
        <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br>
      </div>
    </div>

    <div class="w3-row">
      <div class="w3-col m2 text-center">
        <img class="w3-circle" src="https://www.w3schools.com/w3images/avatar1.png" style="width:96px;height:96px">
      </div>
      <div class="w3-col m10 w3-container">
        <h4>Bo <span class="w3-opacity w3-medium">Sep 28, 2014, 10:15 PM</span></h4>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br>
      </div>
    </div>
  </div>
  <br>
  <div class="w3-container w3-dark-grey w3-padding-32">
    <div class="w3-row">
      <div class="w3-container w3-third">
        <h5 class="w3-bottombar w3-border-green">Demographic</h5>
        <p>Language</p>
        <p>Country</p>
        <p>City</p>
      </div>
      <div class="w3-container w3-third">
        <h5 class="w3-bottombar w3-border-red">System</h5>
        <p>Browser</p>
        <p>OS</p>
        <p>More</p>
      </div>
      <div class="w3-container w3-third">
        <h5 class="w3-bottombar w3-border-orange">Target</h5>
        <p>Users</p>
        <p>Active</p>
        <p>Geo</p>
        <p>Interests</p>
      </div>
    </div>
  </div>
-->
  <!-- Footer -->
  <footer class="w3-container w3-padding-16 w3-light-grey">
    <h4>FOOTER</h4>
    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
  </footer>

  <!-- End page content -->
</div>




</body>

</template>
<script>
import { mapState } from 'vuex';
import AuthService from '@/services/AuthService.js';
import CompletaInfo from '@/components/CompletaInfo.vue';
import DatosNovia from '@/components/DatosNovia.vue'
import DatosEvento from '@/components/DatosEvento.vue'
import LogoutModal from '@/components/LogoutModal.vue';
import Invitacion from '@/components/Invitacion.vue';
//import { template } from 'cypress/types/lodash';

export default {
  computed: {
    // Mapea el email del usuario desde el store a una propiedad computada
    ...mapState(['userEmail'])
  },
  data() {
    return {
      sidebarOpen: false,
      user: '',
      email: '',
      showModal: false
    };
  },
  //props: ['userEmail'],
  async created() {
    try {
      this.email = this.userEmail;
      console.log('Email del usuario:', this.email);
      // Hacer una solicitud al servidor para obtener la información del usuario
      const userData = await AuthService.getUserInfo(this.email);
      // Actualizar el estado del usuario con la información obtenida
      this.user = userData;
      console.log('Información del usuario:', this.user);
//      this.userEmail = userData.email;
  //    this.user.name= 'obed',
//      console.log('Información del usuario:', this.user.email);
    } catch (error) {
      console.log('Error al obtener la información del usuario:', error);
    }
  },
  components: {
    LogoutModal,
    CompletaInfo,
    DatosNovia,
    DatosEvento,
    Invitacion
  },
  methods: {
    refreshData() {
        // Volver a cargar los datos del usuario o realizar alguna acción necesaria
        console.log('Datos actualizados, refrescando...');
        window.location.reload();
    },
    showLogoutModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    logout() {
      this.$store.dispatch('logout'); // Llama a la acción de logout
      this.closeModal(); // Cierra el modal después de cerrar la sesión
    },
//    logout() {
//      this.$store.dispatch('logout'); // Llama a la acción de logout
//    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    }
  },
  
};
</script>
<style>
.success {
  margin-bottom: 15px;
  padding: 4px 12px;
  background-color: #ddffdd;
  border-left: 6px solid #04AA6D;
}

@media (min-width: 1024px){
  nav {
    margin-top: 0;
  }
  .ml{
    margin-left: 10px ;
  }
}
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>