import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { ModalContext } from '../../contexts/ModalContext';
import Client from '../../interfaces/client';
import { api } from '../../services/api';

import styles from './styles.module.scss';

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

export default function MyModal() {
  const { open, handleClose } = useContext(ModalContext);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [cidade, setCidade] = useState('');
  const [pais, setPais] = useState('');
  const [empresa, setEmpresa] = useState('');

  async function handleSave() {
    const { data } = await api.get<Client[]>('clients');
    const newId = data[data.length-1].id+1;

    api.post('clients', {
      id: newId,
      nome,
      sobrenome,
      email,
      genero,
      cidade,
      pais,
      empresa
    });

    handleClose();  
  }
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={styles.box}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicionar cliente
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>        
        </Typography>

        <div className={styles.form}>
          <TextField
            id="filled-basic"
            label="Nome"
            variant="filled"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Sobrenome"
            variant="filled"
            value={sobrenome}
            onChange={(event) => setSobrenome(event.target.value)}
          />
          <TextField
            id="filled-basic"
            label="E-mail"
            variant="filled"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genero}
              label="Age"
              onChange={(event) => {setGenero(event.target.value)}}
            >
              <MenuItem value={'M'}>Masculino</MenuItem>
              <MenuItem value={'F'}>Feminino</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="filled-basic"
            label="Cidade"
            variant="filled"
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
          />
          <TextField
            id="filled-basic"
            label="País"
            variant="filled"
            value={pais}
            onChange={(event) => setPais(event.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Empresa"
            variant="filled"
            value={empresa}
            onChange={(event) => setEmpresa(event.target.value)}
          />
        </div>

        <div className={styles.save}>
          <Button variant="contained" onClick={handleSave}>Salvar</Button>
        </div>
      </Box>
    </Modal>
  )
}
