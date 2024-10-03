"use client";

import { TbCategory2 } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import { VscDashboard } from "react-icons/vsc";
import { HiOutlineShoppingBag, HiOutlineUsers } from "react-icons/hi2";
import { BiStoreAlt } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function SidebarComponentAdmin() {
  const pathname = usePathname();

  const menu = [
    {
      link: "/dashboard",
      icon: <VscDashboard size={24} />,
      menu: "Dashboard",
    },

    {
      link: "/dashboard/category",
      icon: <TbCategory2 size={24} />,
      menu: "Categories",
    },
    {
      link: "/dashboard/product",
      icon: <FiShoppingBag size={24} />,
      menu: "Products",
    },
    {
      link: "/dashboard/orders",
      icon: <HiOutlineShoppingBag size={24} />,
      menu: "Orders",
    },

    {
      link: "/dashboard/user",
      icon: <HiOutlineUsers size={24} />,
      menu: "Users",
      child: [
        {
          link: "/dashboard/user/role",
          menu: "Roles",
        },
      ],
    },
    {
      link: "/dashboard/store",
      icon: <BiStoreAlt size={24} />,
      menu: "Store",
    },

    {
      link: "/dashboard/settings",
      icon: <IoSettingsOutline size={24} />,
      menu: "Settings",
    },
  ];
  return (
    <div className='p-5 min-w-[285px] shadow-md'>
      <h1 className='text-center text-2xl font-semibold m-10'>O-PM</h1>
      <hr className='mb-4' />
      {/* Sidebar Menu */}
      <ul className='flex flex-col gap-4'>
        {menu.map((item, id) => {
          const isActive =
            item.link != "/dashboard"
              ? pathname.includes(item.link)
              : pathname === item.link;
          return (
            <li key={id}>
              <div
                className={`w-full hover:bg-slate-100  rounded-md  ${
                  isActive ? "bg-slate-100" : "bg-transparent"
                } transition-all`}>
                {item.child ? (
                  <div>
                    {/* Menu */}
                    <Link
                      href={item.link}
                      className={`flex items-center justify-between p-3 gap-4 ${
                        isActive ? "text-slate-800" : "text-gray-500"
                      } hover:text-slate-800 hover:translate-x-1 transition-all`}>
                      <div className='flex items-center gap-4'>
                        {item.icon}
                        <span>{item.menu}</span>
                      </div>
                      <IoIosArrowDown
                        className={`${
                          isActive ? "rotate-0" : "rotate-180"
                        } transition-all`}
                      />
                    </Link>

                    {/* Sub Menu */}
                    {isActive &&
                      item.child.map((submenu, id) => {
                        const isActiveSub = pathname === submenu.link;
                        return (
                          <Link
                            href={submenu.link}
                            key={id}>
                            <div
                              className={`flex items-center p-3 gap-6 ${
                                isActiveSub ? "text-slate-800" : "text-gray-500"
                              } hover:text-slate-800`}>
                              <MdKeyboardArrowRight />
                              <span>{submenu.menu}</span>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className={`flex items-center p-3 gap-4 ${
                      isActive ? "text-slate-800" : "text-gray-500"
                    } hover:text-slate-800 hover:translate-x-1 transition-all`}>
                    {item.icon}
                    <span>{item.menu}</span>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
