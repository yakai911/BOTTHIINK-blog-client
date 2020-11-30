import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Link from "next/link";

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
