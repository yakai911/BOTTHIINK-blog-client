import fetch from "isomorphic-fetch";
import { API } from "../config";

export const userPublicProfile = (username) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getProfile = (token) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const update = (token, user) => {
  return fetch(`${process.env.NEXT_PUBLIC_API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
