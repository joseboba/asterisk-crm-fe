import {io} from 'socket.io-client';
import {Box, Card, CardContent, Chip, Grid, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {DialogComponent} from './components/DialogComponent.tsx';

export interface UserEntity {
    phone?: string,
    email?: string,
    names?: string,
    lastnames?: string,
    birthdate?: string,
    prepaidCardNumber?: string,
}

const baseUrl = 'http://192.168.1.48:3000';

export const App = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [needCall, setNeedCall] = useState(false);
    const [userEntity, setUserEntity] = useState<UserEntity>({});
    const [dataList, setDataList] = useState<UserEntity[]>([]);
    const socket = io(`${baseUrl}`);

    socket.on('on-id-message', (payload: UserEntity) => {
        setIsDialogOpen(true);
        setNeedCall(false);
        setUserEntity(payload);
    });

    socket.on('close', () => {
        setIsDialogOpen(false);
        setUserEntity({});
    });

    const handleClose = () => {
        setIsDialogOpen(false);
        setUserEntity({
            phone: '',
            prepaidCardNumber: '',
            email: '',
        });
    };

    const formatDate = (date: string | undefined) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',

        };
        return new Date(date ?? new Date()).toLocaleDateString('es-ES', options);
    };

    const handleDialogUser = (item: UserEntity) => {
        setIsDialogOpen(true);
        setNeedCall(true);
        setUserEntity(item);
    }

    const handleCall = async (user: UserEntity) => {
        await fetch(`${baseUrl}/clients/call/${user.phone}`, { method: 'POST' });
    }

    useEffect(() => {
        fetch(`${baseUrl}/clients`)
            .then(async (value) => {
                const jsonValue = await value.json();
                setDataList(jsonValue);
            });
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: 2 }} className='box-container'>

                <DialogComponent
                    isOpen={isDialogOpen}
                    needCall={needCall}
                    user={userEntity}
                    handleClose={handleClose}
                    handleCall={handleCall}
                />

                <Typography variant='h3'>Usuarios</Typography>

                <Grid container spacing={2} className='grid-container'>

                    {dataList.map((item, index) => (
                        <Grid key={index} size={4}>
                            <Card className='item-card' onClick={() => handleDialogUser(item)}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom
                                        sx={{ marginBottom: 2 }}>
                                        <span className='names-title'>
                                            {item.names} {item.lastnames}
                                        </span>
                                    </Typography>

                                    <Grid container>
                                        <Grid size={5}>
                                            <Typography><strong>Teléfono: </strong></Typography>
                                        </Grid>
                                        <Grid size={7}>
                                            <Chip label={item.phone} variant='outlined'></Chip>
                                        </Grid>

                                        <Grid size={5}>
                                            <Typography><strong>Correo electrónico: </strong></Typography>
                                        </Grid>
                                        <Grid size={7}>
                                            <Typography>{item.email}</Typography>
                                        </Grid>

                                        <Grid size={5}>
                                            <Typography><strong>Cumpleaños: </strong></Typography>
                                        </Grid>
                                        <Grid size={7}>
                                            <Typography>{formatDate(item.birthdate)}</Typography>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                </Grid>

            </Box>
        </>
    );
};
