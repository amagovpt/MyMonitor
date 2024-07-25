import "./styles/theme.css";
import "./styles/main.css";
import "./styles/fontStyle.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home"
import Websites from './pages/Websites'
import Website from './pages/Website'
import Error from "./pages/Error"

//export const pathURL = process.env.REACT_APP_DEV_SERVER_URL;
export const pathURL = process.env.REACT_APP_PROD_SERVER_URL;

export default function App() {

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes basename={`${pathURL}`}>
            <Route path={`${pathURL}`} element={<Home />} />
            <Route path={`${pathURL}user`} element={<Websites />} />
            <Route path={`${pathURL}user/:name`} element={<Website />} />

            {/* Error page needs to be last */}
            <Route path={`${pathURL}*`} element={<Error />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
