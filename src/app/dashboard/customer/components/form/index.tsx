"use client"

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input';
import { api } from '@/lib/api';
import { useRouter } from "next/navigation";


const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório!"),
    email: z.email("Digite um email válido").min(1, "O email é obrigatório!"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O número de telefone deve estar (DD) 940028922"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterCustomer(data: FormData){
        await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            userId: userId
        })

        router.refresh();
        router.replace("/dashboard/customer")
    }

    return (
        <form onSubmit={handleSubmit(handleRegisterCustomer)} className='flex flex-col mt-6'>
            <label className='mb-1 text-lg font-medium'>Nome Completo: </label>
            <Input type='text' name="name" placeholder='Digite o nome completo' error={errors.name?.message} register={register} />

            <section className='flex gap-2 my-2 flex-col sm:flex-row'>
                <div className='flex-1'>
                    <label className='mb-1 text-lg font-medium'>Telefone: </label>
                    <Input type='text' name="phone" placeholder='Ex: (DD) 40028922' error={errors.phone?.message} register={register} />
                </div>

                <div className='flex-1'>
                    <label className='mb-1 text-lg font-medium'>Email: </label>
                    <Input type='text' name="email" placeholder='Digite o email..' error={errors.email?.message} register={register} />
                </div>
            </section>
            <label className='mb-1 text-lg font-medium'>Endereço completo: </label>
            <Input type='text' name="address" placeholder='Digite o endereço do cliente...' error={errors.address?.message} register={register} />
            <button className='bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold cursor-pointer hover:bg-blue-600 duration-300' type='submit'>Cadastrar</button>



        </form>
    )
}