import { Avatar, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import Link from 'next/link'
import LinkMaterial from '@mui/material/Link'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import PhotoSide from '../../components/PhotoSide';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function RecoverPassword() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  
  return (
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
          Recuperaração de senha
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Recuperar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/entrar">
                <LinkMaterial href="#" variant="body2">
                  {"Entrar"}
                </LinkMaterial>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PhotoSide>
  )
}
