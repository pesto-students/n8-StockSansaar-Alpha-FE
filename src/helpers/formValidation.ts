export const setFormValidity = (event: any, setError: any) => {
  const form = event?.currentTarget?.form;
  console.log(form);
  setError(!form?.checkValidity());
};

export default {
  setFormValidity,
};
