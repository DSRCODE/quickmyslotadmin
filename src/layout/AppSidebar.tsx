import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  GridIcon,
  TableIcon,
  ChevronDownIcon,
  HorizontaLDots,
  UserIcon,
  PaperPlaneIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import {
  ListCheckIcon,
  ListChecksIcon,
  LogOutIcon,
  Settings2,
  Settings2Icon,
  TableProperties,
  Ticket,
  TvIcon,
  User,
  User2Icon,
  UserCircleIcon,
  Warehouse,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  // {
  //   icon: <GridIcon />,
  //   name: "Dashboard",
  //   subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  // },
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <User />,
    name: "Customers Analytics",
    path: "/customer",
  },
  {
    icon: <TableProperties />,
    name: "Providers Analytics",
    path: "/provider",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Engagement",
    path: "/user",
  },
  {
    icon: <ListChecksIcon />,
    name: "Category Performance",
    path: "/category",
  },
  {
    icon: <Settings2Icon />,
    name: "App Settings",
    path: "/settings",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleLogout = () => {
    navigate("/signin");
  };

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((subItem) => {
        if (isActive(subItem.path)) {
          setOpenSubmenu(index);
        }
      });
    });
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <img
                className="dark:hidden"
                src="/logo.png"
                alt="Logo"
                width={60}
                height={30}
              />
              <div>
                <span className="tracking-wide text-[#FE4C8A] ">QUICK</span>
                <span className="tracking-wide  text-[#090A14] ">my</span>
                <span className="tracking-wide  text-[#090A14] ">SLOT</span>
              </div>
            </div>
          ) : (
            <img src="/logo.png" alt="Logo" width={32} height={32} />
            // <div className="flex items-center gap-2 text-primary font-bold text-xl">
            //   <Warehouse className="h-6 w-6 text-primary text-[#4f4981]" />
            // </div>
          )}
        </Link>
      </div>

      {/* Main Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className=" h-[650px] flex flex-col">
          <h2
            className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
              !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
            }`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              "Menu"
            ) : (
              <HorizontaLDots className="size-6" />
            )}
          </h2>
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {nav.subItems ? (
                  <button
                    onClick={() => handleSubmenuToggle(index)}
                    className={`menu-item group ${
                      openSubmenu === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } cursor-pointer ${
                      !isExpanded && !isHovered
                        ? "lg:justify-center"
                        : "lg:justify-start"
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size ${
                        openSubmenu === index
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span className="menu-item-text">{nav.name}</span>
                    )}
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <ChevronDownIcon
                        className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                          openSubmenu === index
                            ? "rotate-180 text-brand-500"
                            : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  nav.path && (
                    <Link
                      to={nav.path}
                      className={`menu-item group ${
                        isActive(nav.path)
                          ? "text-[#fff] bg-[#FF4D8B]"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span
                        className={`menu-item-icon-size ${
                          isActive(nav.path)
                            ? "text-[#fff] bg-[#FF4D8B]"
                            : "menu-item-icon-inactive"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{nav.name}</span>
                      )}
                    </Link>
                  )
                )}
                {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      subMenuRefs.current[`${index}`] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu === index
                          ? `${subMenuHeight[`${index}`]}px`
                          : "0px",
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`menu-dropdown-item ${
                              isActive(subItem.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto px-0">
            <button
              onClick={handleLogout}
              className={`menu-item border mb-4 group cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                isExpanded || isHovered || isMobileOpen
                  ? "justify-start text-gray-900 hover:bg-[#FF4D8B] hover:text-white"
                  : "justify-center"
              }`}
            >
              <LogOutIcon
                className={`menu-item-icon-size ${
                  isExpanded || isHovered || isMobileOpen
                    ? "text-gray-900"
                    : "text-gray-800"
                }`}
              />
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">Logout</span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
