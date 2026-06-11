package com.example.ant_track_sboot.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ant_track_sboot.modelo.Comercio;
import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.servicio.ComercioServicio;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/anttrackapi/v1/comercios")
public class ComercioControlador {

     
    private ComercioServicio comercioServicio;

    public ComercioControlador(ComercioServicio comercioServicio) {
        this.comercioServicio = comercioServicio;
    }



    
    @PostMapping
    public ResponseEntity<Comercio> crearComercio(
            @RequestBody Comercio datos,
            @AuthenticationPrincipal Usuario usuario) {
        Comercio nuevo = comercioServicio.crearComercio(datos.getNombreComercio(), usuario);
        return ResponseEntity.ok(nuevo);
    }



    //Funcion controladora del servicio pde lista todos los comercios, esta funcion recibira una peticion GET, llamara al servicio para obtener la lista de comercios en la base de datos y retornara la lista de comercios, si no se encuentra ningun comercio se retornara un mensaje de error indicando que no se encontraron comercios
    //Ejemplo de endpoint para listar todos los comercios

    
    @GetMapping("/mis-comercios")
    public ResponseEntity<List<Comercio>> listarMisComercios(@AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(comercioServicio.listarPorUsuario(usuario.getId()));
    }


        //Funcion controladora del servicio para modificar un comercio, esta funcion recibira una peticion PUT con los datos del comercio a modificar, validara los datos y llamara al servicio para modificar el comercio en la base de datos, si todo sale bien se retornara el comercio modificado, si no se retornara un mensaje de error con el motivo del error
        
    @PutMapping("/{id}")
    public ResponseEntity<Comercio> updateComercio(
        @PathVariable Long id,
        @RequestBody Comercio request,
        @AuthenticationPrincipal Usuario usuario) {
    Comercio actualizado = comercioServicio.updateComercio(id, request.getNombreComercio(), usuario);
    return ResponseEntity.ok(actualizado);
        }

        //Funcion controladora del servicio para eliminar un comercio, esta funcion recibira una peticion DELETE con el id del comercio a eliminar, validara el id y llamara al servicio para eliminar el comercio en la base de datos, si todo sale bien se retornara un mensaje indicando que el comercio fue eliminado, si no se retornara un mensaje de error con el motivo del error
        
        @DeleteMapping("/{id}")
        public ResponseEntity<?> controladorEliminar(@PathVariable Long id) {
            return ResponseEntity.status(HttpStatus.OK).body(
                comercioServicio.deleteComercio(id)
            );
        }

        //Funcion controladora del servicio para buscar un comercio por id, esta funcion recibira una peticion GET con el id del comercio a buscar, validara el id y llamara al servicio para buscar el comercio en la base de datos, si se encuentra el comercio se retornara el comercio encontrado, si no se encuentra el comercio se retornara un mensaje de error indicando que no se encontro el comercio

        @GetMapping("/{id}")
        public ResponseEntity<?> controladorBuscar(@PathVariable Long id) {
            return ResponseEntity.status(HttpStatus.OK).body(
                comercioServicio.searchComercioById(id)
            );
        }

        @PutMapping("/{id}/desactivar")
    public ResponseEntity<?> desactivarComercio(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(comercioServicio.desactivaComercio(id));
    }

    @PutMapping("/{id}/activar")
    public ResponseEntity<?> activarComercio(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(comercioServicio.activaComercio(id));
    }
    }


