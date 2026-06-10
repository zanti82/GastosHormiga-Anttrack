package com.example.ant_track_sboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.ant_track_sboot.DTO.GastoDTO;
import com.example.ant_track_sboot.modelo.Gasto;
import com.example.ant_track_sboot.servicio.GastoServicio;



@RestController
@RequestMapping("/anttrackapi/v1/gastos")
public class GastoControlador {

    //inyectar el servivicio 

    @Autowired
    private GastoServicio gastoServicio;

    //para cada servicio se debe programar una funcion
    //esa funcion recibe peticiones y responde

   
    @PostMapping
    public ResponseEntity<?> saveGasto(@RequestBody GastoDTO datos){
        return ResponseEntity.status(HttpStatus.OK).body(
            gastoServicio.guardarGasto(datos)
        );
    }

    @GetMapping
    public ResponseEntity<?> findGastos(){

        return ResponseEntity.status(HttpStatus.OK).body(
            gastoServicio.buscarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findGastoById(@PathVariable Long id){
    return ResponseEntity.status(HttpStatus.OK).body(
        gastoServicio.buscarPorId(id)
    );
   }

   //gastos por usuarios este vienne de service y se creo en reposi
   //trae una lista de gasto de un usuario por id
    @GetMapping("/usuarios/{idUsuario}")
    public ResponseEntity<?> gastosPorUsuario(@PathVariable Long idUsuario) {
        List<Gasto> gastos = gastoServicio.buscarPorID(idUsuario);
        return ResponseEntity.ok(gastos);
}

@PutMapping("/{id}")
public ResponseEntity<?> modificarGasto(@PathVariable Long id, @RequestBody GastoDTO datos) {
    return ResponseEntity.status(HttpStatus.OK).body(
        gastoServicio.editar(id, datos)
    );
    
}

 @DeleteMapping("/{id}")
        public ResponseEntity<?> eliminarGasto(@PathVariable Long id) {
            gastoServicio.eliminar(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        }

}
