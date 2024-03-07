import { Id } from "@/convex/_generated/dataModel";

export interface TodoType{
    _id : Id<"todos">,
    text : string,
    completed  : boolean,
}