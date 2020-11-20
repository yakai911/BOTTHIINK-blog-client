import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
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

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog._id}`}>
          <a className='btn btn-sm btn-warning ml-2'>更新</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog._id}`}>
          <a className='btn btn-sm btn-warning ml-2'>更新</a>
        </Link>
      );
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
          {showUpdateButton(blog)}
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
