import Private from "../../../components//auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Private>
      <div className='container-fluid p-5 '>
        <div
          className='col-md-12 p-5 mt-5'
          style={{ backgroundColor: "white" }}>
          <BlogCreate />
        </div>
      </div>
    </Private>
  );
};

export default Blog;
