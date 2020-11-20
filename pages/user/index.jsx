import Link from "next/link";
import Private from "../../components/auth/Private";

const UserIndex = () => {
  return (
    <Private>
      <div className='container'>
        <div className='row'>
          <div>
            <h2>User Dashboard</h2>
          </div>
          <div>
            <ul>
              <li>
                <Link href='/user/crud/blog'>
                  <a>创建博客</a>
                </Link>
              </li>
              <li>
                <Link href='/user/crud/blogs'>
                  <a>更新/删除博客</a>
                </Link>
              </li>
              <li>
                <Link href='/user/update'>
                  <a>Update profile</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>right</div>
        </div>
      </div>
    </Private>
  );
};

export default UserIndex;
