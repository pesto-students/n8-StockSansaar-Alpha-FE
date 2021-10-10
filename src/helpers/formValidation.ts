export const setFormValidity = (event: any, setError: any) => {
    const form = event?.currentTarget?.form;
    setError(!form?.checkValidity());
  };

  export default {
      setFormValidity,
  }