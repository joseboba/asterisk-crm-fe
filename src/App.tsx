import {io} from 'socket.io-client';
import {Box, Button} from '@mui/material';
import {useState} from 'react';
import {DialogComponent} from './components/DialogComponent.tsx';

export interface UserEntity {
    phone?: string,
    email?: string,
    names?: string,
    lastnames?: string,
    birthdate?: string
}

const server = '192.168.1.48';

export const App = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userEntity, setUserEntity] = useState<UserEntity>({});
    const socket = io(`http://${server}:3000`);

    socket.on('on-id-message', (payload: UserEntity) => {
        setIsDialogOpen(true);
        setUserEntity(payload);
    });

    socket.on('close', () => {
        setIsDialogOpen(false);
        setUserEntity({});
    });

    const handleCall = async () => {
        await fetch(`http://${server}:3000/clients/call/1733`, { method: 'POST' });
    }

    return (
        <Box>
            <DialogComponent
                isOpen={isDialogOpen}
                user={userEntity}
            />
            <Button onClick={handleCall}>
                LLAMAR
            </Button>
        </Box>
    );
};
