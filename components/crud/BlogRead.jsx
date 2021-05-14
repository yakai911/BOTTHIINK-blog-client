import Link from "next/link";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import { DateTime } from "luxon";

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
        setTimeout(() => {
          setMessage("");
        }, 1000);
      }
    });
  };

  const deleteConfirm = (id) => {
    let answer = window.confirm("确定要删除这篇文章吗？");
    if (answer) {
      deleteBlogs(id);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog._id}`}>
          <button className='update-btn'>
            <EditOutlined />
            更新
          </button>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog._id}`}>
          <button className='update-btn'>
            <EditOutlined />
            更新
          </button>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className='blog-card'>
          <h5>{blog.title}</h5>
          <p className='description-text'>
            By: {blog.author.name} | Updated:
            {"  " +
              DateTime.fromISO(blog.updatedAt).setLocale("en").toRelative()}
          </p>
          <div>
            <p>
              {blog.description.replace(/<[^>]+>/g, "").slice(0, 50) + "..."}
            </p>
          </div>
          <div className='button-container'>
            <button onClick={() => deleteConfirm(blog._id)} className='del-btn'>
              <DeleteOutlined />
              删除
            </button>
            {showUpdateButton(blog)}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {blogs.length > 0 ? (
        <div className='manage-blogs'>
          {message && <div className='alert alert-warning'>{message}</div>}
          <div className='blogs-container'>{showAllBlogs()}</div>
        </div>
      ) : (
        <Link href={isAuth() && isAuth().role === 1 ? "admin" : "/user"}>
          <h3 style={{ marginTop: "50px", cursor: "pointer" }}>
            还没有发布过文章，
            <a href={isAuth() && isAuth().role === 1 ? "admin" : "/user"}>
              返回上一页
            </a>
          </h3>
        </Link>
      )}
    </>
  );
};

export default BlogRead;
