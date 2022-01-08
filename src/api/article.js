import axios from "@/api/axios";

const getArticleBySlug = (slug) => {
  return axios
    .get(`/articles/${slug}`)
    .then((response) => response.data.article);
};

const deleteArticle = (slug) => {
  return axios.delete(`/articles/${slug}`);
};

const createArticle = (articleInput) => {
  return axios
    .post("/articles", { article: articleInput })
    .then((res) => res.data.article);
};

const updateArticle = (slug, articleInput) => {
  return axios
    .put(`/articles/${slug}`, { article: articleInput })
    .then((res) => res.data.article);
};

export default {
  getArticleBySlug,
  deleteArticle,
  createArticle,
  updateArticle,
};
