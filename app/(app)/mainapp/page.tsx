"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoData from "@/components/TodoData";
import { api } from "@/convex/_generated/api";
import AppLayout from "./AuthLayout";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router"; // Correct import path
import { TodoType } from "@/types/type";

const page = () => {
    const [text, setText] = useState(""); // Define text state
    const [data, setData] = useState({
        text: "",
        completed: false // Corrected property name
    });

    const createTodo = useMutation(api.todos.createTodo);
    const todos = useQuery(api.todos.get);

    const handleClick = () => {
        if (data.text) {
            createTodo({
                text: data.text, // Corrected property access
                completed: data.completed // Corrected property access
            });
        }
        setData({...data, text: ""}); // Clear text after creating todo
    };
        console.log("this is data",data)
    return (
        <AppLayout>
            <div className="w-auto   flex flex-col items-center">
                <div className=" w-full md:w-[50%] lg:w-[40%] flex justify-center my-4 p-4 lg:p-5 border-b-2 border-red-600">
                    <Input type="text" className="border  border-red-600 mx-1" value={data.text} onChange={(e) => setData({...data, text: e.target.value})} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleClick();
                            setData({...data, text: ""}); // Clear text after creating todo
                        }
                    }}  />
                    <Button className="border border-red-600 mx-1 lg:text-[20px] lg:p-4 text-red-600 hover:text-white active:text-green-600" onClick={handleClick}>create</Button>
                </div>
                <div className="text-[20px] md:text-[25px] border-b-2 w-auto px-2 text-center py-1 font-semibold mb-4 border-red-600 text-red-600">Your Todo Works :</div>
                <div className={cn(
                    "  lg:w-[40%] lg:my-4 rounded-md my-2 max-h-[35rem] overflow-y-scroll no-scrollbar",
                    todos && todos.length > 0 ? "border-2 border-red-600" : "border-none"
                )}>
                    {todos?.map((todo) => (
                        <div key={todo._id}>
                            <TodoData todo={todo} />
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default page;
