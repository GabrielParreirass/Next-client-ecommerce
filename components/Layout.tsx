import Header from "./Header";

import React from "react";


function Layout({ children }:{children: React.ReactNode }) {
  return( <div>
    <Header/>
    <div>{children}</div>
    </div>);
}

export default Layout;
