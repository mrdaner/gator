export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, Handler: CommandHandler) {
	registry[cmdName] = Handler;
};

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
	const handler = registry[cmdName]
	if (!handler) {
		throw new Error("Command isn't registered")
	}
	handler(cmdName, ...args)
}

