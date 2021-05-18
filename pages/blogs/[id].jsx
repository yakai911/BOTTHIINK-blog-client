import Head from "next/head";
import Link from "next/link";
import { BlogCategory, TagRow } from "../../components/blog";
import renderHTML from "react-render-html";
import { useEffect, useState } from "react";
import { CustomerServiceOutlined } from "@ant-design/icons";
import SlideImage from "../../components/SlideImage";
import { APP_NAME, DOMAIN } from "../../config";
import { DateTime } from "luxon";
import { singleBlog, listRelated } from "../../actions/blog";
import { mergeStyles } from "../../helper/mergeStyles";
import DisqusThread from "../../components/DisqusThread";
import { singleCategory } from "../../actions/category";

const SingleBlog = ({ blog }) => {
  const [related, setRelated] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  const showComents = () => {
    return (
      <div>
        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`blog/${blog._id}`}
        />
      </div>
    );
  };

  const getVoices = () => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined") {
        const synth = window.speechSynthesis;
        const allVoices = synth.getVoices();
        resolve(allVoices);
      }
    });
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handleRead = (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      let readContent = blog.body.replace(/<[^>]+>/g, "");
      const synth = window.speechSynthesis;

      if (synth.speaking) {
        if (!synth.paused) {
          synth.pause();
          console.log("已暂停朗读", synth.paused);
        } else {
          synth.resume();
          console.log("已继续朗读", synth.paused);
        }
        return;
      }

      if (readContent !== "" && typeof speakText === "undefined") {
        const speakText = new SpeechSynthesisUtterance(readContent);

        speakText.onend = (e) => {
          console.log("文章结束了");
          synth.cancel();
        };

        if (synth.onvoiceschanged !== undefined) {
          synth.cancel();
        }

        speakText.onerror = (e) => {
          console.log("有什么地方出错了", e);
        };

        voices.forEach((voice) => {
          if (voice.name === selectedVoice) {
            speakText.voice = voice;
            speakText.lang = voice.lang;
          }
        });

        speakText.volume = 1;
        speakText.rate = 1;
        speakText.pitch = 1;

        synth.cancel();
        synth.speak(speakText);
      }
    }
  };

  useEffect(() => {
    loadRelated();
  }, []);

  useEffect(async () => {
    const allVoices = await getVoices();
    setVoices(allVoices);
  }, [voices]);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name='description' content={blog.description} />
      <link rel='canonical' href={`${DOMAIN}/blogs/${blog._id}`} />
      <meta property='og:title' content={`${blog.title}| ${APP_NAME}`} />
      <meta property='og:description' content={blog.description} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/blogs/${blog._id}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
      <meta
        property='og:image'
        content={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
      />
      <meta
        property='og:image:secure_url'
        ccontent={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
      />
      <meta property='og:image:type' content='image/jpg' />
      <meta name='theme-color' content='#eff3f8' />
    </Head>
  );

  const relatedConfig = {
    0: {
      height: "275px",
    },
    2: {
      height: "275px",
    },
  };

  mergeStyles(related, relatedConfig);

  const showRelatedBlog = () => {
    return <BlogCategory posts={related} columns={3} tagsOnTop={true} />;
  };

  return (
    <>
      {head()}
      <SlideImage
        img={`/blog/image/${blog._id}`}
        alt={blog.title}
        className='banner'
      />
      <main className='blog-article'>
        <article className='article-header-container'>
          <section className='article-header'>
            <>
              <h1>{blog.title}</h1>
            </>
            <p>
              <span className='author-text'>
                By : {"  "}
                <Link
                  href={`/profile/${blog.author.username}`}
                  className='a-blue'>
                  {blog.author.name}
                </Link>
              </span>
              <span className='description-text'>
                {" "}
                |{" "}
                {DateTime.fromISO(blog.createdAt)
                  .setLocale()
                  .toFormat("MMMM,dd,yyyy")}
              </span>
            </p>
            <TagRow tags={blog.tags} />
          </section>
        </article>
        {voices.length > 0 && (
          <div className='speaker-container'>
            <form onSubmit={handleRead}>
              <select value={selectedVoice} onChange={handleVoiceChange}>
                {voices.length > 0 &&
                  voices.map((voice) => (
                    <option value={voice.name} key={voice.name}>
                      {voice.name}
                    </option>
                  ))}
              </select>
              <button type='submit'>
                <CustomerServiceOutlined />
              </button>
            </form>
          </div>
        )}
        <article className='article-content'>
          <section>{renderHTML(blog.body)}</section>
        </article>
        <div className='contaienr' style={{ padding: "35px" }}>
          {showComents()}
        </div>
        <div className='container'>
          <h4 className='text-center'>相关推荐</h4>
          <div className='related-blogs'>{showRelatedBlog()}</div>
        </div>
      </main>
    </>
  );
};

function initRecent() {
  return new Promise((resolve, reject) => {
    singleCategory("recent-post").then((data) => {
      if (data.error) {
        // console.log(data.error);
        reject(data.error);
      } else {
        // return { recentPost: data.blogs };
        resolve(data.blogs);
      }
    });
  });
}

function initTrending() {
  return new Promise((resolve, reject) => {
    singleCategory("trending").then((data) => {
      if (data.error) {
        // console.log(data.error);
        reject(data.error);
      } else {
        // return { recentPost: data.blogs };
        resolve(data.blogs);
      }
    });
  });
}

function initFeatured() {
  return new Promise((resolve, reject) => {
    singleCategory("featured").then((data) => {
      if (data.error) {
        // console.log(data.error);
        reject(data.error);
      } else {
        // return { recentPost: data.blogs };
        resolve(data.blogs);
      }
    });
  });
}

export async function getStaticPaths() {
  const recentPosts = await initRecent();
  const trendingPosts = await initTrending();
  const featuredPosts = await initFeatured();
  const posts = [...recentPosts, ...trendingPosts, ...featuredPosts];
  const paths = posts.map((post) => ({
    params: {
      id: post._id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return singleBlog(params.id).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { props: { blog: data }, revalidate: 1 };
    }
  });
}

export default SingleBlog;
