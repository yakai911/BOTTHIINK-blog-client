import fetch from "isomorphic-fetch";
import { API } from "../config";

//创建类别，注意必须是英语的类别
export const createCategory = (category, token) => {
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//list categories
export const listCategories = () => {
  return fetch(`${API}/categories`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//read category
export const singleCategory = (slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete category
export const removeCategory = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
