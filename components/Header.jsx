import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MyIcon from "../components/MyIcon";
import NProgress from "nprogress";
import { signout, isAuth } from "../actions/auth";
import Search from "./blog/Search";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";
import { APP_NAME } from "../config";
import Avatar from "../components/profile/Avatar";

//使用nprogress

const Header = () => {
  const router = useRouter();
  const [menuActive, setMenuActive] = useState(false);
  const [userData, setUserData] = useState({});

  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const handleMenuClick = (e) => {
    e.preventDefault();
    setMenuActive(!menuActive);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !btnRef.current.contains(e.target)
    ) {
      setMenuActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [menuRef, menuActive]);

  useEffect(() => {
    const handleRouteChangeStart = (url) => NProgress.start();
    const handleRouteChangeComplete = (url) => NProgress.done();
    const handleRouteChangeError = (url) => NProgress.done();

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  useEffect(() => {
    if (isAuth()) {
      setUserData(isAuth());
    }
  }, []);

  return (
    <nav className='site-navigation'>
      <span className='menu-title'>
        <Link href='/'>{APP_NAME}</Link>
        <a href='/'>
          <MyIcon />
        </a>
      </span>
      <div
        className={`menu-content-container ${menuActive && "active"}`}
        onMouseLeave={() => setMenuActive(false)}
        ref={menuRef}>
        <ul>
          <li>
            <Link href='/'>首页</Link>
          </li>
          <li>
            <Link href='/blogs/'>全部</Link>
          </li>
          <li>
            <Link href='/tags/novel'>小说</Link>
          </li>
          <li>
            <Link href='/tags/poetry'>诗歌</Link>
          </li>
          <li>
            <Link href='/tags/original'>原创</Link>
          </li>
          <li>
            <Link href='/tags/else'>其他</Link>
          </li>
        </ul>
        <Search />

        {isAuth() ? (
          <ul className='log-ul'>
            <li>
              <a onClick={() => signout(() => router.replace("/signin"))}>
                退出登录
              </a>
            </li>{" "}
          </ul>
        ) : (
          <ul className='log-ul'>
            <li>
              <Link href='/signin'>登录</Link>
            </li>
            <li>
              <Link href='/signup'>注册</Link>
            </li>
          </ul>
        )}

        <div className='menu-avtar-container'>
          {isAuth() && (
            <Link href={isAuth() && isAuth().role === 1 ? `/admin/` : `/user/`}>
              <div className='my-avatar'>
                <Avatar
                  size={38}
                  src={`${process.env.NEXT_PUBLIC_API}/user/photo/${userData.username}`}
                />
              </div>
            </Link>
          )}
          {isAuth() && <p className='menu-avtar-name'>{userData.name}</p>}
        </div>
      </div>

      <MenuOutlined onClick={handleMenuClick} ref={btnRef} />
    </nav>
  );
};

export default Header;
