"use client"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { api } from '@/lib/api';
import { CustomerDataInfo } from "../../page";

const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco sobre o seu problema...")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
    customer: CustomerDataInfo
}

export function FormTicket({ customer }: FormTicketProps) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data: FormData) {
        const response = await api.post("/api/ticket", {
            name: data.name,
            description: data.description,
            customerId: customer.id
        })
        
        setValue("name", "")
        setValue("description", "")
    }

    return (
        <form onSubmit={handleSubmit(handleRegisterTicket)} className='bg-slate-200 mt-6 px-4 py-6 rounded border-2 border-slate-300'>
            <label className='mb-1 font-medium text-lg'>Nome do chamado:</label>
            <Input name='name' type='text' register={register} error={errors.name?.message} placeholder='Digite o nome do chamado...' />

            <label className='mb-1 font-medium text-lg'>Descreva o problema:</label>
            <textarea className='w-full bg-white border-2 rounded-md h-24 resize-none border-slate-300 px-2' placeholder='Descreva seu problema...' id='description' {...register("description")}>
            </textarea>
            {errors.description?.message && <p className='text-red-500  mb-4'>{errors.description?.message}</p>}

            <button type='submit' className='bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold hover:bg-blue-600 cursor-pointer duration-300'>Cadastrar</button>
        </form>
    )
}