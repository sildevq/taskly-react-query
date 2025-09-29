import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-background">
      <Header />
      <main className="min-h-4/5 container mx-auto px-4 py-10">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
