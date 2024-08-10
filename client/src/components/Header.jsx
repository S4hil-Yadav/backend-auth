import { Button, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";

export default function Header() {
  return (
    <Navbar className="border-b-2 sticky inset-y-0">
      <Link
        to="/"
        className="text-2xl md:text-3xl font-black whitespace-nowrap"
      >
        <span className="text-gray-500">BOR</span>
        <span className="text-orange-300">GOR</span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={MdSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>
      <Button className="lg:hidden" color="gray">
        <MdSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="bg-transparent" color="gray" pill>
          <MdDarkMode />
        </Button>
        <Link to="/log-in">
          <Button gradientDuoTone="pinkToOrange">Login</Button>
        </Link>
      </div>
      <NavbarToggle />
      <Navbar.Collapse>
        <div className="flex gap-10 text-lg ">
          <Navbar.Link>
            <Link>Home</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link>Help</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link>Contact</Link>
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
