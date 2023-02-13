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
    DELETE_CONTACT_FROM_STATE(state, id) {
      const index = state.contacts.findIndex((contact) => contact.id == id);
      state.contacts.splice(index, 1);
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
    async DELETE_CONTACT({ commit }, id) {
      const response = await axios.delete(
        `https://62deb5ec9c47ff309e7a60a0.mockapi.io/api/v1/users1/${id}`
      );
      commit("DELETE_CONTACT_FROM_STATE", id);
      return response.data;
    },
    GET_CONTACTS_PER_PAGE({ commit }, value) {
      commit("SET_CONTACTS_PER_PAGE", value);
    },
  },
});
export default store;
