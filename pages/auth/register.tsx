import { useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { signIn, getSession } from 'next-auth/react';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';




type FormData = {
  name: string;
  email: string,
  password: string,
};

const RegisterPage = () => {


  const { replace, query } = useRouter();
  const { registerUser } = useContext( AuthContext );
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ showError, setShowError ] = useState<boolean>(false);
  const [ erorrMessage, setErrorMessage ] = useState<string>('');

  const onRegisterForm = async( { name, email, password }: FormData ) => {
    
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

    if ( hasError ) {
      setShowError(true);
      setErrorMessage( message! );
      setTimeout(() => setShowError(false), 3000); 
      return;
    }

    await await signIn( 'credentials', { email, password });

    // const destination = query.p?.toString() || '/';
    // replace(destination);
  }


  return (
    <AuthLayout title="Registro">
      <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={ 1.5 }>

            <Grid item xs={ 12 }>
              <Typography variant="h1" component="h1">Crear cuenta</Typography>
              <Chip 
                label={ erorrMessage }
                color="error"
                icon={ <ErrorOutline /> }
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField
                label="Nombre"
                variant="filled"
                fullWidth
                {
                  ...register('name', {
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                  })
                }
                error={ !!errors.name }
                helperText={ errors.name?.message }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {
                  ...register('email', {
                    required: 'Este campo es requerido',
                    validate: validations.isEmail
                  })
                }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <TextField
                label="Contraseña"
                type="password"
                variant="filled"
                fullWidth
                {
                  ...register('password', {
                    required: 'Este campo es requerido',
                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                  })
                }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            <Grid item xs={ 12 }>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={ 12 } display="flex" justifyContent="end">
              <NextLink href={ query.p ? `/auth/login?p=${ query.p }` : '/auth/login'} passHref>
                <Link underline="always">
                  ¿Ya tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query}) => {
  
  const session = await getSession({ req });

  const { p = '/' } = query;

  if ( session ) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default RegisterPage;