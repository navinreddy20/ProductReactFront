import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
  const [product , setProduct] = useState({
    name:"",
    place:"",
    id:0,
    warranty:0
  });

  const options = {
    method: 'POST',
    url: 'http://localhost:8080/product',
    headers: {
        'content-type': 'application/json',
    },
    data: product,
};

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log(product);
  axios
  .request(options)
  .then(function (response) {
      console.log(response.data);
  })
  .catch(function (error) {
      console.error(error);
  });
  navigate("/");
  }
  
  return (
  <>
        <Paper sx={{ margin:"25px", padding:"20px"}}>
        <Typography align="center" variant="h4">Create your Product 🖋</Typography>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}> 
        <TextField  sx={{ margin:"15px"}}  required onChange={(e) => setProduct({...product , name : e.target.value})}  fullWidth label="What's the product ? 🤔" variant="outlined" />
        <TextField  sx={{ margin:"15px"}}  required onChange={(e) => setProduct({...product , place : e.target.value})} fullWidth label="Where is it ? " variant="outlined" />
        <TextField  sx={{ margin:"15px"}} type="number"  required onChange={(e) => setProduct({...product , id : e.target.value})} fullWidth label="Which id?" variant="outlined" />
        <TextField  sx={{ margin:"15px"}}  type="number"  required onChange={(e) => setProduct({...product , warranty : e.target.value})}  fullWidth label="Warranty ? " variant="outlined" />
        <Button fullWidth variant="contained"  type="submit">Submit</Button>
        </form>
        </Paper>
  </>
  );
};

export default Create;
