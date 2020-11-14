import Carousel from "../components/Carousel";

const Index = ({ tags, posts }) => {
  console.log(process.env.API);
  return (
    <div>
      <Carousel />
      <p>{process.env.NEXT_PUBLIC_API}</p>
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
