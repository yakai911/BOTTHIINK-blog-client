import { useState, useEffect } from "react";
import Link from "next/link";
import MyIcon from "../components/MyIcon";
import NProgress from "nprogress";
import { signout, isAuth } from "../actions/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRouter } from "next/router";

//使用nprogress

const Header = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
    <>
      <Navbar expand='md' className='bg-white px-4 py-2'>
        <NavbarBrand>
          <Link href='/'>BOT THINK</Link>
          <MyIcon />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto mr-2' navbar>
            <NavItem>
              <Link href='/'>
                <NavLink>首页</NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                分类
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>全部</DropdownItem>
                <DropdownItem>小说</DropdownItem>
                <DropdownItem>诗歌</DropdownItem>
                <DropdownItem>其他</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            {isAuth() ? (
              <NavItem>
                <NavLink
                  onClick={() => signout(() => router.replace("/signin"))}>
                  退出登录
                </NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>登录</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>注册</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;
