import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, TextField, Typography } from '@mui/material';
import { DrawerContext } from '../../contexts/DrawerContext';
import { ModalContext } from '../../contexts/ModalContext';

import styles from './materialdrawer.module.scss';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MaterialDrawer() {
  const { drawerIsOpen, toggleDrawer } = React.useContext(DrawerContext);
  const { open, handleClose } = React.useContext(ModalContext);
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={styles.box}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editar cliente
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form action="" className={styles.form}>
            <TextField id="filled-basic" label="Nome" variant="filled" />
            <TextField id="filled-basic" label="Empresa" variant="filled" />
            <TextField id="filled-basic" label="Empresa" variant="filled" />
            <TextField id="filled-basic" label="Cidade" variant="filled" />
            <TextField id="filled-basic" label="País" variant="filled" />
          </form>
        </Typography>

        <div className={styles.save}>
          <Button variant="contained">Salvar</Button>
        </div>
      </Box>
    </Modal>
  )
}
