import { setUser } from "../config.js"

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error("no user provided")
  }
  setUser(args[0]);
  console.log(`the user has been set`);
}
