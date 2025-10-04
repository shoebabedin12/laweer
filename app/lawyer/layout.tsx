import RoleProtectedLayout from "@/app/components/auth/RoleProtectedLayout";
import { LayoutProps } from "@/app/types/LayoutTypes";

const Layout = ({ children }: LayoutProps)=> {
  return (
  <RoleProtectedLayout allowedRole="lawyer">
    {children}
  </RoleProtectedLayout>);
}
export default Layout