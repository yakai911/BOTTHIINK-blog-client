import { useState } from "react";
import Link from "next/link";
import MyIcon from "../components/MyIcon";
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

const Header = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar expand='md' className='bg-white px-4 py-2'>
        <NavbarBrand href='/'>
          BOT THINK
          <MyIcon />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto mr-2' navbar>
            <NavItem>
              <Link href='/'>
                <NavLink style={{ cursor: "pointer" }}>首页</NavLink>
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
                  style={{ cursor: "pointer" }}
                  onClick={() => signout(() => router.replace("/Signin"))}>
                  退出登录
                </NavLink>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link href='/Signin'>
                    <NavLink>登录</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/Signup'>
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
