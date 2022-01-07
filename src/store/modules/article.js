import articleApi from "@/api/article";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleBySlugStart: "[Article] getArticleBySlugStart",
  getArticleBySlugSuccess: "[Article] getArticleBySlugSuccess",
  getArticleBySlugFailure: "[Article] getArticleBySlugFailure",

  deleteArticleBySlugStart: "[Article] deleteArticleBySlugStart",
  deleteArticleBySlugSuccess: "[Article] deleteArticleBySlugSuccess",
  deleteArticleBySlugFailure: "[Article] deleteArticleBySlugFailure",
};

export const actionTypes = {
  getArticleBySlug: "[Article] getArticleBySlug",
  deleteArticleBySlug: "[Article] deleteArticleBySlug",
};

const mutations = {
  [mutationTypes.getArticleBySlugStart](state) {
    state.isLoading = true;
    state.data = null;
    state.error = null;
  },
  [mutationTypes.getArticleBySlugSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleBySlugFailure](state, err) {
    state.isLoading = false;
    state.error = err;
  },

  [mutationTypes.deleteArticleBySlugStart]() {
    //state.isLoading = false;
    //state.data = null;
  },
  [mutationTypes.deleteArticleBySlugSuccess]() {
    //state.isLoading = false;
    //state.data = null;
  },
  [mutationTypes.deleteArticleBySlugFailure]() {
    //state.isLoading = false;
    //state.data = null;
  },
};

const actions = {
  [actionTypes.getArticleBySlug](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleBySlugStart, slug);
      articleApi
        .getArticleBySlug(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleBySlugSuccess, article);

          resolve(article);
        })
        .catch((err) => {
          context.commit(mutationTypes.getArticleBySlugFailure, err);
        });
    });
  },

  [actionTypes.deleteArticleBySlug](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleBySlugStart, slug);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleBySlugSuccess);

          resolve();
        })
        .catch((err) => {
          context.commit(mutationTypes.deleteArticleBySlugFailure, err);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
