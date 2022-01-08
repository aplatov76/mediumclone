<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                />
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getterTypes as authGetterTypes } from "@/store/modules/auth";

export default {
  name: "",
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.isSubmitting,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    form() {},
  },
  methods: {
    onSubmit(settingInput) {
      console.log("setting form: ", settingInput);
    },
  },
};
</script>
