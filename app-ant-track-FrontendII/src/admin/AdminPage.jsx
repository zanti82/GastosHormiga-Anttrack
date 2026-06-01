import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import { useEffect } from "react";

export default function Admin() {
  const navigate = useNavigate();

 

  const modules = [
    {
      title: "Usuarios",
      route: "/admin/usuarios",
    },

    {
      title: "Comercios",
      route: "/admin/comercios",
    },

    {
      title: "Categorías",
      route: "/admin/categorias",
    },

    {
      title: "Métodos de Pago",
      route: "/admin/metodos-pago",
    },
  ];

  return (
    <Dialog
      open={true}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          border: "none",
          outline: "none",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        Panel Administrador
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={3}
          sx={{ mt: 1, justifyContent: "center", pb: 3 }}
        >
          {modules.map((module, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: 3,
                  transition: "0.3s",

                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "#4B5563",
                    }}
                  >
                    {module.title}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(module.route)}
                  >
                    Entrar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
