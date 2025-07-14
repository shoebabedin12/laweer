import RoleProtectedLayout from "@/components/auth/RoleProtectedLayout";
import { LayoutProps } from "@/types/LayoutTypes";

const Layout = ({ children }: LayoutProps)=> {
  return (
  <RoleProtectedLayout allowedRole="user">
    {children}
  </RoleProtectedLayout>);
}
export default Layout