import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlogs = (id) => {
    removeBlog(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (id) => {
    let answer = window.confirm("确定要删除这这篇文章吗？");
    if (answer) {
      deleteBlogs(id);
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className='pb-5'>
          <h3>{blog.title}</h3>
          <p className='description-text'>
            By: {blog.author.name} |更新于:{moment(blog.updatedAt).fromNow()}
          </p>
          <button
            onClick={() => deleteConfirm(blog._id)}
            className='btn btn-sm btn-danger'>
            删除
          </button>
        </div>
      );
    });
  };

  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          {message && <div className='alert alert-warning'>{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  );
};

export default BlogRead;
