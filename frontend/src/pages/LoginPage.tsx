import React, { useState } from 'react';
import {
  LoginPage as PFLoginPage,
  Form,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
  InputGroup,
} from '@patternfly/react-core';
import { EyeIcon, EyeSlashIcon } from '@patternfly/react-icons';
import axios from 'axios';
import './LoginPage.css';
import myAppLogo from '../assets/logo.svg';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      alert('¡Inicio de sesión exitoso! Token: ' + response.data.access_token);
    } catch (error) {
      alert('Error: Las credenciales son incorrectas.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PFLoginPage
      // --- Imagen de Marca ---
      brandImgSrc={myAppLogo}
      brandImgAlt="connected.community logo"

      // --- Títulos y Textos Principales ---
      loginTitle="Iniciar Sesión en connected.community"
      loginSubtitle="Acceso al panel de administración de tu condominio."

      // --- Contenido del Panel Lateral ---
      textContent="La plataforma definitiva para la administración de condominios en México."

      // --- Pie de Página ---
      footerListItems="© 2023. sysadminctl.services Todos los derechos reservados. Con tecnologia de sysadminctl.services"

      // --- Redes Sociales (para el futuro) ---
      //socialMediaLoginContent={
        // Aquí, en el futuro, irían los botones de "Login con Google", etc.
        // Por ahora lo dejamos como un texto.
        //<p>Próximamente: inicio de sesión con redes sociales.</p>
      //}
    >
      <Form onSubmit={handleLogin}>
        <FormGroup label="Correo Electrónico" isRequired fieldId="email">
          <TextInput
            isRequired
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(_event, value) => setEmail(value)}
          />
        </FormGroup>
        <FormGroup label="Contraseña" isRequired fieldId="password">
          {/* Usamos InputGroup para combinar el campo de texto y el botón del ojo */}
          <InputGroup>
            <TextInput
              isRequired
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(_event, value) => setPassword(value)}
            />
            {/* Usamos un <Button> con la variante "control" para el icono, que es la forma correcta */}
            <Button
              variant="control"
              aria-label="Mostrar contraseña"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </Button>
          </InputGroup>
        </FormGroup>
        <ActionGroup>
          <Button
            variant="primary"
            type="submit"
            isBlock
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </ActionGroup>
      </Form>
    </PFLoginPage>
  );
}