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
