import BlogPost from "./BlogPost";

const BlogCategory = ({ posts, columns, tagsOnTop }) => {
  return (
    <section
      className='masonry'
      style={{ gridTemplateColumns: `repeat(${columns},minmax(300px,1fr))` }}>
      {posts.map((post, index) => (
        <BlogPost {...{ post, index, tagsOnTop, key: index }} />
      ))}
    </section>
  );
};

export default BlogCategory;
