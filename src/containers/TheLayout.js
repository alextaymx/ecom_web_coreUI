import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import TheAside from "./TheAside";

const TheLayout = () => {
  const isLogin = useSelector((state) => state.userInfo.isLogin);
  // const [login, setlogin] = useState(false);
  return (
    <>
      {isLogin ? (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <TheAside />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      ) : (
        <Redirect from="/" to="/login" />
      )}
    </>
  );
};

export default TheLayout;
