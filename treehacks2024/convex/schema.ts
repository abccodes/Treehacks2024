import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Conditions: defineTable({
    Description: v.string(),
    Name: v.string(),
  }),
  Entries: defineTable({
    ConditionID: v.id("Conditions"),
    DateLogged: v.object({Date : v.string()}),
    Notes: v.string(),
    PatientID: v.id("Patients"),
  }),
  Patients: defineTable({
    Birthday: v.object({Date : v.string()}),
    FirstName: v.string(),
    LastName: v.string(),
    PhoneNumber: v.string(),
  }),
  Photos: defineTable({
    Description: v.string(),
    EntryID: v.id("Entries"),
    PhotoDate: v.object({Date : v.string()}),
    PhotoPath: v.string(),
  }),
});
