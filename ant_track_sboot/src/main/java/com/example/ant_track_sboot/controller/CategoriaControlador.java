package com.example.ant_track_sboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ant_track_sboot.modelo.Categoria;
import com.example.ant_track_sboot.servicio.CategoriaServicio;
import org.springframework.web.bind.annotation.PutMapping;


@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/anttrackapi/v1/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaServicio categoriaServicio;

    // Guardo para crear categorias
    @PostMapping
    public ResponseEntity<?> controladorGuardarCategoria(@RequestBody Categoria datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaServicio.crearCategoria(datos));
    }

    // 2. LISTAR TODOS:  Me devuelve la lista completa 
    @GetMapping
    public ResponseEntity<?> controladorListarTodosCategoria() {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.buscarTodos());
    }

    // 3. BUSCAR POR ID: el detalle de una específica
    @GetMapping("/{id}")
    public ResponseEntity<?> controladorBuscarPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>controladorModificarCategoria(@PathVariable Long id, @RequestBody Categoria datos) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.editarCategoria(id, datos));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>controladorEliminarCategoria(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.eliminar(id));
    }

    @PutMapping("/{id}/desactivar")
    public ResponseEntity<?> desactivarCategoria(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.desactivaCategoria(id));
    }

    @PutMapping("/{id}/activar")
    public ResponseEntity<?> activarCategoria(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaServicio.activaCategoria(id));
    }
}