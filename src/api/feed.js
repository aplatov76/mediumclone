import axios from "@/api/axios";

const getFeed = (apiUrl) => {
  return axios.get(apiUrl);
};

const getPopularTags = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getFeed,
  getPopularTags,
};
