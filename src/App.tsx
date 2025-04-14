import { io } from 'socket.io-client';
import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { DialogComponent } from './components/DialogComponent.tsx';

export interface UserEntity {
    phone?: string,
    prepaidCardNumber?: string,
    email?: string,
}

export interface UserInformationEntity {
    names?: string,
    lastNames?: string,
    phone?: string,
    creditCardNumber?: string,
    email?: string,
    birthDate?: string
}

const data: UserInformationEntity[] = [
    {
        "names": "Ana Sofía",
        "lastNames": "Mendoza Vargas",
        "phone": "555-1122",
        "creditCardNumber": "****-****-****-1234",
        "email": "ana.sofia.mendoza@example.com",
        "birthDate": "1990-07-20"
    },
    {
        "names": "Carlos Alberto",
        "lastNames": "Pérez Soto",
        "phone": "555-9876",
        "creditCardNumber": "****-****-****-5678",
        "email": "carlos.alberto.perez@example.com",
        "birthDate": "1985-03-15"
    },
    {
        "names": "María Elena",
        "lastNames": "Gómez Díaz",
        "phone": "555-4321",
        "creditCardNumber": "****-****-****-9012",
        "email": "maria.elena.gomez@example.com",
        "birthDate": "1993-11-01"
    },
    {
        "names": "Luis Javier",
        "lastNames": "Rodríguez Ruiz",
        "phone": "555-5555",
        "creditCardNumber": "****-****-****-3456",
        "email": "luis.javier.rodriguez@example.com",
        "birthDate": "1988-06-25"
    },
    {
        "names": "Isabel Cristina",
        "lastNames": "Vargas Castro",
        "phone": "555-1234",
        "creditCardNumber": "****-****-****-7890",
        "email": "isabel.cristina.vargas@example.com",
        "birthDate": "1995-09-10"
    },
    {
        "names": "Javier Andrés",
        "lastNames": "Soto Flores",
        "phone": "555-6789",
        "creditCardNumber": "****-****-****-2345",
        "email": "javier.andres.soto@example.com",
        "birthDate": "1982-01-30"
    },
    {
        "names": "Elena Sofía",
        "lastNames": "Díaz Jiménez",
        "phone": "555-0987",
        "creditCardNumber": "****-****-****-6789",
        "email": "elena.sofia.diaz@example.com",
        "birthDate": "1991-04-05"
    },
    {
        "names": "Miguel Ángel",
        "lastNames": "Ruiz Vega",
        "phone": "555-2233",
        "creditCardNumber": "****-****-****-0123",
        "email": "miguel.angel.ruiz@example.com",
        "birthDate": "1987-12-18"
    },
    {
        "names": "Laura María",
        "lastNames": "Castro López",
        "phone": "555-8899",
        "creditCardNumber": "****-****-****-4567",
        "email": "laura.maria.castro@example.com",
        "birthDate": "1994-08-22"
    },
    {
        "names": "Andrés Felipe",
        "lastNames": "Flores Torres",
        "phone": "555-3344",
        "creditCardNumber": "****-****-****-8901",
        "email": "andres.felipe.flores@example.com",
        "birthDate": "1989-02-14"
    },
    {
        "names": "Mariana Isabel",
        "lastNames": "Jiménez Rojas",
        "phone": "555-7788",
        "creditCardNumber": "****-****-****-3210",
        "email": "mariana.isabel.jimenez@example.com",
        "birthDate": "1996-05-03"
    },
    {
        "names": "Ricardo Antonio",
        "lastNames": "Vega Moreno",
        "phone": "555-4455",
        "creditCardNumber": "****-****-****-7654",
        "email": "ricardo.antonio.vega@example.com",
        "birthDate": "1983-10-28"
    },
    {
        "names": "Valentina Sofía",
        "lastNames": "López Pérez",
        "phone": "555-9900",
        "creditCardNumber": "****-****-****-1098",
        "email": "valentina.sofia.lopez@example.com",
        "birthDate": "1992-06-11"
    },
    {
        "names": "Gabriel Alejandro",
        "lastNames": "Torres Gómez",
        "phone": "555-2121",
        "creditCardNumber": "****-****-****-5432",
        "email": "gabriel.alejandro.torres@example.com",
        "birthDate": "1986-09-07"
    },
    {
        "names": "Fernanda Isabel",
        "lastNames": "Rojas Díaz",
        "phone": "555-6565",
        "creditCardNumber": "****-****-****-9876",
        "email": "fernanda.isabel.rojas@example.com",
        "birthDate": "1997-03-21"
    },
    {
        "names": "Daniel Ricardo",
        "lastNames": "Moreno Ruiz",
        "phone": "555-0101",
        "creditCardNumber": "****-****-****-2109",
        "email": "daniel.ricardo.moreno@example.com",
        "birthDate": "1984-11-16"
    }
];

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
        const formattedDate = new Date(date ?? new Date()).toLocaleDateString('es-ES', options);
        return formattedDate;
    };

    const handleDialogUser = (item: UserInformationEntity) => {
        setIsDialogOpen(true);
        setUserEntity({
            phone: item.phone,
            prepaidCardNumber: item.creditCardNumber,
            email: item.email,
        });
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: 2 }} className='box-container'>

                <DialogComponent
                    isOpen={isDialogOpen}
                    user={userEntity}
                    handleClose={handleClose}
                />

                <Typography variant='h3'>Usuarios</Typography>

                <Grid container spacing={2} className='grid-container'>

                    {data.map((item, index) => (
                        <Grid key={index} size={4}>
                            <Card className='item-card' onClick={() => handleDialogUser(item)}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom
                                        sx={{ marginBottom: 2 }}>
                                        <span className='names-title'>
                                            {item.names} {item.lastNames}
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
                                            <Typography><strong>Tarjeta de crédito: </strong></Typography>
                                        </Grid>
                                        <Grid size={7}>
                                            <Typography>{item.creditCardNumber}</Typography>
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
                                            <Typography>{formatDate(item.birthDate)}</Typography>
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
