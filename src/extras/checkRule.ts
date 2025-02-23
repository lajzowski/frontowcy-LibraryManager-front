export const checkRule = (rule: string, userRules: string): boolean => {
  if (!userRules) {
    return false;
  }

  return userRules.indexOf(rule) !== -1;
};
