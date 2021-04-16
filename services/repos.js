import { AxiosInstance } from ".";

export const getRepos = async () => {
  // Calculate date for 30 days ago
  const sevenDaysAgo = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);
  const formatYear = sevenDaysAgo.getFullYear();
  const formatMonth = ("0" + (sevenDaysAgo.getMonth() + 1)).slice(-2);
  const formatDate = ("0" + sevenDaysAgo.getDate()).slice(-2);
  const formatFullDate = `${formatYear}-${formatMonth}-${formatDate}`;

  return await AxiosInstance.get("search/repositories", {
    params: {
      q: `created:>${formatFullDate} stars:>100`,
      sort: "stars",
      order: "desc",
      per_page: 10
    },
    validateStatus: function (status) {
      return status >= 200 && status < 300;
    }
  });
};
