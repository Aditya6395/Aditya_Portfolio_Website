let toastId = 0;
let listeners = [];

export const toast = {
  success: (message, duration = 5000) => {
    const id = ++toastId;
    listeners.forEach(listener => listener({
      type: 'add',
      toast: { id, type: 'success', message, duration, autoClose: true }
    }));
    return id;
  },
  error: (message, duration = 5000) => {
    const id = ++toastId;
    listeners.forEach(listener => listener({
      type: 'add',
      toast: { id, type: 'error', message, duration, autoClose: true }
    }));
    return id;
  },
  info: (message, duration = 5000) => {
    const id = ++toastId;
    listeners.forEach(listener => listener({
      type: 'add',
      toast: { id, type: 'info', message, duration, autoClose: true }
    }));
    return id;
  },
  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }
};

