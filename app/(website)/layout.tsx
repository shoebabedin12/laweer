import Footer from "@/app/components/Footer/Footer";
import NavBar from "@/app/components/Header/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
