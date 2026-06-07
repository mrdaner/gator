import { readConfig } from "src/config";
import { getUser } from "../lib/db/queries/users";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/feed-follows";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }

  const config = readConfig();
  const user = await getUser(config.currentUserName);

  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const url = args[0];

  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`Feed not found: ${url}`);
  }

  const feedFollow = await createFeedFollow(user.id, feed.id);
  if (!feedFollow) {
    throw new Error("Failed to follow feed");
  }

  console.log(
    `The ${feedFollow.feedName} is followed by ${feedFollow.userName} successfully`,
  );
}
