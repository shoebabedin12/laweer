import RoleProtectedLayout from "@/components/auth/RoleProtectedLayout";
import { LayoutProps } from "@/types/LayoutTypes";

const Layout = ({ children }: LayoutProps)=> {
  return (
  <RoleProtectedLayout allowedRole="admin">
    {children}
  </RoleProtectedLayout>);
}
export default Layout