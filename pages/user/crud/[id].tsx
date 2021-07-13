import Private from "../../../components/auth/Private";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Link from "next/link";

const Blog = () => {
  return (
    <Private>
      <div className='blogUpdate-container'>
        <BlogUpdate />
      </div>
    </Private>
  );
};

export default Blog;
