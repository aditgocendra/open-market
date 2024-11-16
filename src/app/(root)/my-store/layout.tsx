import SidebarSellerComponent from "@/components/sidebar-seller-component";
import { MenuMyStoreProvider } from "../../../context/menu-my-store-context";

export default async function MyStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MenuMyStoreProvider>
      <div className='w-full flex justify-center items-start'>
        {/* Sidebar */}
        <SidebarSellerComponent />

        {/* Content */}
        <div className='w-full p-6'>{children}</div>
      </div>
    </MenuMyStoreProvider>
  );
}
