import { Avatar, Button, Checkbox, FormControlLabel, Snackbar, TextField, Typography } from '@mui/material';
import Link from 'next/link'
import LinkMaterial from '@mui/material/Link'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import PhotoSide from '../../components/PhotoSide';
import { useState } from 'react';
import User from '../../interfaces/user';
import { api } from '../../services/api';
import { v4 as uuidv4 } from 'uuid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter()
  const [invalidSnackbar, setInvalidSnackbar] = useState(false);

  const vertical = 'bottom';
  const horizontal = 'center';

  const handleInvalidSnackbarClose = () => {
    setInvalidSnackbar(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    api.get<User[]>('users')
      .then((response) => {
        const user = response.data.find((user: User) => user.email === data.get('email') && user.senha === data.get('password'));
        
        if (user) {
          const token = `${user.email}-${uuidv4()}`
          
          localStorage.setItem('clients-token', JSON.stringify(token))

          api.put(`users/${user.id}`, {
            id: user.id,
            email: user.email,
            senha: user.senha,
            token
          })

          router.push('/clients')
        } else {
          setInvalidSnackbar(true);
        }
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
            Entrar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre de mim"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="recuperar-senha">
                  <LinkMaterial href="#" variant="body2">
                    Esqueceu a senha?
                  </LinkMaterial>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cadastro">
                  <LinkMaterial href="#" variant="body2">
                    {"Não tem uma conta? Inscreva-se"}
                  </LinkMaterial>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </PhotoSide>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={invalidSnackbar}
        onClose={handleInvalidSnackbarClose}
        message='E-mail ou senha inválidos'
        key={'successfully'}
      />
    </>
  )
}
