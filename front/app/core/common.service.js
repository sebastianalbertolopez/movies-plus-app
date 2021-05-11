export default function navigationService(ngNotify) {
  const service = {
    error: (message) => {
      ngNotify.set(message, {
        theme: 'pure',
        position: 'top',
        duration: 5000,
        type: 'error',
        sticky: false,
        button: false,
        html: false
      });
    },
    info: (message) => {
      ngNotify.set(message, {
        theme: 'pure',
        position: 'top',
        duration: 5000,
        type: 'info',
        sticky: false,
        button: false,
        html: false
      });
    },
    success: (message) => {
      ngNotify.set(message, {
        theme: 'pure',
        position: 'top',
        duration: 5000,
        type: 'success',
        sticky: false,
        button: false,
        html: false
      });
    }
  };

  return service;
}

navigationService.$inject = ['ngNotify'];
