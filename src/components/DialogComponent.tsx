import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Typography } from '@mui/material';
import { UserEntity } from '../App.tsx';

interface Props {
    isOpen: boolean;
    needCall: boolean;
    user: UserEntity;
    handleClose: () => void;
    handleCall: (user: UserEntity) => void;
}

const formatDate = (date: string | undefined) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',

    };
    return new Date(date ?? new Date()).toLocaleDateString('es-ES', options);
};

export const DialogComponent = ({ isOpen, needCall, user, handleClose, handleCall }: Props) => {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                <Typography variant="h4">Datos del Cliente</Typography>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <Stack>
                    <Grid container spacing={2} sx={{ maxWidth: '30vw' }}>
                        <Grid size={5}>
                            <Chip label="Teléfono"></Chip>
                        </Grid>
                        <Grid size={7}>
                            <Typography>{user.phone}</Typography>
                        </Grid>
                        <Grid size={5}>
                            <Chip label="Correo electrónico"></Chip>
                        </Grid>
                        <Grid size={7}>
                            <Typography>{user.email}</Typography>
                        </Grid>
                        <Grid size={5}>
                            <Chip label="Nombres"></Chip>
                        </Grid>
                        <Grid size={7}>
                            <Typography>{user.names}</Typography>
                        </Grid>
                        <Grid size={5}>
                            <Chip label="Apellidos"></Chip>
                        </Grid>
                        <Grid size={7}>
                            <Typography>{user.lastnames}</Typography>
                        </Grid>
                        <Grid size={5}>
                            <Chip label="Fecha de nacimiento"></Chip>
                        </Grid>
                        <Grid size={7}>
                            <Typography>{formatDate(user.birthdate)}</Typography>
                        </Grid>
                    </Grid>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
                <Button onClick={handleClose} color='error'>Cerrar</Button>
                {
                    needCall &&
                    <Button onClick={() => handleCall(user)} variant='contained' color='success'>LLamar</Button>
                }
            </DialogActions>
        </Dialog>
    );
};
