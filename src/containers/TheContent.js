import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes.js";
// redux
// import { useSelector } from "react-redux";
const loading = (
  <div className="pt-3 text-center" role="status">
    <div className="spinner-grow">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const TheContent = () => {
  // const isLogin = useSelector((state) => state.userInfo.isLogin);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map(
              (route, idx) =>
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
            )}
            {/* <Route name="Page 404" render={(props) => <Page404 {...props} />} /> */}
            <Redirect from="/" to="/404" />

            {/* {isLogin ? (
              <Redirect from="/" to="/dashboard" />
            ) : (
              <Redirect from="/" to="/login" />
            )} */}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
