import articleApi from "@/api/article";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  updateArticleStart: "[Article] updateArticleStart",
  updateArticleSuccess: "[Article] updateArticleSuccess",
  updateArticleFailure: "[Article] updateArticleFailure",
};

export const actionTypes = {
  updateArticle: "[Article] updateArticle",
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, err) {
    state.isSubmitting = false;
    state.validationErrors = err;
  },
};

const actions = {
  [actionTypes.updateArticle](context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.updateArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess);

          resolve(article);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.updateArticleFailure,
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
