import { Button, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="sticky inset-y-0 z-50 border-b-2">
      <Navbar.Brand
        as={Link}
        to="/"
        className="whitespace-nowrap text-2xl font-black md:text-3xl"
      >
        <span className="text-gray-700">BOR</span>
        <span className="text-orange-500">GOR</span>
      </Navbar.Brand>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={MdSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="lg:hidden" color="gray">
        <MdSearch className="text-lg" />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="size-10 self-center bg-transparent"
          color="gray"
          pill
        >
          <MdDarkMode />
          <MdLightMode />
        </Button>

        {path !== "/signup" && path !== "/login" && (
          <Link to="/signup">
            <Button outline gradientDuoTone="pinkToOrange">
              Signup
            </Button>
          </Link>
        )}
      </div>
      <NavbarToggle />
      <Navbar.Collapse>
        <div className="flex flex-col text-lg md:flex-row md:gap-10">
          <Navbar.Link active={path === "/home"} as="div">
            <Link to="/home">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/help"} as="div">
            <Link to="help">Help</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/contact"} as="div">
            <Link to="contact">Contact</Link>
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
