import "./styles.css";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrumb, LoadingComponent, SortingTable, Button, Icon } from "ama-design-system";
import { ThemeContext } from "../../context/ThemeContext";

import { pathURL } from "../../App";
import { api } from '../../config/api'

import moment from 'moment'

// Extra Data / Functions

export default function Websites() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const splitedPath = location.pathname.split("/")
  const name = decodeURIComponent(splitedPath[splitedPath.length-2]) || null
  const pageName = decodeURIComponent(splitedPath[splitedPath.length-1]) || null

  const { theme } = useContext(ThemeContext);
  const homeDark = theme === "light" ? "" : "websites_dark";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Navigation options
  const breadcrumbs = [
    {
      title: t("HEADER.NAV.ecosystem"),
      href: "",
      onClick: () => navigate(`${pathURL}`)
    },
    {
      title: t("HEADER.NAV.home"),
      href: "",
      onClick: () => navigate(`${pathURL}user`)
    },
    {
      title: name
    },
    {
      title: pageName
    }
  ];

  const logoutUser = async () => {
    setLoading(true)
    if (api.isUserLoggedIn()) {
      const {response, err} = await api.logout()
      if(err && err.code && err.code === "ERR_NETWORK") {
        setError(t("MISC.unexpected_error") + " " + t("MISC.error_contact"));
      } else if(response && response.data.success === 1) {
        localStorage.removeItem('MM-username');
        localStorage.removeItem('MM-SSID');
        localStorage.removeItem('expires-at');
        localStorage.removeItem('websiteList')
        localStorage.removeItem('websiteListForWebsitePage')
        navigate(`${pathURL}`)
      }
    } else {
      localStorage.removeItem('MM-username');
      localStorage.removeItem('MM-SSID');
      localStorage.removeItem('expires-at');
      localStorage.removeItem('websiteList')
      localStorage.removeItem('websiteListForWebsitePage')
      navigate(`${pathURL}`)
    }
    setLoading(false)
  }

  useEffect(() => {
    
  },[])

  return (
    <>
      <div>dfgddfg</div>
    </>
  );
}