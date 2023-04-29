export default function AlertMsgHndl(
  successMsg,
  failMsg,
  errorInput,
  setAlert,
  setSuccess,
  setRefresh
) {
  errorInput
    ? (setAlert(failMsg),
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
