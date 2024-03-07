import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { use, useState } from 'react'
import { TodoType } from '@/types/type'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { LiaEditSolid, LiaSaveSolid} from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
interface TodoDataProps {
    todo: TodoType;
}


function TodoData({ todo }: TodoDataProps) {
    const [data, setData] = useState<TodoType>(todo)
    const [editable, setEditable] = useState<Boolean>(false);
    const deleteTodo = useMutation(api.todos.remove)
    const updateTodo = useMutation(api.todos.updatetodo)
    const updateComplete = useMutation(api.todos.updateCompleted);
    const [iscompleted, setIsCompleted] = useState(data.completed);
    const handleChange = (varName: string, newText: string) => {
        setData({ ...data, [varName]: newText })
    }
    const deleteData = () => {
        deleteTodo({
            id: data._id
        })

    }

    const saveData = () => {

       if(data.text.length > 0){
        updateTodo({
            id: data._id,
            text: data.text,
        })
       }
        setEditable(!editable)

    }
    const toggleComplete =  async() =>{
      await  updateComplete({
           id : data._id,
           completed : !iscompleted


        })
        setIsCompleted(!iscompleted);
    }

 
    // console.log("this is data", data._id)
    return (
       <>
             <div className='flex my-2 mx-[0.27rem] gap-1 lg:gap-4 lg:px-4 py-2 md:my-3 md:mx-2  md:p-2  border-b-2 border-red-500 '>
            <Input type='checkbox' className='lg:w-[3%] lg:mx-1' checked={iscompleted} onChange={
                toggleComplete
            }/>
            <Input
                value={data.text}
                placeholder='enter your task'
                className={`w-auto lg:w-full text-[19px] placeholder:px-1 lg:placeholder:px-3 lg:text-[20px] ${iscompleted ? "  decoration-red-600  line-through" : ""} border-none active:border-none active:outline-none bg-green-300 outline-none focus:outline-none focus:ring-0   ${editable ? "  bg-white outline-none border-2 border-blue-600 " : "  border-transparent "}`}
                readOnly={!editable}
                onChange={(e) => {
                 
               
                    handleChange("text", e.target.value)

                }}
                onKeyDown={(e) =>{
                    if(e.key ==="Enter"){
                        saveData();
                    }
                }}
            />

            <Button className='  border-red-600 text-[25px] lg:mx-2 bg-white text-black hover:text-white' onClick={() => {
                if(iscompleted){
                   
                    return 
                } 
                if (editable) {
                    saveData();
                }
                else {
                    setEditable((prev) => !prev)
                }
            }}>
                {editable ? <LiaSaveSolid  /> : <LiaEditSolid />}
            </Button>
            <Button
                variant={"secondary"}
                onClick={() => { deleteData() }}
                className='border-2 border-black-500 bg-red-500 text-[23px]'
            >
                {<MdDelete/>}
            </Button>
        </div>
       </>
    )
}

export default TodoData
