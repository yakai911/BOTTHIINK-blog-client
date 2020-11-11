import Admin from "../../../components/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Admin>
      <div className='container-fluid px-5 py-4'>
        <div className='row'>
          <div className='col-md-12 mb-4 text-center'>
            <h3>新建文章</h3>
          </div>
          <div className='col-md-12 p-5' style={{ backgroundColor: "white" }}>
            <BlogCreate />
          </div>
        </div>
      </div>
    </Admin>
  );
};

export default Blog;
