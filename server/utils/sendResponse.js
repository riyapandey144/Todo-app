exports.sendResponse = (
  res,
  status = null,
  success = null,
  msg = undefined,
  todo = undefined
) => {
  res.json({
    status,
    success,
    msg,
    todo,
  });
};
