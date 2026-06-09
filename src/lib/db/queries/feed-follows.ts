import { eq, and } from "drizzle-orm";
import { db } from "../index";
import { feedFollows, feeds, users } from "../schema";

export async function createFeedFollow(userId: string, feedId: string) {
	const [newFeedFollow] = await db
		.insert(feedFollows)
		.values({
			userId: userId,
			feedId: feedId,
		})
		.returning();

	const [result] = await db
		.select({
			id: feedFollows.id,
			createdAt: feedFollows.createdAt,
			updatedAt: feedFollows.updatedAt,
			userId: feedFollows.userId,
			feedId: feedFollows.feedId,
			feedName: feeds.name,
			userName: users.name,
		})
		.from(feedFollows)
		.innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
		.innerJoin(users, eq(feedFollows.userId, users.id))
		.where(eq(feedFollows.id, newFeedFollow.id));
	
	return result;
}

export async function getFeedFollowsForUser(userId: string) {
	const result = await db
		.select({
			id: feedFollows.id,
			createdAt: feedFollows.createdAt,
			updatedAt: feedFollows.updatedAt,
			userId: feedFollows.userId,
			feedId: feedFollows.feedId,
			feedName: feeds.name,
			userName: users.name,
		})
		.from(feedFollows)
		.innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
		.innerJoin(users, eq(feedFollows.userId, users.id))
		.where(eq(feedFollows.userId, userId));

	return result;
}

export async function deleteFeedFollow(feedId: string, userId: string) {
  const [result] = await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.feedId, feedId), eq(feedFollows.userId, userId)))
    .returning();

  return result;
}

