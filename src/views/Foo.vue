<template>
  <div>Foo</div>
</template>

<script>
export default {
  name: "Foo",
  mounted() {
    this.$store.commit("foo/getArticleStart");
  },
};
</script>
