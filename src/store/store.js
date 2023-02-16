import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    contacts: [],
    contactsPerPage: 4,
    isModalVisible: false,
    searchFilter: "",
    sortedByDate: null,
    contactToEdit: {},
  },

  getters: {
    CONTACTS(state) {
      return state.contacts;
    },
    CONTACTS_PER_PAGE(state) {
      return state.contactsPerPage;
    },
    IS_MODAL_VISIBLE(state) {
      return state.isModalVisible;
    },
    SEARCH_FILTER(state) {
      return state.searchFilter;
    },
    SORTED_BY_DATE(state) {
      return state.sortedByDate;
    },
    CONTACT_TO_EDIT(state) {
      return state.contactToEdit;
    },
  },
  mutations: {
    SET_CONTACTS_TO_STATE: (state, contacts) => {
      state.contacts = contacts;
    },
    SET_CONTACTS_PER_PAGE(state, value) {
      state.contactsPerPage = value;
    },
    SET_IS_MODAL_VISIBLE(state, value) {
      state.isModalVisible = value;
    },
    SET_SEARCH_FILTER_TO_STATE(state, filter) {
      state.searchFilter = filter;
    },
    SET_SORTED_BY_DATE(state, value) {
      state.sortedByDate = value;
    },
    SET_CONTACT_TO_EDIT(state, contact) {
      state.contactToEdit = contact;
    },
    DELETE_CONTACT_FROM_STATE(state, id) {
      const index = state.contacts.findIndex((contact) => contact.id == id);
      state.contacts.splice(index, 1);
    },
    ADD_CONTACT_TO_STATE(state, contact) {
      state.contacts.push(contact);
    },
    UPDATE_CONTACT_IN_STATE(state, contact) {
      const { id } = contact;
      const index = state.contacts.findIndex((contact) => contact.id == id);
      state.contacts[index] = contact;
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
    async ADD_CONTACT({ commit }, contact) {
      const response = await axios.post(
        `https://62deb5ec9c47ff309e7a60a0.mockapi.io/api/v1/users1/`,
        contact
      );
      commit("ADD_CONTACT_TO_STATE", response.data);
      return response.data;
    },
    async UPDATE_CONTACT({ commit }, contact) {
      const response = await axios.put(
        `https://62deb5ec9c47ff309e7a60a0.mockapi.io/api/v1/users1/${contact.id}`,
        contact
      );
      commit("UPDATE_CONTACT_IN_STATE", response.data);
      return response.data;
    },
    GET_CONTACTS_PER_PAGE({ commit }, value) {
      commit("SET_CONTACTS_PER_PAGE", value);
    },
    CHANGE_MODAL_VISIBILITY({ commit }, value) {
      commit("SET_IS_MODAL_VISIBLE", value);
    },
    GET_SEARCH_FILTER({ commit }, filter) {
      commit("SET_SEARCH_FILTER_TO_STATE", filter);
    },
    GET_SORTED_BY_DATE({ commit }, value) {
      commit("SET_SORTED_BY_DATE", value);
    },
    GET_CONTACT_TO_EDIT({ commit }, contact) {
      commit("SET_CONTACT_TO_EDIT", contact);
    },
  },
});
export default store;
