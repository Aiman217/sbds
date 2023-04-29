export default function AlertMsgHndl(
  successMsg,
  failMsg,
  errorInput,
  setAlert,
  setSuccess,
  setRefresh,
  timeout
) {
  errorInput
    ? (setAlert(failMsg),
      setSuccess(false),
      setTimeout(() => {
        setAlert("");
        setSuccess(false);
      }, timeout))
    : (setAlert(successMsg),
      setSuccess(true),
      setRefresh(true),
      setTimeout(() => {
        setAlert("");
        setSuccess(false);
      }, 4000));

  return 0;
}
