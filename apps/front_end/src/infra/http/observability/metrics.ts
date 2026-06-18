export const metrics = {
  increment: (name: string) =>
    console.log("[METRIC]", name),

  timing: (name: string, ms: number) =>
    console.log("[METRIC TIME]", name, ms),
};