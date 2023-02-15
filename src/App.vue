<script>
import { mapActions, mapGetters } from "vuex";
import ContactsTable from "./components/Table.vue";
import ModalWindow from "./components/Modal.vue";
import moment from "moment";
export default {
  name: "App",
  components: {
    ContactsTable,
    ModalWindow,
  },

  data() {
    return {
      isModalVisible: false,
      searchFilter: "",
      pageNumber: 1,
    };
  },
  computed: {
    ...mapGetters(["CONTACTS", "CONTACTS_PER_PAGE"]),
    pages() {
      return Math.ceil(this.filteredContacts.length / this.CONTACTS_PER_PAGE);
    },
    paginatedPages() {
      const from = (this.pageNumber - 1) * this.CONTACTS_PER_PAGE;
      const to = from + Number(this.CONTACTS_PER_PAGE);
      return this.filteredContacts.slice(from, to);
    },
    filteredContacts() {
      if (this.searchFilter === "") {
        return this.CONTACTS;
      } else {
        return this.CONTACTS.filter(
          (contact) => contact.name.indexOf(this.searchFilter) > -1
        );
      }
    },
  },
  methods: {
    ...mapActions(["GET_CONTACTS_FROM_MOKAPI", "GET_CONTACTS_PER_PAGE"]),
    moment,
    getPageByNumber(page) {
      this.pageNumber = page;
    },
    sortByDataAsc() {
      this.CONTACTS.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  mounted() {
    this.GET_CONTACTS_FROM_MOKAPI();
  },
};
</script>

<template>
  <div id="app">
    <header>
      <div class="top-panel">
        <h3 class="top-panel__title">Phone Book</h3>
        <div class="top-panel__actions">
          <form class="form-group">
            <label>Search</label>
            <input
              type="text"
              name="search"
              class="form-control"
              v-model="searchFilter"
            />
          </form>
          <form class="form-group">
            <label for="counter">Contacts per page:</label>
            <input
              name="counter"
              type="number"
              step="1"
              max="100"
              min="1"
              v-model="CONTACTS_PER_PAGE"
              @input="(e) => GET_CONTACTS_PER_PAGE(e.target.value)"
            />
          </form>
        </div>
      </div>
    </header>
    <main>
      <ContactsTable :contactsList="paginatedPages" />
      <div class="container">
        <div class="pagination">
          <div
            class="page"
            v-for="page in pages"
            :key="page"
            @click="getPageByNumber(page)"
            :class="{ page__selected: page === pageNumber }"
          >
            {{ page }}
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="panel-footer">
        <button type="button" class="btn btn__app" @click="showModal">
          Add contact
        </button>
        <ModalWindow v-show="isModalVisible" @close="closeModal" />
      </div>
    </footer>
  </div>
</template>

<style src="./app.css"></style>
