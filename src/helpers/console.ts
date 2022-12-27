export function onConsole(color: string, text: any, value: any) {
  const style = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
  };

  const setColor: string | undefined = Object.keys(style).find((key: string) => key === color);
  //@ts-ignore
  console.log(`${style[setColor]}%s`, `${text} + ${value}`);
}
