import fetch from "isomorphic-fetch";
import { BlogCategory, BlogPost, PostGrid } from "../../components/blog";
import { withRouter } from "next/router";
import { API } from "../../config";

const Blogs = ({ posts, router }) => {
  return (
    <main className='home'>
      <section className='container'>
        <div className='row'>
          <section className='featured-posts-container'>
            <BlogCategory posts={posts} columns={2} tagsOnTop={true} />
            <BlogPost post={posts[3]} />
          </section>
        </div>
      </section>
      {/* <section className='bg-white'>
        <section className='container'>
          <div className='row'>
            <h1>Reacent Post</h1>
            <PostGrid posts={posts} />
          </div>
        </section>
      </section> */}
    </main>
  );
};

Blogs.getInitialProps = async (ctx) => {
  const res = await fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const json = await res.json();

  return {
    posts: json.blogs,
    tags: json.tags,
    categories: json.categories,
    size: json.size,
  };
};

export default withRouter(Blogs);
