import { createRouter, createWebHashHistory } from "vue-router";
import GlobalFeed from "@/views/GlobalFeed.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import YourFeed from "@/views/YourFeed.vue";
import TagFeed from "@/views/TagFeed.vue";
import Article from "@/views/Article.vue";
import CreateArticle from "@/views/CreateArticle.vue";
import UpdateArticle from "@/views/UpdateArticle.vue";
import Settings from "@/views/Settings.vue";
//import
import Foo from "@/views/Foo.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: GlobalFeed,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/userprofile",
    name: "userProfile",
    component: Login,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: TagFeed,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: YourFeed,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: CreateArticle,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: Article,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: UpdateArticle,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeed,
  },
  {
    path: "/profiles/foo",
    name: "foo",
    component: Foo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
