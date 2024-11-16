"use client";

import { FiShoppingBag } from "react-icons/fi";
import { VscDashboard } from "react-icons/vsc";
import { HiOutlineShoppingBag, HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function SidebarSellerComponent() {
  const pathname = usePathname();

  const menu = [
    {
      link: "/my-store",
      icon: <VscDashboard size={24} />,
      menu: "Dashboard",
    },

    {
      link: "/my-store/products",
      icon: <FiShoppingBag size={24} />,
      menu: "Products",
    },
    {
      link: "/my-store/orders",
      icon: <HiOutlineShoppingBag size={24} />,
      menu: "Orders",
    },

    {
      link: "/my-store/user",
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
      link: "/my-store/settings",
      icon: <IoSettingsOutline size={24} />,
      menu: "Settings",
    },
  ];
  return (
    <div className='min-w-[264px] min-h-svh border-r p-3'>
      {/* Sidebar Menu */}
      <ul className='flex flex-col gap-4'>
        {menu.map((item, id) => {
          const isActive =
            item.link != "/my-store"
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
