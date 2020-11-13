import React from "react";
import useWindowSize from "../../actions/useWindowSize";
import { TagRow } from "./index";
import Link from "next/link";

const BlogPost = ({ post, tagsOnTop, tags }) => {
  const size = useWindowSize();
  const windowWidth = size.width;

  const imageBackground = {
    backgroundImage: `url()`,
  };

  const style =
    windowWidth > 900 ? { ...imageBackground, ...post.style } : imageBackground;
  return (
    <Link
      className='masonry-post overlay'
      style={style}
      href='/blog/[id]'
      as={`/blog/${post._id}`}>
      <div
        className='image-text'
        style={{
          justifyContent: tagsOnTop ? "space-between" : "flex-end",
        }}>
        <TagRow tags={tags} />
        <div>
          <h2 className='image-title'>{post.title}</h2>
          <span className='image-date'>{post.createdAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
