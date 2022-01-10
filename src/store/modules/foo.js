const state = {
  isLoading: false,
};

const mutations = {
  getArticleStart(state) {
    state.isLoading = true;
  },
  getArticleSuccess(state) {
    state.isLoading = false;
  },
  getArticleFailure(state) {
    state.isLoading = false;
  },
};

const actions = {
  getArticle(context) {
    context.commit("getArticleStart");
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
