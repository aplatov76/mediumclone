<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "McvValidationErrors",
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map((item) => {
        const messages = this.validationErrors[item].join(", ");
        return `${item}: ${messages}`;
      });
    },
  },
};
</script>
