import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const style = {
    padding: '5px',
    width: '20%',
  };

  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    name: '',
    description: '',
    supplierName: '',
    unit: 0,
    price: 0,
    isProductAvailable: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  console.log('data***', inputFields);
  const handleSubmit = () => {
    axios
      .post('http://localhost:5001/add-products', {
        productName: inputFields.name,
        supplierName: inputFields.supplierName,
        unit: Number(inputFields.unit),
        price: Number(inputFields.price),
        description: inputFields.description,
        isProductAvailable: inputFields.isProductAvailable,
      })
      .then((res) => {
        if (res.data === 'Product Added') {
          navigate('/');
        } else {
          alert(res.data);
        }
      })
      .catch((err) => console.log(err));
    setInputFields({
      name: '',
      description: '',
      supplierName: '',
      unit: 0,
      price: 0,
      isProductAvailable: false,
    });
  };

  const isDisabled = inputFields.name && inputFields.supplierName;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mt: 10,
      }}
    >
      <TextField
        sx={style}
        required
        name="name"
        value={inputFields.name}
        label="Product Name"
        onChange={handleChange}
      />
      <TextField
        sx={style}
        required
        name="supplierName"
        value={inputFields.supplierName}
        label="supplierName"
        onChange={handleChange}
      />

      <TextField
        sx={style}
        required
        type="number"
        name="unit"
        value={inputFields.unit}
        label="unit"
        onChange={handleChange}
      />
      <TextField
        sx={style}
        required
        name="price"
        type="number"
        value={inputFields.price}
        label="price"
        onChange={handleChange}
      />
      <TextField
        sx={style}
        id="outlined-multiline-flexible"
        label="Description"
        value={inputFields.description}
        name="description"
        onChange={handleChange}
        placeholder=" Add Description"
        multiline
      />
      <Button
        sx={style}
        variant="contained"
        onClick={handleSubmit}
        disabled={!isDisabled}
      >
        Add Product
      </Button>
    </Box>
  );
};
export default LoginForm;
