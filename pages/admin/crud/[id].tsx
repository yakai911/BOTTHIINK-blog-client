import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const Blog = () => {
  return (
    <Admin>
      <div className='blogUpdate-container'>
        <BlogUpdate />
      </div>
    </Admin>
  );
};

export default Blog;
