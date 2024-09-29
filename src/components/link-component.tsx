import Link from "next/link";

export const LinkButtonComponent = ({
  href,
  title,
}: Readonly<{
  href: string;
  title: string;
}>) => {
  return (
    <Link
      href={href}
      className='bg-slate-800 text-white text-sm rounded-md px-3 py-1.5 hover:bg-slate-900'
      title={title}>
      {title}
    </Link>
  );
};
