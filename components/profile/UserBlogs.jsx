import React, { useState, useMemo } from "react";
import moment from "moment";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import MyBrand from "../MyBrand";

const UserBlogs = ({ blogs, user }) => {
  const [pageSize, setPageSize] = useState(6);
  const [current, setCurrent] = useState(1);

  const paginatedBlogs = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return blogs.slice(firstIndex, lastIndex);
  }, [current, pageSize, blogs]);

  return (
    <div className='dashboard-right-container'>
      <div className='header-container'>
        <div className='brand-container'>
          <MyBrand />
        </div>
        <div className='info-container'>
          <h2>{user.name}</h2>
          {blogs.length > 0 ? (
            <h5 className='userInfo-text'>
              在 BTOT-THK 一共发布了 {blogs.length} 篇文章
            </h5>
          ) : (
            <h5 className='userInfo-text'>您还没有发布过文章</h5>
          )}
        </div>
        <div className='btn-contaienr'>
          <h1>
            <a
              href={
                user && user.role === 1 ? "/admin/crud/blog" : "/user/crud/blog"
              }>
              +
            </a>
          </h1>
        </div>
      </div>

      <div className='blog-card-container'>
        {blogs.length > 0 ? (
          paginatedBlogs.map((b, i) => (
            <a href={`/admin/crud/${b._id}`}>
              <div className='blog-card'>
                <h4>{b.title}</h4>
                <span className='desc-text'>
                  By: {user.name} | {moment(b.createdAt).format("MMM.DD-YYYY")}
                </span>
                <div>
                  <p>{b.description.replace(/<[^>]+>/g, "")}</p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <h5 className='userInfo-text'>还没有发布过文章</h5>
        )}
      </div>

      <div className='pagination-container'>
        <Pagination
          simple
          showSizeChanger
          onShowSizeChange={setPageSize}
          pageSize={pageSize}
          total={blogs.length}
          defaultCurrent={current}
          onChange={setCurrent}
        />
      </div>
    </div>
  );
};

export default UserBlogs;
