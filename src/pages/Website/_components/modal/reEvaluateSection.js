
// Hooks
import { useContext } from "react";
import { useTranslation } from "react-i18next";

// Dark / Light Theme Context
import { ThemeContext } from "../../../../context/ThemeContext";

import { Button, Icon, LoadingComponent } from "ama-design-system";

export function ReEvaluateSection({closeModal, loading, error}) {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="modal_container d-flex flex-column p-4">
        <div className="d-flex flex-row justify-content-between mb-3 align-items-center">
          <h2>{t("PAGES.re_evaluate")}</h2>
          <Button
            darkTheme={theme}
            variant={"secondary"}
            className={"close_modal"}
            aria-label={t(`ADD_PAGES.evaluations_dialog.close`)}
            text={t(`ADD_PAGES.evaluations_dialog.close`)}
            onClick={() => closeModal()}
            size={"lg"}
            iconRight={<Icon name="AMA-Erro2-Line" />}
          />
        </div>
        {!loading ? <p className="ama-typography-body-large">{!error ? t("ADD_PAGES.evaluations_dialog.message") : error}</p> : <LoadingComponent darkTheme={theme} loadingText={t("MISC.loading")} />}
    </div>
  );
}
