import config from "../config";

export const requestConfig = function () {
  return {
    baseURL: config.apiUrl,
    crossdomain: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
