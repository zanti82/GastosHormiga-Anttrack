package com.example.ant_track_sboot.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.ant_track_sboot.modelo.Comercio;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.repositorio.IComercioRepositorio;


@Service
public class ComercioServicio {

    @Autowired
    private IComercioRepositorio comercioRepositorio;

    // SERVICIO PARA GUARDAR USUARIO (Nombre Comercio)
    public Comercio guardar_Comercio(Comercio nombreComercio) {
        if (nombreComercio.getNombreComercio() == null || nombreComercio.getNombreComercio().isBlank()
                || nombreComercio.getNombreComercio().isEmpty()) {

            // para mensaje de error en caso de que el campo este vacio o nulo, se puede
            // usar la clase ResponseStatusException para lanzar una excepción con un
            // mensaje personalizado y un código de estado HTTP adecuado (por ejemplo, 400
            // Bad Request).

            // En este caso, si el nombre del comercio es nulo, está en blanco o está vacío,
            // se lanzará una excepción con un mensaje de error indicando que el nombre del
            // comercio no puede estar vacío o nulo, y se solicitará al usuario que ingrese
            // un nombre válido.
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre del comercio no puede estar vacío o nulo, por favor ingrese un nombre válido.    ");

        }
        // Validación para el campo NIT, se verifica que no sea nulo, vacío o en blanco,
        // y que tenga al menos 9 caracteres, si alguna de estas condiciones no se
        // cumple se lanza una excepción con un mensaje de error indicando que el
        // documento no puede estar vacío o nulo, y se solicita al usuario que ingrese
        // un documento válido.
        if (nombreComercio.getNit().length() < 9) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El documento no puede estar vacío o nulo, por favor ingrese un documento válido.");

        }

        // Despues de las validaciones intento guardar los datos que me enviaron, si
        // todo esta bien se guardan los datos y se retorna true, si no se guarda nada y
        // se retorna false
        return comercioRepositorio.save(nombreComercio);

    }

    // SERVICIO PARA LISTAR TODOS LOS USUARIOS EN BD
    public List<Comercio> listar_comercios() {
        return comercioRepositorio.findAll();
    }

    // SERVICIO PARA ELIMINAR UN USUARIO EN BD
    public boolean eliminar_comercio(Long id) {
        Optional<Comercio> comercioExistente =  comercioRepositorio.findById(id);

        // is present es que existe y is empty es que no existe, si el comercio existe
        // se elimina y se retorna true, si no existe se retorna false
        if (!comercioExistente.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El comercio no existe en la base de datos.");

        } else {
            comercioRepositorio.deleteById(id);
            return true;

        }
    }

    // SERVICIO PARA MODIFICAR UN USUARIO EN BD

    public Comercio modificar_comercio(Long id , Comercio datos) {
        Optional<Comercio> comercioExistente = comercioRepositorio.findById(id);

        //is present es que existe y is empty es que no existe, si el comercio existe se modifica y se retorna true, si no existe se retorna false
        if(comercioExistente.isEmpty()){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El comercio no existe en la base de datos.");

        }
       
            //lo edito
           Comercio comercioEncontrado = comercioExistente.get();
           //Defino que campos se pueden modificar, en este caso solo el nombre del comercio, si se quieren modificar mas campos se deben agregar aqui
           comercioEncontrado.setNombreComercio(datos.getNombreComercio()); 
           comercioEncontrado.setNit(datos.getNit());
           comercioEncontrado.setTelefono(datos.getTelefono());
           comercioEncontrado.setDireccion(datos.getDireccion());
           comercioEncontrado.setHorarioAtencion(datos.getHorarioAtencion());
         
           
        return comercioRepositorio.save(comercioEncontrado);   
        

    }

    // SERVICIO PARA BUSCAR UN comercio POR ID EN BD

    public Comercio buscar_comercio_id(Long id){
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