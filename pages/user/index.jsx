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
                <a href='/user/crud/blog'>创建博客</a>
              </li>
              <li>
                <Link href='/user/crud/blogs'>
                  <a href=''>更新/删除博客</a>
                </Link>
              </li>
              <li>
                <a href='/user/update'>Update profile</a>
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
