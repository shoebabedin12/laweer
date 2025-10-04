import RoleProtectedLayout from "@/app/components/auth/RoleProtectedLayout";
import { LayoutProps } from "@/app/types/LayoutTypes";

const Layout = ({ children }: LayoutProps)=> {
  return (
  <RoleProtectedLayout allowedRole="admin">
    {children}
  </RoleProtectedLayout>);
}
export default Layout