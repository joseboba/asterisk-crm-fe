import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Typography } from '@mui/material';
import { UserEntity } from '../App.tsx';

interface Props {
    isOpen: boolean;
    user: UserEntity;
    handleClose: () => void;
}

export const DialogComponent = ({ isOpen, user, handleClose }: Props) => {
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
                            <Chip color='success' label="Tarjeta prepago"></Chip>
                        </Grid>
                        <Grid size={7}>
                            <Chip label={user.prepaidCardNumber} variant='outlined'></Chip>
                        </Grid>

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
                    </Grid>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ paddingRight: 3, paddingBottom: 3 }}>
                <Button onClick={handleClose} color='error'>Cerrar</Button>
                <Button onClick={handleClose} variant='contained' color='success'>LLamar</Button>
            </DialogActions>
        </Dialog>
    );
};
