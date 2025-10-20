export function validateForm(data) {
  const errors = {};

  if (!data?.step1?.name) errors.name = 'Name is required';
  if (!data?.step1?.email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;;
    if (!emailRegex.test(data.step1.email)) errors.email = 'Invalid email format';
  }

  if (!data?.step2?.choices?.length && !data?.step2?.other) {
    errors.choices = "Please select a service or enter 'Other'";
  }

  return Object.keys(errors).length ? errors : null;
}
