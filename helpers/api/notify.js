import toast from "react-hot-toast";

export function Notify(promise) {
    return toast.promise(promise, {
          loading: 'Loading',
          success: (response) => response.message,
          error: (err) => `Ops! ${err.toString()}`,
        },
        {
          style: {
            minWidth: '250px',
          }
        }
    );
}