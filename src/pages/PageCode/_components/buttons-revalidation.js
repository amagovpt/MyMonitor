/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon } from 'ama-design-system'
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./styles.css";

export function ButtonsActions({downloadCSV, handleGoBack, themeClass}) {
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
                text={t("RESULTS.actions.back")}
                iconLeft={<Icon name="AMA-SetacurtaoficialEsq-Line" />}
                onClick={handleGoBack}
            />
            <Button
                size="md"
                variant="secondary"
                text={t("RESULTS.actions.download")}
                iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
                onClick={downloadCSV}
                download="eval.csv"
            />
        </div>

        <div className={`group_mobile gap-2 ${themeClass}`}>
            <Button
                size="md"
                variant="secondary"
                text={t("RESULTS.actions.back")}
                iconLeft={<Icon name="AMA-SetacurtaoficialEsq-Line" />}
                onClick={handleGoBack}
            />
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
