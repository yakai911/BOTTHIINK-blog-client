import Head from "next/head";
import Link from "next/link";
import { userPublicProfile } from "../../actions/user";
import { DOMAIN, APP_NAME } from "../../config";
import moment from "moment";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {APP_NAME}
      </title>
      <meta name='description' content={`Blogs by ${user.username}`} />
      <link rel='canonical' href={`${DOMAIN}/profile/${query.username}`} />
      <meta property='og:title' content={`${user.username}| ${APP_NAME}`} />
      <meta property='og:description' content={`Blogs by ${user.username}`} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/profile/${query.username}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => (
      <div className='mt-4 mb-4' key={i}>
        <Link href={`/blogs/${blog._id}`}>
          <a className='lead'>{blog.title}</a>
        </Link>
      </div>
    ));
  };

  return (
    <>
      {head()}
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-body'>
                <h5>{user.name}</h5>
                <Link href={`${user.profile}`}>
                  <a>查看用户信息</a>
                </Link>
                <p className='text-muted'>
                  加入时间{moment(user.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className='container pb-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title bg-primary p-4 text-white'>
                  {user.name}最近发布的文章
                </h5>
                {showUserBlogs()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title bg-primary p-4 text-light'>
              联系{user.name}
            </h5>
            <br />
            <p>来自</p>
          </div>
        </div>
      </div>
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;
