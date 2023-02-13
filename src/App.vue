<script>
import { mapActions, mapGetters } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import FileEditIcon from "vue-material-design-icons/FileEdit.vue";
import moment from "moment";
export default {
  name: "App",
  components: {
    DeleteIcon,
    FileEditIcon,
  },
  data() {
    return {
      searchFilter: "",
      pageNumber: 1,
      newName: "",
      newNumber: "",
      newEmail: "",
      contacts: null,
    };
  },
  computed: {
    ...mapGetters(["CONTACTS", "CONTACTS_PER_PAGE"]),
    pages() {
      return Math.ceil(this.CONTACTS.length / this.CONTACTS_PER_PAGE);
    },
    paginatedPages() {
      const from = (this.pageNumber - 1) * this.CONTACTS_PER_PAGE;
      const to = from + this.CONTACTS_PER_PAGE;
      return this.filteredContacts.slice(from, to);
    },
    filteredContacts() {
      if (this.searchFilter === "") {
        return this.CONTACTS;
      }
      return this.CONTACTS.filter((contact) =>
        contact.name.indexOf(this.searchFilter)>-1
      );
    },
  },
  methods: {
    ...mapActions([
      "GET_CONTACTS_FROM_MOKAPI",
      "GET_CONTACTS_PER_PAGE",
      "DELETE_CONTACT",
    ]),
    moment,
    getPageByNumber(page) {
      this.pageNumber = page;
    },
    sortByDataAsc() {
      this.CONTACTS.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
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
          <div class="form-group">
            <span>Search：</span>
            <input
              type="text"
              name="search"
              class="form-control"
              v-model="searchFilter"
            />
          </div>
          <div class="form-group">
            <span>Contacts per page：</span>
            <input
              type="number"
              step="1"
              min="1"
              :value="CONTACTS_PER_PAGE"
              @input="(e) => GET_CONTACTS_PER_PAGE(e.target.value)"
            />
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <table class="contacts">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>E-mail</th>
              <th @click="sortByDataAsc">Created</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in paginatedPages" :key="contact.id">
              <td>{{ contact.name }}</td>
              <td>{{ contact.phone }}</td>
              <td>{{ contact.email }}</td>
              <td>
                {{
                  moment(contact.createdAt).format("DD.MM.YYYY [&nbsp;] HH:mm")
                }}
              </td>
              <td>
                <span class="icon-box">
                  <DeleteIcon
                    fillColor="#e7e7e7"
                    @click="DELETE_CONTACT(contact.id)" />
                  <FileEditIcon fillColor="#e7e7e7"
                /></span>
              </td>
            </tr>
          </tbody>
        </table>
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
        <form class="form-inline">
          <div class="form-group">
            <span>Name：</span>
            <input
              type="text"
              class="form-control"
              maxlength="99"
              v-model="newName"
            />
          </div>
          <div class="form-group">
            <span>Phone number：</span>
            <input
              type="tel"
              class="form-control"
              placeholder="xxx-xxxxxxx"
              ng-pattern="/^\d{3}-\d{3}-\d{4}$/"
              v-model="newNumber"
            />
          </div>
          <div class="form-group">
            <span>E-mail：</span>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="email@example.com"
              v-model="newEmail"
            />
          </div>
          <button class="btn">Add Contact</button>
        </form>
      </div>
    </footer>
  </div>
</template>

<style src="./app.css"></style>
