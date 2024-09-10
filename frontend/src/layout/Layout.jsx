import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="sm:w-[95%] w-[80%] mx-auto min-h-auto">{children}</div>
    </div>
  );
};

export default Layout;
