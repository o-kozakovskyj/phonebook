<script>
import { mapActions, mapGetters } from "vuex";
import ContactsTable from "./components/Table/Table.vue";
import ModalWindow from "./components/Modal/Modal.vue";
import HeaderPanel from "./components/Header/Header.vue";
import moment from "moment";
export default {
  name: "App",
  components: {
    ContactsTable,
    ModalWindow,
    HeaderPanel,
  },

  data() {
    return {
      pageNumber: 1,
    };
  },
  computed: {
    ...mapGetters([
      "CONTACTS",
      "CONTACTS_PER_PAGE",
      "IS_MODAL_VISIBLE",
      "SEARCH_FILTER",
      "SORTED_BY_DATE",
    ]),
    pages() {
      return Math.ceil(this.filteredContacts.length / this.CONTACTS_PER_PAGE);
    },
    paginatedPages() {
      const from = (this.pageNumber - 1) * this.CONTACTS_PER_PAGE;
      const to = from + Number(this.CONTACTS_PER_PAGE);
      return this.filteredContacts.slice(from, to);
    },
    filteredContacts() {
      if (this.SEARCH_FILTER === "") {
        return this.sortedContacts;
      } else {
        return this.sortedContacts.filter(
          (contact) => contact.name.indexOf(this.SEARCH_FILTER) > -1
        );
      }
    },
    sortedContacts() {
      if (this.SORTED_BY_DATE === "ascend") {
        return [...this.CONTACTS].sort((a, b) =>
          a.createdAt.localeCompare(b.createdAt)
        );
      } else if (this.SORTED_BY_DATE === "descend") {
        return [...this.CONTACTS].sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
      } else {
        return this.CONTACTS;
      }
    },
  },
  methods: {
    ...mapActions([
      "GET_CONTACTS_FROM_MOKAPI",
      "GET_CONTACTS_PER_PAGE",
      "CHANGE_MODAL_VISIBILITY",
    ]),
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
      <HeaderPanel />
    </header>
    <main>
      <ContactsTable :contactsList="paginatedPages" />
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
      <button
        type="button"
        class="btn btn__app"
        @click="CHANGE_MODAL_VISIBILITY(true)"
      >
        Add contact
      </button>
      <ModalWindow v-show="IS_MODAL_VISIBLE" />
    </main>
  </div>
</template>

<style src="./app.css"></style>
