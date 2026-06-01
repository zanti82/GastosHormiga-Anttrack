package com.example.ant_track_sboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ant_track_sboot.modelo.Comercio;
import com.example.ant_track_sboot.servicio.ComercioServicio;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/anttrackapi/v1/comercios")



public class ComercioControlador {

       
    //Se conecta con el servicio para realizar las operaciones de CRUD, se inyecta el servicio en el controlador para poder usarlo
    //Se crean los endpoints para cada operación de CRUD, se pueden usar los métodos HTTP adecuados para cada operación, por ejemplo:       

    //POST para crear un nuevo comercio
    //GET para listar todos los comercios

    @Autowired
    private ComercioServicio comercioServicio;

    //Para cada servicio ofrecido se debe programar una funcion
    //Esa funcion recibira las peticiones del pedido y respondera con la información solicitada o con un mensaje de error en caso de que algo salga mal 


    //Funcion controladora del servicio para guardar un nuevo comercio, esta funcion recibira una peticion POST con los datos del nuevo comercio, validara los datos y llamara al servicio para guardar el comercio en la base de datos, si todo sale bien se retornara el comercio guardado, si no se retornara un mensaje de error con el motivo del error
    //Ejemplo de endpoint para guardar un nuevo comercio

    @PostMapping
    public ResponseEntity<?> controladorGuardar(@RequestBody Comercio datos) {
        return ResponseEntity.status(HttpStatus.OK)
        .body(comercioServicio.guardar_Comercio(datos));
    }



    //Funcion controladora del servicio pde lista todos los comercios, esta funcion recibira una peticion GET, llamara al servicio para obtener la lista de comercios en la base de datos y retornara la lista de comercios, si no se encuentra ningun comercio se retornara un mensaje de error indicando que no se encontraron comercios
    //Ejemplo de endpoint para listar todos los comercios

    
     @GetMapping
    public ResponseEntity<?> controladorListar() {
        return ResponseEntity.status(HttpStatus.OK)
        .body(comercioServicio.listar_comercios());
        }


        //Funcion controladora del servicio para modificar un comercio, esta funcion recibira una peticion PUT con los datos del comercio a modificar, validara los datos y llamara al servicio para modificar el comercio en la base de datos, si todo sale bien se retornara el comercio modificado, si no se retornara un mensaje de error con el motivo del error
        
        @PutMapping("/{id}")
        public ResponseEntity<?> controladorModificar(@PathVariable Long id, @RequestBody Comercio datos) {
            return ResponseEntity.status(HttpStatus.OK).body(
                comercioServicio.modificar_comercio(id, datos)
            );
            
        }

        //Funcion controladora del servicio para eliminar un comercio, esta funcion recibira una peticion DELETE con el id del comercio a eliminar, validara el id y llamara al servicio para eliminar el comercio en la base de datos, si todo sale bien se retornara un mensaje indicando que el comercio fue eliminado, si no se retornara un mensaje de error con el motivo del error
        
        @DeleteMapping("/{id}")
        public ResponseEntity<?> controladorEliminar(@PathVariable Long id) {
            return ResponseEntity.status(HttpStatus.OK).body(
                comercioServicio.eliminar_comercio(id)
            );
        }

        //Funcion controladora del servicio para buscar un comercio por id, esta funcion recibira una peticion GET con el id del comercio a buscar, validara el id y llamara al servicio para buscar el comercio en la base de datos, si se encuentra el comercio se retornara el comercio encontrado, si no se encuentra el comercio se retornara un mensaje de error indicando que no se encontro el comercio

        @GetMapping("/{id}")
        public ResponseEntity<?> controladorBuscar(@PathVariable Long id) {
            return ResponseEntity.status(HttpStatus.OK).body(
                comercioServicio.buscar_comercio_id(id)
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


