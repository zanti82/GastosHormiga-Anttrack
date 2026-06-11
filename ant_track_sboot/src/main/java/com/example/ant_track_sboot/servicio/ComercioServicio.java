package com.example.ant_track_sboot.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.ant_track_sboot.modelo.Comercio;
import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.repositorio.IComercioRepositorio;


@Service
public class ComercioServicio {

    
    private IComercioRepositorio comercioRepositorio;

    //injeccion
    public ComercioServicio(IComercioRepositorio comercioRepositorio) {
        this.comercioRepositorio = comercioRepositorio;
    }

   
    public Comercio buscarPorNombreYUsuario(String nombreComercio, Long usuarioId) {

     
        return comercioRepositorio.findByCreadoPorIdAndNombreComercioContainingIgnoreCase(usuarioId,nombreComercio);
    }

    public Comercio crearComercio(String nombre, Usuario usuario) {

        if (nombre== null || nombre.isBlank()
            || nombre.isEmpty()) {

                throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "El nombre del comercio no puede estar vacío o nulo, por favor ingrese un nombre válido.    ");
    }
        Comercio nuevo = new Comercio(nombre, usuario);
        return comercioRepositorio.save(nuevo);
    }
    
    public List<Comercio> listarPorUsuario(Long usuarioId) {
        return comercioRepositorio.findByCreadoPorId(usuarioId);
    }

    // SERVICIO PARA LISTAR comercios
    public List<Comercio> listarComercios() {
        return comercioRepositorio.findAll();
    }

    // SERVICIO PARA ELIMINAR comercio para desarrollo

    public boolean deleteComercio(Long id) {
        Optional<Comercio> comercioExistente =  comercioRepositorio.findById(id);

       
        if (!comercioExistente.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El comercio no existe en la base de datos.");

        } else {
            comercioRepositorio.deleteById(id);
            return true;

        }
    }

    // SERVICIO PARA MODIFICAR UN comercio EN BD

    public Comercio updateComercio(Long comercioId, String nuevoNombre, Usuario usuario) {
        Comercio comercioExistente = comercioRepositorio.findById(comercioId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "El comercio no existe."));
        
        // Verify ownership
        if (!comercioExistente.getCreadoPor().getId().equals(usuario.getId())) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "No puedes editar un comercio que no te pertenece.");
        }
        
        if (nuevoNombre == null || nuevoNombre.trim().isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "El nombre no puede estar vacío.");
        }
        
        comercioExistente.setNombreComercio(nuevoNombre.trim());
        return comercioRepositorio.save(comercioExistente);
    }

    // SERVICIO PARA BUSCAR UN comercio POR ID EN BD

    public Comercio searchComercioById(Long id){
        Optional<Comercio> comercioExistente = comercioRepositorio.findById(id);

        //is present es que existe y is empty es que no existe, si el comercio existe se retorna el comercio, si no existe se retorna un mensaje de error indicando que el comercio no existe en la base de datos
        if(comercioExistente.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El comercio no existe en la base de datos.");

        }else{
            return (comercioExistente.get());
        }
   }

    // activar 
      
    public boolean activaComercio(Long id) {
        Optional<Comercio> comercioBuscar = comercioRepositorio.findById(id);
        if(!comercioBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
           Comercio comercioActivar = comercioBuscar.get();
           comercioActivar.setEstado(Estado.ACTIVO);
           comercioRepositorio.save(comercioActivar);
           return true;
       }
       // desactivasr
      
    public boolean desactivaComercio(Long id) {
        Optional<Comercio> comercioBuscar = comercioRepositorio.findById(id);
        if(!comercioBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
           Comercio comercioDesaActivar = comercioBuscar.get();
           comercioDesaActivar.setEstado(Estado.INACTIVO);
           comercioRepositorio.save(comercioDesaActivar);
           return true;
       }

}