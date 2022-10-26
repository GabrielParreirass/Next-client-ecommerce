import Header from "./Header";
import React from "react";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer/>
    </div>
  );
}

export default Layout;
