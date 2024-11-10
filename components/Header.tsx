import React from "react";
import NavMenu from "./navMenu";

const Header = () => {
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto flex-between">
        <div>
          <h1>NEXT LOGO</h1>
        </div>
        <NavMenu />
      </div>
    </header>
  );
};

export default Header;
