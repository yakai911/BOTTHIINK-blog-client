import fetch from "isomorphic-fetch";

//创建类别，注意必须是英语的类别
export const createTag = (tag, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//list categories
export const listTags = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/tags`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//read category
export const singleTag = (slug) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/tag/${slug}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete category
export const removeTag = (slug, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/tag/${slug}`, {
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
