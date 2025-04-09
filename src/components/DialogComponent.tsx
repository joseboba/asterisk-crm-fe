import {Dialog, DialogTitle, Typography} from '@mui/material';
import {UserEntity} from '../App.tsx';

interface Props {
    isOpen: boolean;
    user: UserEntity;
}

export const DialogComponent = ({isOpen, user}: Props) => {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>
                <Typography variant="h6">Cliente</Typography>
                <Typography
                    component="pre"
                    sx={{
                        m: 5
                    }}
                >
                    { JSON.stringify(user, null, 2) }
                </Typography>
            </DialogTitle>
        </Dialog>
    );
};
