const isDev = process.env.NODE_ENV === 'development';
const allowedMethods = ['log', 'error', 'warn', 'info'];

const handler = {
  get(obj: unknown, prop: string) {
    const __GLOBAL__: any = global || window;
    const __CONSOLE__: any = __GLOBAL__.console;

    if (
      allowedMethods.includes(prop)
      && isDev
      && 'console' in __GLOBAL__
      && prop in __CONSOLE__
    ) {
      return __CONSOLE__[prop];
    }

    return () => {
      // do nothing;
    };
  }
};

const logger: any = new Proxy({}, handler);

export { logger };
