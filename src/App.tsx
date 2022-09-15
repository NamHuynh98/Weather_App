import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/index";
import Dashboard from "./pages/Dashboard";

import * as path from "./constant/router";

import {
  Switch,
  Route,
  RouteProps,
  RouteComponentProps,
  useLocation,
} from "react-router-dom";
import Detail from "./pages/Detail";
import NotFoundPage from "./pages/NotFoundPage";

interface IConditionalProps extends RouteProps {
  readonly component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const ConditionalRoute = ({ component, ...rest }: IConditionalProps) => {
  const Component = component;
  const render = (renderProps: RouteComponentProps<any>) => (
    <Component {...renderProps} />
  );
  return <Route {...rest} render={render} />;
};

const App = () => {
  const [breadcrumb, setBreadcrumb] = React.useState<string>("");
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    if (pathname === path.HOME || pathname === path.DASHBOARD)
      setBreadcrumb("Dashboard");
    else if (pathname.includes(`${path.DASHBOARD}${path.DETAIL}`))
      setBreadcrumb("Dashboard / Detail");
    else setBreadcrumb("");
  }, [location, location.pathname]);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.wrapperContent}>
        {!!breadcrumb.length && (
          <p className="mx-4 my-4 text-uppercase fw-bolder">{breadcrumb}</p>
        )}
        <Switch>
          <ConditionalRoute
            path={`${path.DASHBOARD}`}
            component={Dashboard}
            exact={true}
          />
          <ConditionalRoute
            path={`${path.HOME}`}
            component={Dashboard}
            exact={true}
          />
          <ConditionalRoute
            path={`${path.DASHBOARD}${path.DETAIL}`}
            component={Detail}
            exact={true}
          />
          <ConditionalRoute
            path={`${path.NOT_FOUND_PAGE}`}
            component={NotFoundPage}
            exact={true}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
