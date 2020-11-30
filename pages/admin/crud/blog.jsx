import Admin from "../../../components//auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Admin>
      <div className='creator-container'>
        <BlogCreate />
      </div>
    </Admin>
  );
};

export default Blog;
