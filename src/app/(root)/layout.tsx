import FooterComponent from "@/components/footer-component";
import NavbarComponent from "@/components/navbar-component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarComponent />
      {children}
      <FooterComponent />
    </div>
  );
}
