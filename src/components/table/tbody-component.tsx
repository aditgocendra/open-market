export default function TbodyComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <tbody className='divide-y divide-gray-200 overflow-auto'>{children}</tbody>
  );
}
