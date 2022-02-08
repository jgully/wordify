import { GeneralError } from "./errors.js";

const handleErrors = (error, request, response, next) => {
  if (error instanceof GeneralError) {
    return response.status(error.getCode()).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: error.message
  });
}

export default handleErrors;