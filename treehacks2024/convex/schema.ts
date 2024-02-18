import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Conditions: defineTable({
    Description: v.string(),
    Name: v.string(),
  }),
  Entries: defineTable({
    Notes: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
  }),
  Patients: defineTable({
    FirstName: v.string(),
    LastName: v.string(),
    PhysicianPhoneNumber: v.string(),
    Entries: v.optional(v.array(v.string())),
  }),
});
