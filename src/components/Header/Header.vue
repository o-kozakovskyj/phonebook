<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HeaderPanel",
  methods: {
    ...mapActions([
      "GET_CONTACTS_PER_PAGE",
      "GET_SEARCH_FILTER",
      "GET_SORTED_BY_DATE",
    ]),
  },
  computed: {
    ...mapGetters(["CONTACTS_PER_PAGE", "SEARCH_FILTER"]),
  },
};
</script>
<template>
  <div class="top-panel">
    <h3 class="top-panel__title">Phone Book</h3>
    <div class="top-panel__actions">
      <form class="form-group">
        <label>Search</label>
        <input
          type="text"
          name="search"
          class="form-control"
          :value="SEARCH_FILTER"
          @input="(e) => GET_SEARCH_FILTER(e.target.value)"
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
          :value="CONTACTS_PER_PAGE"
          @input="(e) => GET_CONTACTS_PER_PAGE(e.target.value)"
        />
      </form>
      <div class="sort-box">
        <label>Sort by Date</label>
        <button class="sort-box__btn" @click="GET_SORTED_BY_DATE('ascend')">
          asc
        </button>
        <button class="sort-box__btn" @click="GET_SORTED_BY_DATE('descend')">
          desc
        </button>
      </div>
    </div>
  </div>
</template>
<style src="./header.css"></style>
