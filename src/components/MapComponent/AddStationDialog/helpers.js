export const isStepOptional = (step) => {
  return step === 1;
};

export const isStepSkipped = (skipped, step) => {
  return skipped.has(step);
};

const isPositiveInteger = (str) => {
  if (typeof str !== 'string') {
    return false;
  }
  const num = Number(str);
  return Number.isInteger(num) && num > 0;
};

export const isNotValidPrice = (price) => {
  return (
    ((price.diesel === '' || price.octane95 === '' || price.electric === '') &&
      !isPositiveInteger(price.diesel)) ||
    !isPositiveInteger(price.octane95) ||
    !isPositiveInteger(price.electric)
  );
};
