type Listener<T = unknown> = (payload: T) => void;

class EventBus {
  private listeners = new Map<string, Set<Listener>>();

  on(event: string, listener: Listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(listener);
  }

  off(event: string, listener: Listener) {
    this.listeners.get(event)?.delete(listener);
  }

  emit<T>(event: string, payload?: T) {
    this.listeners.get(event)?.forEach(listener => listener(payload));
  }

  clear() {
    this.listeners.clear();
  }
}

export default new EventBus();