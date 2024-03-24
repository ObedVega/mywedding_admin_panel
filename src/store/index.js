import { createStore } from 'vuex';
import router from '../router';

const store = createStore({
  state() {
    return {
      token: sessionStorage.getItem('token') || null
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    }
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      sessionStorage.removeItem('token');
      // Puedes importar router directamente aquí si no quieres pasar router como argumento
      router.push('/');
    //    this.$router.push('/');
    }
  }
});

export default store;