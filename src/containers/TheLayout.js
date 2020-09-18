import React, { useState } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const [login, setlogin] = useState(true);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        {login ? (
          <div className="c-body">
            <TheContent />
          </div>
        ) : (
          <div></div>
        )}

        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
