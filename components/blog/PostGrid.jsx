import { Pagination } from "antd";
import { useState, useMemo } from "react";
import { TagRow } from "./index";
import Link from "next/link";
import moment from "moment";
import "antd/dist/antd.css";
import PostImg from "./PostImg";
import useWindowSize from "../../helper/useWindowSize";
import Image from "next/image";

const PostGrid = ({ posts }) => {
  const size = useWindowSize();
  const windowWidth = size.width;

  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginatedPosts = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  // useEffect(() => {
  //   window.scroll({
  //     top: 800,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // });

  return (
    <section className='grid-pagination-container'>
      <section className='post-grid container'>
        {paginatedPosts.map((post, index) => (
          <div className='post-container' key={index}>
            <figure>
              <a href={`/blogs/${post._id}`}>
                {/* <div
                  style={{
                    width: "100%",
                    height: windowWidth > 900 ? "300px" : "285px",
                  }}>
                  <a href={`/blogs/${post._id}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API}/blog/image/${post._id}`}
                      layout='fill'
                      objectFit='cover'
                      width={windowWidth > 900 ? "350px" : "305px"}
                      height={windowWidth > 900 ? "300px" : "285px"}
                    />
                  </a>
                </div> */}
                <PostImg
                  width={windowWidth > 900 ? "350px" : "305px"}
                  height={windowWidth > 900 ? "300px" : "285px"}
                  src={`${process.env.NEXT_PUBLIC_API}/blog/image/${post._id}`}
                  radius={5}
                />
              </a>
            </figure>
            <TagRow tags={post.tags} />
            <h2>{post.title}</h2>
            <p className='author-text'>
              <span>
                By:
                <Link href={post.author.profile}>
                  {" " + post.author.name + "  "}
                </Link>
              </span>
              <span>-{moment(post.createdAt).format("MMMM,DD,YYYY")}</span>
            </p>
            <div className='description-text'>
              {post.description.replace(/<[^>]+>/g, "").slice(0, 57) + " ..."}
            </div>
            <p className='author-text'>
              <Link href={`/blogs/${post._id}`} className='a-blue'>
                Read More...
              </Link>
            </p>
          </div>
        ))}
      </section>
      <div className='pagination-container'>
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
