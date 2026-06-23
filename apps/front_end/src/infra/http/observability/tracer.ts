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

