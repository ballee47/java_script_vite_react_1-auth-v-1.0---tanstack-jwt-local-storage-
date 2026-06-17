type RetryItem = {
  resolve: () => void;
  reject: (err: unknown) => void;
};

let queue: RetryItem[] = [];

export function addToQueue(item: RetryItem) {
  queue.push(item);
}

export function resolveQueue() {
  queue.forEach((q) => q.resolve());
  queue = [];
}

export function rejectQueue(err: unknown) {
  queue.forEach((q) => q.reject(err));
  queue = [];
}