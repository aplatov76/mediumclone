import { createStore } from "vuex";
import auth from "@/store/modules/auth";
import feed from "@/store/modules/feed";
import popularTags from "@/store/modules/popularTags";
import article from "@/store/modules/article";
import createArticle from "@/store/modules/createArticle";
import updateArticle from "@/store/modules/updateArticle";
import settings from "@/store/modules/settings";

import foo from "@/store/modules/foo";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    updateArticle,
    settings,
    foo,
  },
});
