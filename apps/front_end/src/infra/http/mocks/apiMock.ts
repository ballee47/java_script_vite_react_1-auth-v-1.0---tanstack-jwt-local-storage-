export const apiMock = {
  enabled: true,

  async get<T>(mockData: T): Promise<T> {
    if (apiMock.enabled) {
      return new Promise((res) =>
        setTimeout(() => res(mockData), 500)
      );
    }

    throw new Error("Mock disabled");
  },
};