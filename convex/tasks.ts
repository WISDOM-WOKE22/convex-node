import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      title: args.title,
      isCompleted: args.isCompleted,
    });
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});