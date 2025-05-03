import { Button } from '@/components/ui/button'
import UserForm from '@/components/UserForm'
import UserTable from '@/components/UserTable'
import { AuthContext } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import { CirclePlus, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const {setIsOpen, setModalType} = useModal();

    const handleLogout = () => {
        auth?.logout();
        navigate("/login");
    };

    const handleCreateButton = () => {
        setIsOpen(true);
        setModalType('create');
    }

    return (
        <>
            <h1 className='text-center mt-16'>Welcome to Dashboard</h1>
            <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
                <div className='flex items-center gap-2'>
                    {auth?.user && <h2 className='text-2xl'>{auth.user.name}</h2>}
                    <Button variant={'ghost'} className='cursor-pointer transition-all' onClick={handleLogout}><LogOut />Log Out</Button>
                </div>
                <div className='w-1/2 mt-16'>
                    <Button onClick={handleCreateButton} variant={"outline"} className='cursor-pointer self-start'>Create <CirclePlus /></Button>
                    <UserTable />
                </div>
            </div>
            <UserForm />
        </>
    )
}

export default Dashboard