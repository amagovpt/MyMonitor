export function validateManualEvaluation(t, fileData, checklist, url) {
  switch (checklist) {
    case t("UPLOAD_MANUAL_EVALUATION.content_aspects_checklist"):
      return validateContentAspectsEvaluation(t, fileData, url);
    case t("UPLOAD_MANUAL_EVALUATION.functional_aspects_checklist"):
      return validateFunctionalAspectsEvaluation(t, fileData, url);
    case t("UPLOAD_MANUAL_EVALUATION.transactional_aspects_checklist"):
      return validateTransactionalAspectsEvaluation(t, fileData, url);
    default:
      return { invalid: "invalid", cleanedEvaluation: {} };  
  }
}

function validateTransactionalAspectsTests(tests) {
  tests.map((test, idx) => {
    switch (idx) {
      case 0:
        if (test.tests.length !== 3)
          return false;
        break;
      case 1:
      case 3:
        if (test.tests.length !== 4)
          return false;
        break;
      case 2:
        if (test.tests.length !== 2)
          return false;
        break;
      default:
        return false;
    }
  });

  return true;
}

function validateTransactionalAspectsEvaluation(t, fileData, url) {
  let invalid = "";
  const formData = fileData.formData;
  const tests = Object.values(fileData.tests)[0];

  const size = Object.keys(fileData).length;
  const formDataSize = Object.keys(formData).length;

  if (size !== 3 || formDataSize !== 44 || !validateTransactionalAspectsTests(tests)) {
    return { invalid: t("UPLOAD_MANUAL_EVALUATION.FILE_ERROR.transactional_aspects_checklist"), cleanedEvaluation: {} };
  }

  if (formData['site-url'] != url) {
    return { invalid: t("UPLOAD_MANUAL_EVALUATION.FILE_ERROR.invalid_url"), cleanedEvaluation: {} };
  }

  const cleanedEvaluation = JSON.parse(JSON.stringify(fileData));
  console.log(cleanedEvaluation);
  return { invalid, cleanedEvaluation };
}

function validateFunctionalAspectsTests(tests) {
  tests.map((test, idx) => {
    switch (idx) {
      case 0:
      case 3:
      case 4:
        if (test.tests.length !== 3)
          return false;
        break;
      case 1:
      case 2:
      case 5:
      case 6:
        if (test.tests.length !== 2)
          return false;
        break;
      case 7:
        if (test.tests.length !== 5)
          return false;
        break;
      case 8:
        if (test.tests.length !== 4)
          return false;
        break;
      case 9:
        if (test.tests.length !== 1)
          return false;
        break;
      default:
        return false;
    }
  });

  return true;
}

function validateFunctionalAspectsEvaluation(t, fileData, url) {
  let invalid = "";
  const formData = fileData.formData;
  const tests = Object.values(fileData.tests)[0];

  const size = Object.keys(fileData).length;
  const formDataSize = Object.keys(formData).length;

  if (size !== 3 || formDataSize !== 86 || !validateFunctionalAspectsTests(tests)) {
    return { invalid: t("UPLOAD_MANUAL_EVALUATION.FILE_ERROR.functional_aspects_checklist"), cleanedEvaluation: {} };
  }

  if (formData['site-url'] != url) {
    return { invalid: t("UPLOAD_MANUAL_EVALUATION.FILE_ERROR.invalid_url"), cleanedEvaluation: {} };
  }

  const cleanedEvaluation = JSON.parse(JSON.stringify(fileData));
  console.log(cleanedEvaluation);
  return { invalid, cleanedEvaluation };
}

function validateContentAspectsTests(tests) {
  tests.map((test, idx) => {
    switch (idx) {
      case 0:
      case 1:
      case 4:
        if (test.tests.length !== 4)
          return false;
        break;
      case 2:
        if (test.tests.length !== 3)
          return false;
        break;
      case 3:
        if (test.tests.length !== 2)
          return false;
        break;
      default:
        return false;
    }
  });

  return true;
}

function validateContentAspectsEvaluation(t, fileData, url) {
  let invalid = "";
  const formData = fileData.formData;
  const tests = Object.values(fileData.tests)[0];

  const size = Object.keys(fileData).length;
  const formDataSize = Object.keys(formData).length;

  if (size !== 3 || formDataSize !== 56 || !validateContentAspectsTests(tests)) {
    return { invalid: t("UPLOAD_MANUAL_EVALUATION.FILE_ERROR.content_aspects_checklist"), cleanedEvaluation: {} };
  }

  if (formData['site-url'] != url) {
    return { invalid: t("UPLOAD_MANUAL_EVALUATION.FILE_ERROR.invalid_url"), cleanedEvaluation: {} };
  }

  const cleanedEvaluation = JSON.parse(JSON.stringify(fileData));
  console.log(cleanedEvaluation);
  return { invalid, cleanedEvaluation };
}