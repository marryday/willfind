import React, { useState } from "react";
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
  NavbarText,
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ToDo-MiddleWare</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="http://localhost:3000/info">Info</NavLink>
            </NavItem>
            {props.userStatusLogin ? (
              <NavLink href="#">logaut</NavLink>
            ) : (
              <>
                <NavItem>
                  <NavLink href="http://localhost:3000/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="http://localhost:3000/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {props.userStatusLogin ? (
            <NavbarText>Вы зашли как: {props.userSession.login}</NavbarText>
          ) : (
            <></>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
