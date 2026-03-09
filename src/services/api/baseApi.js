export const simulateRequest = (data, delay = 400) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
