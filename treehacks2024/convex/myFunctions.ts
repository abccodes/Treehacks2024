import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// You can read data from the database via a query:
export const readJournalEntries = query({
  // Validators for arguments.
  args: {
    ConditionID: v.id("Conditions"),
    DateLogged: v.object({Date : v.string()}),
    Notes: v.string(),
    PatientID: v.id("Patients"),
  },

  // Query implementation.
  handler: async (ctx, args) => {
  const entries = await ctx.db
    .query("Entries")
    .filter((q) => q.eq(q.field("PatientID"), args.PatientID))
    .order("desc") // Order by _creationTime, return most recent
    .collect();

  return {
    viewer: (await ctx.auth.getUserIdentity())?.name,
    entries: entries.toReversed().map((entry) => entry.Notes),
  };
},
});

// You can write data to the database via a mutation:
export const addPatient = mutation({
  // Validators for arguments.
  args: {
    Birthday: v.object({Date : v.string()}),
    FirstName: v.string(),
    LastName: v.string(),
    PhysicianPhoneNumber: v.string(),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const id = await ctx.db.insert("Patients", args);

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

// You can write data to the database via a mutation:
export const addJournalEntry = mutation({
  // Validators for arguments.
  args: {
    ConditionID: v.id("Conditions"),
    DateLogged: v.object({Date : v.string()}),
    Notes: v.string(),
    PatientID: v.id("Patients"),
  },

  // Mutation implementation.
  handler: async (ctx, args) => {
    //// Insert or modify documents in the database here.
    //// Mutations can also read from the database like queries.
    //// See https://docs.convex.dev/database/writing-data.

    const id = await ctx.db.insert("Entries", args);

    console.log("Added new document with id:", id);
    // Optionally, return a value from your mutation.
    // return id;
  },
});

export const getFileURL = query({
  args: {},
  handler: async (ctx) => {
    const files = await ctx.db.query("Photos").collect();
    return Promise.all(
      files.map(async (files) => ({
        ...files,
        ...ctx.storage.getUrl(files.storageId),
      }))
    );
  },
});

/*
COMMENTED OUT BECAUSE WE DO NOT SEND DATA TO THIRD PARTY APIS
BUT DO NOT DELETE BECAUSE IT IS A GOOD EXAMPLE

COMMENTED OUT BECAUSE WE DO NOT SEND DATA TO THIRD PARTY APIS
BUT DO NOT DELETE BECAUSE IT IS A GOOD EXAMPLE

COMMENTED OUT BECAUSE WE DO NOT SEND DATA TO THIRD PARTY APIS
BUT DO NOT DELETE BECAUSE IT IS A GOOD EXAMPLE

COMMENTED OUT BECAUSE WE DO NOT SEND DATA TO THIRD PARTY APIS
BUT DO NOT DELETE BECAUSE IT IS A GOOD EXAMPLE
// You can fetch data from and send data to third-party APIs via an action:
export const myAction = action({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Action implementation.
  handler: async (ctx, args) => {
    //// Use the browser-like `fetch` API to send HTTP requests.
    //// See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
    // const response = await ctx.fetch("https://api.thirdpartyservice.com");
    // const data = await response.json();

    //// Query data by running Convex queries.
    const data = await ctx.runQuery(api.myFunctions.listNumbers, {
      count: 10,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.myFunctions.addNumber, {
      value: args.first,
    });
  },
});
*/
