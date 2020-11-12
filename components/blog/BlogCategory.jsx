import BlogPost from "./BlogPost";

const BlogCategory = ({ posts, columns, tagsOntop, tags }) => {
  return (
    <section
      className='masonry'
      style={{ gridTemplateColumns: `repeat($columns),minmax(275px,1fr)` }}>
      {posts.map((post, index) => (
        <BlogPost {...{ post, index, tagsOntop, key: index, tags }} />
      ))}
    </section>
  );
};

export default BlogCategory;
