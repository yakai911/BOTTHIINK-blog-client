import { handleResponse } from "./auth";

//创建类别，注意必须是英语的类别
export const createCategory = (category, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

//list categories
export const listCategories = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/categories`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//read category with blogs
export const singleCategory = (slug) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/category/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete category
export const removeCategory = (slug, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/category/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
