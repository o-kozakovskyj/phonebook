<script>
import { mapActions } from "vuex";

export default {
  name: "ModalWindow",
  props: {
    newContact: {
      type: Object,
      default: () => {
        return {
          name: "",
          number: "",
          email: "",
          id: "",
        };
      },
    },
  },
  data() {
    return {
      newName: this.newContact.name,
      newNumber: this.newContact.number,
      newEmail: this.newContact.email,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    ...mapActions(["ADD_CONTACT"]),
    pushContact(e) {
      e.preventDefault();
      if (
        this.newName === "" ||
        this.newNumber === "" ||
        this.newEmail === ""
      ) {
        return;
      }
      this.ADD_CONTACT({
        name: this.newName,
        phone: this.newNumber,
        email: this.newEmail,
        createdAt: new Date().toISOString(),
        id: this.newContact.id,
      });
      this.newName = "";
      this.newNumber = "";
      this.newEmail = "";
      this.close();
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog">
        <button type="button" class="btn-close" @click="close">x</button>
        <div class="modal-body">
          <form v-on:submit="pushContact">
            <p>
              <label for="name">Name:</label>
              <input
                type="text"
                name="name"
                maxlength="99"
                v-model="newName"
                required
              />
            </p>
            <p>
              <label for="phone">Phone number:</label>
              <input
                required
                type="tel"
                maxlength="12"
                v-model="newNumber"
                name="phone"
              />
            </p>
            <p>
              <label for="email">E-mail: </label>
              <input
                required
                type="email"
                name="email"
                placeholder="email@example.com"
                v-model="newEmail"
              />
            </p>
            <p>
              <button type="submit" class="btn-add btn">+ Add Contact</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped src="./modal.css"></style>
