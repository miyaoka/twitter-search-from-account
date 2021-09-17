export const waitForSelectElement = <T extends Element>(
  selector: string
): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector<T>(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      }
      if (Date.now() - start > 3000) {
        clearInterval(interval);
        resolve(null);
      }
    }, 20);
  });
};
