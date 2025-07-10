import AdminLayout from "@/components/auth/AdminLayout";
import { LayoutProps } from "@/types/LayoutTypes";

const Layout = ({ children }: LayoutProps)=> {
  return (
  <AdminLayout>
    {children}
  </AdminLayout>);
}
export default Layout