import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    contacts: [],
    contactsPerPage: 4,
  },

  getters: {
    CONTACTS(state) {
      return state.contacts;
    },
    CONTACTS_PER_PAGE(state) {
      return state.contactsPerPage;
    },
  },

  mutations: {
    SET_CONTACTS_TO_STATE: (state, contacts) => {
      state.contacts = contacts;
    },
    SET_CONTACTS_PER_PAGE(state, value) {
      state.contactsPerPage = value;
    },
  },
  actions: {
    async GET_CONTACTS_FROM_MOKAPI({ commit }) {
      const response = await axios.get(
        "https://62deb5ec9c47ff309e7a60a0.mockapi.io/api/v1/users1"
      );
      commit("SET_CONTACTS_TO_STATE", response.data);
      return response.data;
    },
    GET_CONTACTS_PER_PAGE({ commit }) {
      commit("SET_CONTACTS_PER_PAGE");
    },
  },
});
export default store;
