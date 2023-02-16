<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ModalWindow",
  computed: {
    ...mapGetters(["CONTACT_TO_EDIT"]),
    contact() {
      return this.CONTACT_TO_EDIT;
    },
  },
  methods: {
    ...mapActions([
      "ADD_CONTACT",
      "CHANGE_MODAL_VISIBILITY",
      "UPDATE_CONTACT",
      "GET_CONTACT_TO_EDIT",
    ]),
    pushContact(e) {
      e.preventDefault();
      if (this.newName === "" || this.newPhone === "" || this.newEmail === "") {
        return;
      }
      if (this.contact.id) {
        this.UPDATE_CONTACT({
          ...this.contact,
        });
      } else {
        this.ADD_CONTACT({
          ...this.contact,
          createdAt: new Date().toISOString(),
        });
      }
      this.CHANGE_MODAL_VISIBILITY(false);
      this.GET_CONTACT_TO_EDIT({});
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog">
        <button
          type="button"
          class="btn-close"
          @click="CHANGE_MODAL_VISIBILITY(false)"
        >
          x
        </button>
        <div class="modal-body">
          <form v-on:submit="pushContact">
            <p>
              <label for="name">Name:</label>
              <input
                type="text"
                name="name"
                maxlength="99"
                v-model="contact.name"
                required
              />
            </p>
            <p>
              <label for="phone">Phone number:</label>
              <input
                required
                type="tel"
                maxlength="12"
                v-model="contact.phone"
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
                v-model="contact.email"
              />
            </p>
            <p>
              <button type="submit" class="btn-add btn">Submit</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped src="./modal.css"></style>
