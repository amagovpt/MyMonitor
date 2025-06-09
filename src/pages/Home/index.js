import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Icon } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";
import { pathURL } from "../../App";
import { api } from '../../config/api'
import { UserPass } from "./_components/userPass";
import { AuthCC } from "./_components/authCC";
import { Helmet } from "react-helmet";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "home_dark";

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [announceTitle, setAnnounceTitle] = useState('');

  const pageTitle = t("TITLES_PAGE.login")
  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.home"),
      href: "",
      onClick: () => navigate(`${pathURL}`)

    },

  ];

  const loginUser = async () => {
    setError();
    setLoading(true)
    const {response, err} = await api.login(username, password)
    if(err && err.code && err.code === "ERR_NETWORK") {
      setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
    } else if (err && err.code && err.code === "ERR_BAD_REQUEST") {
      setError(t("MISC.wrong_login"));
    } else if(response && response.data.success === 1) {
      const cookie = response?.data?.result;
      const tomorrow = new Date();
      tomorrow.setTime(tomorrow.getTime() + 1 * 86400000);

      sessionStorage.setItem('MM-username', username);
      localStorage.setItem('MM-SSID', cookie);
      localStorage.setItem('expires-at', tomorrow.toString());
      navigate(`${pathURL}user`)
    }
    setLoading(false)
  }
  const loginGov = async () => {
    api.loginGov()
  }

  const loginUserCC = async () => {
    setError();
    setLoading(true)
    await api.loginWithCC()
    setLoading(false)
  }

  useEffect(() => {
    document.title = pageTitle;

    setAnnounceTitle(pageTitle);
    if (api.isUserLoggedIn()) {
      navigate(`${pathURL}user`)
    }

  }, [])

  

  return (
    <>
     <Helmet>
        <title>{t("TITLES_PAGE.login")}</title>
      </Helmet>
      <div
        aria-live="assertive"
        className="assertive-div"
      >
        {announceTitle}
      </div>
      <div className={`container ${homeDark}`}>
        <div className="link_breadcrumb_container" >
          <Breadcrumb data={breadcrumbs} darkTheme={theme} tagHere={t("HEADER.ariaLabelBreadcrumb")}/>
        </div>

        <section className={`bg-white p-6 d-flex flex-row justify-content-between`}>
          <div className="d-flex flex-column justify-content-evenly login_container">
            <h2 className="bold">
              {t("LOGIN.title")}
            </h2>
            <p>
              {t("LOGIN.subtitle")}
            </p>

            {/* User + Pass */}
            <UserPass username={username} setUsername={setUsername} password={password} setPassword={setPassword} error={error} loginUser={() => loginUser()} loading={loading} />
            {/* Authentication with CC 
            <AuthCC loginUser={loginGov} loading={loading} /> */}
          </div>

          <div className="d-flex flex-row align-items-center right_container icon_mobile">
            <Icon darkTheme={theme} name="AMA-SiteAcessibilidade-Line" />
          </div>
        </section>
            <span className="mt-3">{t("LOGIN.manual_link")} <a href="https://amagovpt.github.io/a11yManuals/mymonitor/" target="_blank">{t("LOGIN.here")}</a></span>
      </div>
    </>
  );
}