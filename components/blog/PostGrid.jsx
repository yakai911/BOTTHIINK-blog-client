import { Pagination } from "antd";
import { useState, useMemo, useRef, useEffect } from "react";

import "antd/dist/antd.css";

import PostCard from "./PostCard";

const PostGrid = ({ posts }) => {
  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginationRef = useRef(null);
  let paginationPos;

  const paginatedPosts = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  // useEffect(() => {
  //   paginationPos = paginationRef.current.offsetTop;
  //   if (typeof window !== "undefined") {
  //     window.scroll({
  //       top: paginationPos,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, []);

  return (
    <section className='grid-pagination-container'>
      <section className='post-grid'>
        {paginatedPosts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </section>
      <div className='pagination-container' ref={paginationRef}>
        <Pagination
          simple
          showSizeChanger
          onShowSizeChange={setPageSize}
          pageSize={pageSize}
          total={posts.length}
          defaultCurrent={current}
          onChange={setCurrent}
        />
      </div>
    </section>
  );
};

export default PostGrid;
