import toast from "react-hot-toast";

export function notify(promise) {
    promise.catch(error => {
      toast.error(`Ops! ${error.toString()}`);
    });
}