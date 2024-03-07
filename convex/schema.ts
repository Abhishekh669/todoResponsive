import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  todos : defineTable({ text: v.string(), completed : v.boolean() }),
});