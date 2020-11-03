import React from "react";

const BlogPost = ({ post, tagsOnTop }) => {
  const windowWidth = window.innerWidth;
  const imageBackground = {
    backgroundImage: `url()`,
  };

  const style =
    windowWidth > 900 ? { ...imageBackground, ...post.style } : imageBackground;
  return (
    <a
      className='post overlay'
      style={style}
      href='/blog/[id]'
      as={`/blog/${id}`}>
      <div
        className='image-text'
        style={{
          justifyContent: tagsOnTop ? "space-between" : "flex-end",
        }}>
        <TagRow tages={post.tags} />
        <div>
          <h2 className='image-title'>{post.title}</h2>
          <span className='image-date'>{post.createdAt}</span>
        </div>
      </div>
    </a>
  );
};

export default BlogPost;
