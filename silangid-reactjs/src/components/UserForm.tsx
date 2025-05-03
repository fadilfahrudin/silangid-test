import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useMemo } from 'react'
import { useModal } from '../context/ModalContext'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserContext } from "../context/UserContext"
import { UserType } from "../type/userType"
import axiosWithAuth from "@/lib/axios"
import toast from "react-hot-toast"

const createSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

const editSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email: z.string().email("Please enter a valid email address."),
});

type SubmitHandler<T> = (data: T) => void;

const UserForm = () => {
    const { isOpen, setIsOpen, modalType } = useModal()
    const { users, setUsers, userId } = useUserContext()

    const isCreate = modalType === "create"
    const schema = isCreate ? createSchema : editSchema

    const userData = useMemo(() => {
        return users.find((user: UserType) => user.id === userId)
    }, [users, userId])

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: isCreate
            ? { name: "", email: "", password: "", confirmPassword: "" }
            : { name: "", email: "" },
    })

    useEffect(() => {
        if (!isCreate && userData) {
            form.reset({
                name: userData.name,
                email: userData.email,
                created_at: userData.created_at
            } as z.infer<typeof editSchema>)
        } else if (isCreate) {
            form.reset({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            } as z.infer<typeof createSchema>)
        }
    }, [userData, form, isCreate, isOpen])

    const onSubmit = async (values: z.infer<typeof createSchema> | z.infer<typeof editSchema>) => {
        
        try {
            if (modalType === "edit") {
                // Gabungkan data lama (termasuk created_at) dengan data yang diubah
                const updatedValues = {
                    ...userData, // Menambahkan data lama (seperti created_at, updated_at)
                    ...values,   // Menimpa dengan data baru dari form
                };
    
                // Pastikan semua data (termasuk created_at, updated_at) ada di body request
                const res = await axiosWithAuth.put(`/user/${userId}`, updatedValues);
                if (!res.data) throw new Error("Failed to update user");
    
                // Update state users
                const updatedUser: UserType = { id: userId, ...updatedValues, created_at: userData?.created_at || "" };
                setUsers(prev => prev.map(user => user.id === userId ? {...updatedUser} : user));
    
                toast.success("User berhasil diupdate");
            } else {
                const res = await axiosWithAuth.post("/user", values);
                if (!res.data) throw new Error("Failed to create user");
    
                const newUser: UserType = res.data.data;
                setUsers(prev => [...prev, newUser]);
                toast.success("User berhasil dibuat");
            }
    
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    if (!isOpen) return null;

    return (
        <div className='w-full h-screen fixed left-0 top-0 backdrop-blur-sm bg-black/50 flex justify-center items-center z-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<z.infer<typeof createSchema> | z.infer<typeof editSchema>>)} className="space-y-8 bg-white p-8 w-1/4 rounded-md">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl><Input placeholder="Nama" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl><Input type="email" placeholder="Email" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {modalType === "create" && (
                        <>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="Password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="Confirm Password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default UserForm;
