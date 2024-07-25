import "./styles.css";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Icon, Input, LoadingComponent } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";
import { pathURL } from "../../App";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "home_dark";

  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate(`${pathURL}`)
    },
    {
      title: t("HEADER.NAV.home")
    }
  ];

  return (
    <>
      <div className={`container ${homeDark}`}>
        <div className="link_breadcrumb_container">
          <Breadcrumb data={breadcrumbs} darkTheme={theme} />
        </div>

        <section className={`bg-white p-5 d-flex flex-row justify-content-between`}>
          <div className="d-flex flex-column justify-content-evenly login_container">
            <h2 className="bold">
              {t("LOGIN.title")}
            </h2>
            <p>
              {t("LOGIN.subtitle")}
            </p>
            <form className="login d-flex flex-column">
              <Input darkTheme={theme} label={t("LOGIN.username_label")} type={"text"} className={"mb-3"} value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input darkTheme={theme} label={t("LOGIN.password_label")} type={"password"} className={"mb-3"} value={password} onChange={(e) => setPassword(e.target.value)} />
              {!loading ? <Button
                darkTheme={theme}
                className={"align-self-center submit"}
                variant={"primary"}
                text={t("LOGIN.submit")}
                disabled={!(username && password)}
                iconRight={<Icon darkTheme={theme} name="AMA-SetadoisoficialCima-Line" />} 
                iconLeft={
                  <svg className="gov_logo" role="presentation" viewBox="0 0 117 130" version="1.1" style={{ clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2, marginRight: '0.5em', width: '1.5em', height: '2.5em' }}>
                    <g transform="matrix(4.16667,0,0,4.16667,-117.583,-46.6623)">
                      <path d="M44.32,42.19L44.1,42.19C35.496,42.295 28.329,35.304 28.22,26.7C28.329,18.095 35.494,11.101 44.1,11.2L44.32,11.2L44.32,17.27L44.12,17.27C38.952,17.27 34.7,21.522 34.7,26.69C34.7,31.858 38.952,36.11 44.12,36.11L44.32,36.11L44.32,42.19Z"></path>
                      <path d="M46.66,28.91C46.456,29.013 46.229,29.065 46,29.06C45.103,29.084 44.334,28.394 44.26,27.5L44.26,24.54L47.63,24.54L47.63,27.15C47.63,27.15 47.57,28.52 46.66,28.91Z"></path>
                      <path d="M55.19,28.91C54.982,29.013 54.752,29.065 54.52,29.06C53.625,29.084 52.859,28.393 52.79,27.5L52.79,24.54L56.2,24.54L56.2,27.15C56.2,27.15 56.1,28.52 55.19,28.91Z"></path>
                      <path d="M50.7,34.24C50.559,34.29 50.41,34.314 50.26,34.31C49.367,34.334 48.599,33.65 48.52,32.76L48.52,30.1L48.52,30.39L51.9,30.39L51.9,33C51.781,33.613 51.309,34.101 50.7,34.24Z"></path>
                      <path d="M50.92,28.91C50.714,29.01 50.489,29.061 50.26,29.06C49.363,29.084 48.594,28.394 48.52,27.5L48.52,24.54L51.9,24.54L51.9,27.15C51.9,27.15 51.83,28.53 50.92,28.91Z"></path>
                      <path d="M50.7,23.73C50.558,23.775 50.409,23.799 50.26,23.8C49.367,23.824 48.599,23.14 48.52,22.25L48.52,19.54L51.9,19.54L51.9,22.17C51.828,22.874 51.362,23.48 50.7,23.73Z"></path>
                    </g>
                  </svg>
                }
                onClick={() => navigate(`${pathURL}user`)}
              /> : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
            </form>
          </div>

          <div className="d-flex flex-row align-items-center right_container">
            <Icon darkTheme={theme} name="AMA-SiteAcessibilidade-Line" />
          </div>
        </section>
      </div>
    </>
  );
}