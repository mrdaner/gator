import { readConfig } from "../config";
import { getUser } from "../lib/db/queries/users";
import { createFeed } from "../lib/db/queries/feeds";
import { Feed, User } from "../lib/db/schema";

export async function addfeed(cmdName: string, ...args: string[]) {
	if (args.length !== 2) {
	    throw new Error(`usage: ${cmdName} <name> <url>`);
	}
	const name = args[0];
	const url = args[1];
	const config = readConfig();
	const user = await getUser(config.currentUserName);
	if (!user) {
		throw new Error("user not found");
	}
	const feed = await createFeed(name, url, user.id);
	printFeed(feed, user);
};

function printFeed(feed: Feed, user: User) {
	console.log(`* Name: ${feed.name}`);	
	console.log(`* URL: ${feed.url}`);
	console.log(`* id: ${feed.id}`);	
	console.log(`* createdAt: ${feed.createdAt}`);
	console.log(`* name: ${ user.name}`);	
};
