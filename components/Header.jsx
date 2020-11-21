import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MyIcon from "../components/MyIcon";
import NProgress from "nprogress";
import { signout, isAuth } from "../actions/auth";
import Search from "./blog/Search";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { APP_NAME } from "../config";

//使用nprogress

const Header = (props) => {
  const router = useRouter();
  const [menuActive, setMenuActive] = useState(false);

  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
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

  return (
    <nav className='site-navigation'>
      <div className='menu-title'>
        <Link href='/'>{APP_NAME}</Link>
        <MyIcon />
      </div>
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

        <span className='menu-avtar-container'>
          <Avatar size={38} />
          <span className='menu-avtar-name'>hapmoniym</span>
        </span>
      </div>

      <MenuOutlined onClick={() => setMenuActive(!menuActive)} />
    </nav>
  );
};

export default Header;
