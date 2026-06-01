package com.example.ant_track_sboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ant_track_sboot.modelo.MetodoPago;
import com.example.ant_track_sboot.servicio.MetodoPagoServicio;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/anttrackapi/v1/metodopagos")
// Inyectar el servicio de MetodoPago
// Implementar los métodos para manejar las solicitudes HTTP (GET, POST,
// PUT, DELETE)
public class MetodoPagoControlador {

    @Autowired
    private MetodoPagoServicio metodoPagoServicio;
    // Para cada servicio ofrecido por el controlador se debe programar una función
    // Esa funcion recibira las peticiones del pedido y respondera con el
    // resultado de la operacion solicitada.
    // Función controladora del servicio de guardar un nuevo método de pago

    @PostMapping
    public ResponseEntity<?> controladorGuardarMetodoPago(@RequestBody MetodoPago datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(metodoPagoServicio.guardar(datos));
    }

    // Función controladora del servicio de listar todos los métodos de pago
    @GetMapping
    public ResponseEntity<?> controladorListarTodosMetodosPago() {
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoServicio.listarTodos());
    }

    // funcion controladora del servicio modificar un método de pago existente
    @PutMapping("/{id}")
    public ResponseEntity<?> controladorModificarMetodoPago(@PathVariable Long id, @RequestBody MetodoPago datos) {
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoServicio.editar(id, datos));
    }

    // funcion controladora del servicio eliminar un método de pago por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> controladorEliminarMetodoPago(@PathVariable Long id) {
        metodoPagoServicio.eliminar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // funcion controladora del servicio buscar un método de pago por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> controladorBuscarMetodoPagoPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(metodoPagoServicio.buscarPorId(id));
    }
}
