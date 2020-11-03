import Post from "./PostGrid";

const BlogCategory = ({ posts, columns, tagsOntop }) => {
  return (
    <section
      className='masonry'
      style={{ gridTemplateColumns: `repeat($columns),minmax(275px,1fr)` }}>
      {posts.map((post, index) => (
        <Post {...{ post, index, tagsOntop, key: index }} />
      ))}
    </section>
  );
};

export default BlogCategory;
