import React from "react";

export default function TdComponent({
  children,
  position,
}: {
  children: React.ReactNode;
  position: string;
}) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-${position} text-sm text-gry-800`}>
      {children}
    </td>
  );
}
