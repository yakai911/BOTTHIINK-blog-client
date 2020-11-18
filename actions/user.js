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
