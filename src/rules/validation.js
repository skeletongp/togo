import travelRules from "./travelRules";

const rules = {
  travel: travelRules,
};

const validate = (form, ruleData) => {
  const errorMessages = {};

  const rulesToValidate = rules[ruleData];
  Object.keys(rulesToValidate).forEach((field) => {
    const rules = rulesToValidate[field];
    const value = form[field];
    rules.forEach((rule) => {
      const isValid = rule(value);
      if (isValid !== true && typeof isValid === "string") {
        if (!errorMessages[field]) {
          errorMessages[field] = isValid;
        }
      }
    });
  });
  if (Object.keys(errorMessages).length > 0) {
    return errorMessages;
  } else {
    return true;
  }
};

export default validate;
