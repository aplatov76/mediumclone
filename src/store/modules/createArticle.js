import articleApi from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[Article] createArticleStart",
  createArticleSuccess: "[Article] createArticleSuccess",
  createArticleFailure: "[Article] createArticleFailure",
};

export const actionTypes = {
  createArticle: "[Article] createArticle",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isLoading = false;
  },
  [mutationTypes.createArticleFailure](state, err) {
    state.isLoading = false;
    state.validationErrors = err;
  },
};

const actions = {
  [actionTypes.createArticle](context, { articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart);
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess);

          resolve(article);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.createArticleFailure,
            err.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
