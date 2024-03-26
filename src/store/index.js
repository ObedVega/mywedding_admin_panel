import { createStore } from 'vuex';
import router from '../router';

const store = createStore({
  state() {
    return {
      token: sessionStorage.getItem('token') || null,
      userEmail: localStorage.getItem('userEmail') || null
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    setUserEmail(state, email) {
      state.userEmail = email;
      localStorage.setItem('userEmail', email);
    },
    clearUser(state) {
      state.userEmail = null;
      localStorage.removeItem('userEmail');
    }
  },
  actions: {
    login({ commit }, { token, userEmail }) {
      commit('setToken', token);
      commit('setUserEmail', userEmail);
    },
    logout({ commit }) {
      commit('clearUser');
      commit('setToken', null);
      sessionStorage.removeItem('token');
      router.push('/');
    }
  }
});

export default store;