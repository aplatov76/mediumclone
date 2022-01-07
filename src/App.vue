<template>
  <mcv-top-bar />
  <router-view />
</template>

<script>
import McvTopBar from "@/components/TopBar";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "McvApp",
  components: {
    McvTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
