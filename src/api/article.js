import axios from "@/api/axios";

const getArticleBySlug = (slug) => {
  return axios
    .get(`/articles/${slug}`)
    .then((response) => response.data.article);
};

const deleteArticle = (slug) => {
  return axios.delete(`/articles/${slug}`);
};

export default {
  getArticleBySlug,
  deleteArticle,
};
