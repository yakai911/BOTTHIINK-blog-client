import Carousel from "../components/Carousel";
import { PostGrid } from "../components/blog";

const Index = ({ posts }) => {
  console.log(process.env.API);
  return (
    <div className='index-container'>
      <Carousel items={posts} />
      <div className='container p-5 my-5' style={{ backgroundColor: "white" }}>
        <h2 className='mb-5'>Recent Post</h2>
        <PostGrid posts={posts} />
      </div>
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/blogs-categories-tags`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const json = await res.json();

  return {
    posts: json.blogs,
    tags: json.tags,
    categories: json.categories,
    size: json.size,
  };
};

export default Index;
