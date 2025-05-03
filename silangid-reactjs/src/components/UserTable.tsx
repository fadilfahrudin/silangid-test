import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { UserType } from '@/type/userType'

import { Pencil, Trash2 } from "lucide-react"
import { useUserContext } from '../context/UserContext'
import { useModal } from '../context/ModalContext'
import { formateDate } from '@/lib/formateDate'
import axiosWithAuth from '@/lib/axios'
import toast from 'react-hot-toast'

const UserTable = () => {

    const { users, setUserId, setUsers } = useUserContext()
    const { setIsOpen, setModalType } = useModal()

    const onEdit = (userId: number) => {
        setIsOpen(true)
        setUserId(userId)
        setModalType('edit')
    }

    const onDelete = async (userId: number) => {
        toast((t) => (
            <div>
                <p className="text-sm mb-4">Yakin ingin menghapus user ini?</p>
                <div className="flex justify-end gap-2 *:cursor-pointer">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100"
                    >
                        Batal
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                await axiosWithAuth.delete(`/user/${userId}`);
                                setUsers((prevUsers) =>
                                    prevUsers.filter((user) => user.id !== userId)
                                );
                                toast.dismiss(t.id);
                                toast.success("User berhasil dihapus");
                            } catch (err) {
                                console.error(err);
                                toast.dismiss(t.id);
                                toast.error("Gagal menghapus user");
                            }
                        }}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        ));
    }

    return (
        <Table>
            <TableCaption>A list of users data.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    users.map((user: UserType) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{formateDate(user.created_at as string)}</TableCell>
                            <TableCell className='flex'>
                                <Button className='cursor-pointer' onClick={() => onEdit(user.id)} variant="ghost">
                                    <Pencil />
                                </Button>
                                <Button className='cursor-pointer' onClick={() => onDelete(user.id)} variant="ghost">
                                    <Trash2 className='text-red-600' />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default UserTable