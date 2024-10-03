import { ReactNode } from "react";

export default function DashboardLayoout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='w-full m-10'>
      <div className='border rounded-lg overflow-hidden'>{children}</div>
    </div>
  );
}
