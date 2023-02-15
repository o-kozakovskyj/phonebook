<script>
import moment from "moment";
import { mapActions } from "vuex";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import FileEditIcon from "vue-material-design-icons/FileEdit.vue";
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
  },

  methods: {
    ...mapActions(["DELETE_CONTACT"]),
    moment,
  },
};
</script>
<template>
  <table class="contacts">
    <thead>
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
              fillColor="#e7e7e7"
              @click="DELETE_CONTACT(contact.id)"
            />
            <FileEditIcon fillColor="#e7e7e7" />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
}
