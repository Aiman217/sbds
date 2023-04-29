export default function AlertMsgHndl(
  successMsg,
  errorInput,
  setAlert,
  setSuccess,
  setRefresh
) {
  errorInput
    ? (setAlert(errorInput.message),
      setSuccess(false),
      setTimeout(() => {
        setAlert("");
        setSuccess(false);
      }, 4000))
    : (setAlert(successMsg),
      setSuccess(true),
      setRefresh(true),
      setTimeout(() => {
        setAlert("");
        setSuccess(false);
      }, 4000));

  return 0;
}
