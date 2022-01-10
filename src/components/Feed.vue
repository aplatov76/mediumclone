<template>
  <div class="home">
    <mcv-loading v-if="isLoading" />

    <div v-if="isError">
      <mcv-error-message v-if="isError" :message="isError" />
    </div>
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
        </div>
        <div class="pull-xs-right">
          <mcv-add-to-favorites
            :is-favorited="article.favorited"
            :article-slug="article.slug"
            :favorites-count="article.favoritesCount"
          />
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list v-if="article.tagList" :taglist="article.tagList" />
        </router-link>
      </div>
    </div>
    <mcv-pagination
      v-if="feed"
      :total="feed.articlesCount"
      :limit="limit"
      :current-page="currentPage"
      :url="url"
    />
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/feed";
import McvPagination from "@/components/Pagination";
import McvLoading from "@/components/Loading";
import McvErrorMessage from "@/components/ErrorMessage";
import McvTagList from "@/components/TagList";
import McvAddToFavorites from "@/components/AddToFavorites";

import { limit } from "@/helpers/vars";
import { mapState } from "vuex";
import { parseUrl, stringify } from "query-string";

export default {
  name: "McvFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList,
    McvAddToFavorites,
  },
  data() {
    return {
      limit: limit,
      url: "/",
    };
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      isError: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      console.log("baseUrl: ", this.$route.path);
      return this.$route.path;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifyParams = stringify({
        limit,
        offset: (this.currentPage - 1) * limit,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifyParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>
