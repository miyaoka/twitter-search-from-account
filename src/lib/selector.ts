export const selectElement = <T extends Element>(
  selector: string,
  timeout: number = 3000
): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector<T>(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      }
      if (Date.now() - start > timeout) {
        clearInterval(interval);
        resolve(null);
      }
    }, 20);
  });
};
