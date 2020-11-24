import { useState, useEffect } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { userPublicProfile } from "../../actions/user";
import Avatar from "./Avatar";
import { isAuth } from "../../actions/auth";
import { FormOutlined, HomeOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState([]);

  // useEffect(async () => {
  //   if (isAuth()) {
  //     const userData = await isAuth();
  //     setUser(userData);
  //     const ProfileData = await userPublicProfile(user.username);
  //     setUserProfile(ProfileData);
  //   }
  // }, []);

  return (
    <div className='user-dashboard'>
      <div className='userInfo-container'>
        <div className='userInfo'>
          <Avatar
            className='user-photo'
            size={90}
            src={`${process.env.NEXT_PUBLIC_API}/user/photo/${user.username}`}
          />
          <span>{user.name}</span>
          <div>
            <span className='userInfo-text'>{user.email}</span>
            {userProfile && (
              <span className='userInfo-text'>
                Joined <b>BOT THK</b>{" "}
                {moment(userProfile.user.createdAt).fromNow()}
              </span>
            )}
            {userProfile.blogs.length}
          </div>
        </div>

        <ul>
          <li>
            <HomeOutlined />
            <Link href='/'>
              <span>返回首页</span>
            </Link>
          </li>
          <li>
            <FormOutlined />
            <Link
              href={
                isAuth() && isAuth().role === 1
                  ? "/admin/crud/blog"
                  : "/user/crud/blog"
              }>
              <span>新建文章</span>
            </Link>
          </li>
          <li>
            <EditOutlined />
            <Link
              href={
                isAuth() && isAuth().role === 1
                  ? "/admin/crud/blogs"
                  : "/user/crud/blogs"
              }>
              <span>编辑文章</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='dashboard-right-container'>
        <div className='right-container'>
          <h2>Hi,{user.name}</h2>
          {JSON.stringify(userProfile.user.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
