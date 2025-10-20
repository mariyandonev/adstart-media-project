import type { FormData } from '../../../context/FormContext';

export const formatFormData = (rawData: FormData) => {
  return {
    step1: {
      name: rawData.step1.name.value,
      email: rawData.step1.email.value,
      phoneNumber: rawData.step1.phoneNumber.value,
      company: rawData.step1.company.value,
    },
    step2: {
      choices: rawData.step2.choices,
      other: rawData.step2.other?.value,
    },
    step3: {
      budget: rawData.step3.budget,
    }
  };
}
