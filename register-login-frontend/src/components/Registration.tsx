import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

type InputFieldType = {
  name: string;
  email: string;
  password: string;
  termsAndConditions: boolean;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegistrationForm: React.FC = () => {
  const labels = {
    name: 'First Name',
    email: 'Email',
    password: 'Password',
    termsAndConditions: 'I accept terms and conditions',
  };

  const [fields, setFields] = useState<InputFieldType>({
    name: '',
    email: '',
    password: '',
    termsAndConditions: false,
  });

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    termsAndConditions: false,
  });

  const navigate = useNavigate();
  const baseURL = 'http://localhost:5001/api/users';
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'termsAndConditions') {
      setFields((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setFields((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const MAX_LENGTH = 8;

  useEffect(() => {
    for (let key in fields) {
      handleValidation(key);
    }
  }, [fields]);

  const handleValidation = (name: string) => {
    switch (name) {
      case 'password':
        if (!fields.password || MAX_LENGTH > fields.password.length) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }
        break;

      case 'email':
        if (!fields.email || !emailRegex.test(fields.email)) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }
        break;
      case 'termsAndConditions':
        if (!fields.termsAndConditions) {
          setError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
        }

        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    axios
      .post(`${baseURL}`, {
        name: fields.name,
        email: fields.email,
        password: fields.password,
      })
      .then((res) => {
        if (res.data === 'Registration Successfull') {
          navigate('/login');
        } else {
          alert(res.data);
        }
      })
      .catch((error) => console.log(error));
    navigate('/login');
  };

  const style = {
    padding: '8px',
    width: '20%',
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 15,
      }}
    >
      <TextField
        required
        sx={style}
        name="name"
        label={labels['name']}
        onChange={handleChange}
      />
      {fields.name && error.name && <span>enter your firstName</span>}
      <TextField
        required
        autoComplete="off"
        sx={style}
        name="email"
        type="email"
        label={labels.email}
        onChange={handleChange}
      />
      {fields.email && error.email && (
        <span color="error">enter a valid email id</span>
      )}
      <TextField
        required
        sx={style}
        autoComplete="off"
        name="password"
        type="password"
        label={labels.password}
        onChange={handleChange}
      />
      {fields.password && error.password && (
        <span color="error">
          password must be 8 ,{fields.password.length}characters long
        </span>
      )}
      <FormControlLabel
        control={
          <Checkbox
            required
            name="termsAndConditions"
            checked={fields.termsAndConditions}
            onChange={handleChange}
          />
        }
        label={labels.termsAndConditions}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ width: '200px', alignItem: 'center' }}
        disabled={!Object.values(error).every((value) => !value)}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
