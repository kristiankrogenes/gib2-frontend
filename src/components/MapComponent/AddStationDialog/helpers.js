export const isStepOptional = (step) => {
  return step === 1;
};

export const isStepSkipped = (skipped, step) => {
  return skipped.has(step);
};
