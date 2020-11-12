import Admin from "../../../components/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Admin>
      <div className='container-fluid p-5 '>
        <div className='col-md-12 p-5' style={{ backgroundColor: "white" }}>
          <BlogCreate />
        </div>
      </div>
    </Admin>
  );
};

export default Blog;
