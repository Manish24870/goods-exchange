import { toast } from "react-toastify";

const createToast = (message, type = "default") => {
    toast.dismiss();
    toast.clearWaitingQueue();

    // Wrong login credentials error
    if (type === "invalid-login-error") {
        toast.error(message);
    } else if (type === "success") {
        toast.success(message);
    } else if (type === "error") {
        toast.error(message);
    } else if (type === "default") {
        toast(message);
    }
};

export default createToast;
