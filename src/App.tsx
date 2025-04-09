import {io} from 'socket.io-client';
import {Box} from '@mui/material';
import {useState} from 'react';
import {DialogComponent} from './components/DialogComponent.tsx';

export interface UserEntity {
    phone?: string,
    prepaidCardNumber?: string,
    email?: string,
}

export const App = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userEntity, setUserEntity] = useState<UserEntity>({});
    const socket = io('http://localhost:3000');

    socket.on('on-id-message', (payload: UserEntity) => {
        setIsDialogOpen(true);
        setUserEntity(payload);
    });

    socket.on('close', () => {
        setIsDialogOpen(false);
        setUserEntity({});
    });

    return (
        <Box>
            <DialogComponent
                isOpen={isDialogOpen}
                user={userEntity}
            />
        </Box>
    );
};
