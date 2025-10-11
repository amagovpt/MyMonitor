// Hooks
import { useTranslation } from "react-i18next";
import { Button } from "ama-design-system";

export function SuccessfulUploadExtensionEvaluationDialog({ close }) {
  const { t } = useTranslation();

  return (
    <div className="modal_container d-flex flex-column p-4 modal_dialog">
      <h1 class="mat-display-1" mat-dialog-title>{t("UPLOAD_EXTENSION_EVALUATION.DIALOG.title")}</h1>
      <p>{t("UPLOAD_EXTENSION_EVALUATION.DIALOG.message")}</p>
      <Button className={"modal_button"} variant={"danger"} onClick={() => close()} text={t("UPLOAD_EXTENSION_EVALUATION.DIALOG.close")} />
    </div>
  );
}
