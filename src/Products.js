import { Card, CardContent, Container, Grid, Icon, IconButton, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(null);
  
  useEffect(() => {
   axios.get('http://localhost:8080/products')
     .then((res) => setData(res.data))
     .catch((err) => console.log(err))
  },[])

    const handleGet = () => {
      axios.get(`http://localhost:8080/product/${input}`)
                .then((res) => setOutput(res.data))
                .catch((err) => console.log(err))
    }

    
   const handleDelete =  (id) => {
           axios.delete(`http://localhost:8080/product/${id}`)
              .then((res) => setOutput(res.data))
              .catch((err) => console.log(err))
              window.location.reload();
  }

  return (
    <div>
    <Container>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product page
          </Typography>
          <Button color="inherit" onClick={() => navigate("/create")}>Create new</Button>
        </Toolbar>
      </AppBar>
      <TextField sx={{ marginTop:"20px"}} placeholder='Enter name of product' onChange={(e) => setInput(e.target.value)}/>
          <Button  sx={{ marginTop:"20px", marginLeft:"10px"}} variant="contained"  onClick={handleGet}>Get Product</Button>
          {output && output.length > 0 ?
             <Card>
             <CardContent>
            <Typography variant='h6' >Name: {output[0].name}</Typography>
            <Typography variant='body2' >Place: {output[0].place}</Typography>
            <Typography variant='body2' >Warranty: {output[0].warranty}</Typography>
            </CardContent> 
            </Card>
             : null
           }
    <Grid 
    sx={{ marginTop:"1px" }}
    container 
    spacing={8}
     >
    {data && data.map((product) => (
        <Grid item  key={product.id}>
        <Card>
            <CardContent>
            <Typography variant='h6' >Name: {product.name}</Typography>
            <Typography variant='body2' >Place: {product.place}</Typography>
            <Typography variant='body2' >Warranty: {product.warranty}</Typography>
            <IconButton onClick={() => handleDelete(product.id)} aria-label="delete">
            <DeleteIcon />
           </IconButton>
            </CardContent> 
        </Card>
        </Grid>
    ))}
    </Grid>
    </Container>
    </div>
  )
}

export default Products