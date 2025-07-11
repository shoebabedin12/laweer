import RoleProtectedLayout from "@/components/auth/RoleProtectedLayout";
import { LayoutProps } from "@/types/LayoutTypes";

const Layout = ({ children }: LayoutProps)=> {
  return (
  <RoleProtectedLayout allowedRole="lawyer">
    {children}
  </RoleProtectedLayout>);
}
export default Layout