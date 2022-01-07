<template>
  <mcv-create-article
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
export default {
  name: "McvCreateArticle",
  components: {},
  data() {
    return {
      initialValues: {},
      validationErrors: null,
      isSubmitting: false,
    };
  },
  methods: {
    onSubmit(data) {
      console.log("on Submit data: ", data);
    },
  },
};
</script>
