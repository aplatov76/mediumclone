<template>
  <div v-if="isLoading">Loading...</div>
  <div class="tag-list" v-if="data">
    <p>PopularTags</p>
    <router-link
      v-for="(tag, index) in data"
      :key="index"
      :to="{ name: 'tag', params: { slug: tag } }"
      class="tag-default tag-pill"
      >{{ tag }}</router-link
    >
  </div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/popularTags";

export default {
  name: "McvPopularTag",
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      data: (state) => state.popularTags.data,
      error: (state) => state.popularTags.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags);
  },
};
</script>
