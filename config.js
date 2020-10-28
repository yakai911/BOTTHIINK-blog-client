import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://myseo-blog-backend.herokuapp.com/api"
  : "http://localhost:5000/api";

export const APP_NAME = publicRuntimeConfig.APP_NAME;
