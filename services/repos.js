import { AxiosInstance } from ".";

export const getRepos = async (date) => {
  return await AxiosInstance.get("search/repositories", {
    params: {
      q: `created:>${date}`,
      sort: "stars",
      order: "desc",
      per_page: 10
    },
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    }
  });
};
