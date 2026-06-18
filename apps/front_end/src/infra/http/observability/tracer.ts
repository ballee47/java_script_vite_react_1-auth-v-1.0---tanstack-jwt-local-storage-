export const tracer = {
  startSpan: (name: string) => {
    const start = Date.now();

    return {
      end: () => {
        console.log(`[TRACE] ${name}: ${Date.now() - start}ms`);
      },
    };
  },
};

export const API_VERSION = "v1";

export const withVersion = (url: string) =>
  `/api/${API_VERSION}${url}`;