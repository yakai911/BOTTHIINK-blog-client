import Private from "../../../components/auth/Private";
import BlogRead from "../../../components/crud/BlogRead";
import Link from "next/link";
import { isAuth } from "../../../actions/auth";

const Blog = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Private>
      <div className='manageBlog-container'>
        <BlogRead username={username} />
      </div>
    </Private>
  );
};

export default Blog;
