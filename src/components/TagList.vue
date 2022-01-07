<template>
  <ul class="tag-list" v-if="taglist">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="tag in taglist"
      :key="tag"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "McvTagList",
  props: {
    taglist: {
      type: Array,
      required: true,
    },
  },
};
</script>
