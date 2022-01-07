<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i>
              Edit article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i>
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :error="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div class="">
            <p>{{ article.body }}</p>
          </div>
          <mcv-tag-list v-if="article.tagList" :taglist="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/article";
import { getterTypes as authGetterTypes } from "@/store/modules/auth";
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";
import McvTagList from "@/components/TagList";

import { mapState, mapGetters } from "vuex";

export default {
  name: "McvArticle",
  components: {
    McvLoading,
    McvErrorMessage,
    McvTagList,
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    ...mapState({
      article: (state) => state.article.data,
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) return false;

      return this.currentUser.username === this.article.author.username;
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticleBySlug, { slug: this.slug });
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(actionTypes.deleteArticleBySlug, { slug: this.slug })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
};
</script>
