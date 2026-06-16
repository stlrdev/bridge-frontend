import { toast as sonnerToast } from "sonner";

export interface ToastOptions {
  duration?: number;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  dismissible?: boolean;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, options);
  },
  
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, options);
  },
  
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, options);
  },
  
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, options);
  },
  
  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options);
  },
  
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },
  
  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  }
};

export default toast;
