import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
}
from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [username,setUsername] =
    useState("");

  const [password,setPassword] =
    useState("");

  const login = () => {

    if(
      username === "admin" &&
      password === "admin123"
    ) {

      navigate("/dashboard");

    }
    else {

      alert(
        "Invalid Credentials"
      );

    }

  };

  return (

    <Container
      maxWidth="sm"
      sx={{ mt:15 }}
    >

      <Card elevation={5}>

      <CardContent>

      <Typography
       variant="h4"
       align="center"
       gutterBottom
      >

       Teamcenter Deployment
       Automation Portal

      </Typography>

      <TextField
        fullWidth
        label="Username"
        sx={{ mt:2 }}
        onChange={(e)=>
          setUsername(
            e.target.value
          )
        }
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        sx={{ mt:2 }}
        onChange={(e)=>
          setPassword(
            e.target.value
          )
        }
      />

      <Button
        fullWidth
        variant="contained"
        sx={{ mt:3 }}
        onClick={login}
      >

       Login

      </Button>

      </CardContent>

      </Card>

    </Container>

  );

}