import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PhotoSide from '../../components/PhotoSide';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import LinkMaterial from '@mui/material/Link';
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { api } from '../../services/api';
import User from '../../interfaces/user';
import { useRouter } from 'next/router';
import { Snackbar } from '@mui/material';

export default function SignUp() {
  const router = useRouter()
  const [registeredSnackbar, setRegisteredSnackbar] = useState(false);

  const vertical = 'bottom';
  const horizontal = 'center';

  const handleRegisteredSnackbarClose = () => {
    setRegisteredSnackbar(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    api.get<User[]>('users')
      .then((response) => {
        const newId = response.data[response.data.length-1].id+1;
        const email = data.get('email');
        const token = `${email}-${uuidv4()}`

        api.post('users', {
          id: newId,
          nome: data.get('name'),
          email,
          senha: data.get('password'),
          token
        }).then((response) => {
            localStorage.setItem('clients-token', JSON.stringify(token))

            setRegisteredSnackbar(true);
          })
      });
  };

  return (
    <>
      <PhotoSide>
        <Box
          sx={{
            my: 8,
            mx: 4,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar conta
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastre-se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/entrar">
                  <LinkMaterial href="#" variant="body2">
                    Já tem uma conta? Entrar
                  </LinkMaterial>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </PhotoSide>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={registeredSnackbar}
        onClose={handleRegisteredSnackbarClose}
        message='Conta criada. Agora você pode fazer login!'
        key={'successfully'}
      />
    </>
  );
}
