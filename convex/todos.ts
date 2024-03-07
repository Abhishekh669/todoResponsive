import { v } from "convex/values"
import {mutation, query} from"./_generated/server"
import exp from "constants"

export const createTodo = mutation({
    args : {
        text : v.string(), 
        completed : v.boolean(),
    },
    handler : async (ctx, args) =>{
        await ctx.db.insert("todos",{
            text : args.text,
            completed : false
        })
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("todos").order("desc").collect();
    },
  });

  export const remove= mutation({
    args : { id : v.id("todos")},
    handler : async(ctx, args) =>{
        await ctx.db.delete(args.id) 
    }

  })
  

  export const updatetodo = mutation({
    args : { id : v.id("todos"), text : v.string()}, 
    handler : async (ctx, args) =>{
        await ctx.db.patch(args.id, {text : args.text})
    }
  })
  export const updateCompleted = mutation({
    args : {
      id : v.id("todos"),
      completed : v.boolean(),
    },
    handler : async (ctx, args) =>{
      await ctx.db.patch(args.id, {completed : args.completed});
    } 
  })
  