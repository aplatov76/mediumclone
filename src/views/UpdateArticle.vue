<template>
  <mcv-article-form
    v-if="isArticle"
    :initial-values="{
      title: isArticle.title,
      description: isArticle.description,
      body: isArticle.body,
      tagList: isArticle.tagList,
    }"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import McvArticleForm from "@/components/ArticleForm";
import { actionTypes as actionTypesUpdateArticle } from "@/store/modules/updateArticle";
import { actionTypes as actionTypesArticle } from "@/store/modules/article";
import { mapState } from "vuex";

export default {
  name: "McvCreateArticle",
  components: {
    McvArticleForm,
  },
  /*data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },*/
  computed: {
    ...mapState({
      isArticle: (state) => state.article.data,
      isSubmitting: (state) => state.updateArticle.isSubmitting,
      validationErrors: (state) => state.updateArticle.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypesUpdateArticle.updateArticle, {
          slug: this.$route.params.slug,
          articleInput,
        })
        .then((article) => {
          console.log("article: ", article);
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
  mounted() {
    this.$store.dispatch(actionTypesArticle.getArticleBySlug, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
