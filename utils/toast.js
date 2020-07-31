import { toast as _toast } from "react-toastify";

export const toast = {
  success: (msg) => {
    _toast.success(msg, {
      position: `top-right`,
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })
  },
  error: (msg) => {
    _toast.error(msg, {
      position: `top-right`,
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }
}