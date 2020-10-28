import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
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
    <div>
      <Navbar color='dark' dark expand='md'>
        <NavbarBrand>{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link href='/'>
                <NavLink style={{ cursor: "pointer" }}>首页</NavLink>
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                分类
              </DropdownToggle>
              <DropdownMenu right color='dark'>
                <DropdownItem>文学</DropdownItem>
                <DropdownItem>科技</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>返回首页</DropdownItem>
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
    </div>
  );
};

export default Header;
