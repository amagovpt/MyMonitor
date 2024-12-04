/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon } from 'ama-design-system'
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./styles.css";

export function ButtonsActions({reRequest, seeCode, downloadCSV, href, themeClass}) {
  const { t } = useTranslation();
  const [seePage, setSeePage] = useState(false);

  const openPageLinks = () => {
    setSeePage(!seePage);
  };

  return (
    <>
        <div className={`d-flex flex-row justify-content-between deskGroupMobile ${themeClass}`} >
            <Button
                size="md"
                variant="secondary"
                text={t("RESULTS.actions.re_evaluate")}
                iconRight={<Icon name="AMA-Reload-Line" />}
                onClick={() => reRequest()}
            />

            <div className="d-flex flex-row gap-3 other">
                <div>
                    <Button
                        id="dropdownMenuButton"
                        size="md"
                        variant="secondary"
                        text={t("RESULTS.actions.see_page")}
                        iconRight={
                            <Icon name={seePage ? "AMA-SetaCima3-Line" : "AMA-SetaBaixo3-Line"} />
                        }
                        onClick={openPageLinks}
                        aria-expanded={seePage}
                    />
                    {seePage && (
                        <u className="dropdown-content show_dropdown" aria-labelledby="dropdownMenuButton" >
                            <li>
                                <a href={seeCode}>
                                    <span className='me-2'>{t("RESULTS.actions.pagecode")}</span>
                                    <Icon name="AMA-Code-Line" />
                                </a>
                            </li>
                            <li>
                                <a href={href} rel="noreferrer">
                                    <span>{t("RESULTS.actions.open_webpage")}</span>
                                    <Icon name="AMA-Externo-Line" />
                                </a>
                            </li>
                        </u>
                    )}
                </div>

                <div>
                    <Button
                        size="md"
                        variant="secondary"
                        text={t("RESULTS.actions.download")}
                        iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
                        onClick={downloadCSV}
                        download="eval.csv"
                    />
                </div>
            </div>
        </div>

        <div className={`group_mobile gap-2 ${themeClass}`}>
            <Button
                size="md"
                variant="secondary"
                text={t("RESULTS.actions.re_evaluate")}
                iconRight={<Icon name="AMA-Reload-Line" />}
                onClick={() => reRequest()}
            />
            <div>
                <Button
                    id="dropdownMenuButton"
                    size="md"
                    variant="secondary"
                    text={t("RESULTS.actions.see_page")}
                    iconRight={
                        <Icon name={seePage ? "AMA-SetaCima3-Line" : "AMA-SetaBaixo3-Line"} />
                    }
                    onClick={openPageLinks}
                    aria-expanded={seePage}
                />
                {seePage && (
                    <u className="dropdown-content show_dropdown" aria-labelledby="dropdownMenuButton" >
                        <li>
                            <button onClick={() => seeCode()}>
                                <span>{t("RESULTS.actions.pagecode")}</span>
                                <Icon name="AMA-Code-Line" />
                            </button>
                        </li>
                        <li>
                            <a href={href} rel="noreferrer">
                                <span>{t("RESULTS.actions.open_webpage")}</span>
                                <Icon name="AMA-Externo-Line" />
                            </a>
                        </li>
                    </u>
                )}
            </div>

            <Button
                size="md"
                variant="secondary"
                text={t("RESULTS.actions.download")}
                iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
                onClick={downloadCSV}
                download="eval.csv"
            />
        </div>
    </>
  );
}
