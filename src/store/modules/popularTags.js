import tagsApi from "@/api/popularTags";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getTagsStart: "[Tags] getTagsStart",
  getTagsSuccess: "[Tags] getTagsSuccess",
  getTagsFailure: "[Tags] getTagsFailure",
};

export const actionTypes = {
  getTags: "[Tags] getTags",
};

const mutations = {
  [mutationTypes.getTagsStart](state) {
    state.isLoading = true;
    state.data = null;
    state.error = null;
  },
  [mutationTypes.getTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getTagsFailure](state, err) {
    state.isLoading = false;
    state.error = err;
  },
};

const actions = {
  [actionTypes.getTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getTagsStart);
      tagsApi
        .getPopularTags()
        .then((tags) => {
          context.commit(mutationTypes.getTagsSuccess, tags);

          resolve(tags);
        })
        .catch((err) => {
          context.commit(mutationTypes.getTagsFailure, err);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
};
