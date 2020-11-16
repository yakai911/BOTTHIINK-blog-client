import fetch from "isomorphic-fetch";

export const createBlog = (blog, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/blog`, {
    method: "POST",
    headers: {
      Accept: "appliaction/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (blog) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//列出用于类别卡片展示的博客
export const list = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/blogs`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//删除博客
export const removeBlog = (_id, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/blog/${_id}`, {
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

//更新博客
export const updateBlog = (blog, token, _id) => {
  return fetch(`{API}/blog/${_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
