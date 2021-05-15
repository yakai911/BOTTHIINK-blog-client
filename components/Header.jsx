import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MyBrand from "../components/MyBrand";
import NProgress from "nprogress";
import { signout, isAuth } from "../actions/auth";
import Search from "./blog/Search";
import { useRouter } from "next/router";
import { MenuOutlined } from "@ant-design/icons";
import Avatar from "../components/profile/Avatar";

//使用nprogress

const Header = () => {
  const router = useRouter();
  const [menuActive, setMenuActive] = useState(false);

  const [scrollDown, setScrollDown] = useState(false);

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

  const handleScrolling = () => {
    let currScrollPos;
    let preScrollPos =
      document.body.scrollTop || document.documentElement.scrollTop;

    window.addEventListener("scroll", () => {
      currScrollPos =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (currScrollPos - preScrollPos > 0) {
        setScrollDown(true);
      } else {
        setScrollDown(false);
      }
      preScrollPos = currScrollPos;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      handleScrolling();
    }
    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

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
    isAuth();
  }, []);

  return (
    <nav
      className='site-navigation'
      style={
        scrollDown
          ? { opacity: "0", top: "-65px" }
          : { opacity: "1", top: "0px" }
      }>
      <span className='menu-title'>
        <MyBrand width={45} height={45} fontSize={"24px"} cursor='pointer' />
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
              <a
                onClick={() =>
                  signout(() => {
                    router.replace("/signin");
                  })
                }>
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
                {!!isAuth().username && (
                  <Avatar
                    title='个人主页'
                    size={38}
                    src={`${process.env.NEXT_PUBLIC_API}/user/photo/${
                      isAuth().username
                    }`}
                  />
                )}
              </div>
            </Link>
          )}
          {isAuth() && <p className='menu-avtar-name'>{isAuth().name}</p>}
        </div>
      </div>

      <MenuOutlined onClick={handleMenuClick} ref={btnRef} />
    </nav>
  );
};

export default Header;
