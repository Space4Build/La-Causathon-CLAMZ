import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./home";
import { Landing } from "./landing";
import { Main } from "./main";

const routes = [
  { path: "/", Page: Landing },
  { path: "/home", Page: Home },
  { path: "/main", Page: Main },
 
];

function Routing() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {routes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
}

export { Routing };
