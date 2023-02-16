<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import FileEditIcon from "vue-material-design-icons/FileEdit.vue";
import ModalWindow from "../Modal/Modal.vue";
export default {
  name: "ContactsTable",

  props: {
    contactsList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    DeleteIcon,
    FileEditIcon,
    ModalWindow,
  },

  methods: {
    ...mapActions([
      "DELETE_CONTACT",
      "CHANGE_MODAL_VISIBILITY",
      "GET_CONTACT_TO_EDIT",
    ]),
    moment,
    getEditContact(contact) {
      this.CHANGE_MODAL_VISIBILITY(true);
      this.GET_CONTACT_TO_EDIT(contact);
    },
  },
  computed: {
    ...mapGetters(["IS_MODAL_VISIBLE"]),
  },
};
</script>
<template>
  <table class="contacts">
    <thead class="contacts_header">
      <tr>
        <th>Name</th>
        <th>Phone Number</th>
        <th>E-mail</th>
        <th>Created</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contactsList" :key="contact.id">
        <td>{{ contact.name }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.email }}</td>
        <td>
          {{ moment(contact.createdAt).format("DD.MM.YYYY [&nbsp;] HH:mm") }}
        </td>
        <td>
          <span class="icon-box">
            <DeleteIcon
              fillColor="#524F4F"
              @click="DELETE_CONTACT(contact.id)"
            />
            <FileEditIcon
              fillColor="#524F4F"
              @click="getEditContact(contact)"
            />
            <ModalWindow v-show="IS_MODAL_VISIBLE" />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
}
<style src="./table.css"></style>
