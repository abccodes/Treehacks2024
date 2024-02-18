import { v } from "convex/values";
import { mutation } from "./_generated/server";

// @DEV Warning this might not work as expected and might cause errors because hasnt been updated yet

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthenticated call to mutation");
    }
    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveStorageId = mutation({
  // You can customize these as you like
  args: {
    uploaded: v.object({
      storageId: v.id("_storage"),
    }),
    // other args...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...

    // Save the storageId to the database using `insert`
    ctx.db.insert("Entries", {
      storageId: args.uploaded.storageId,

      // ...
    });
  },
});
