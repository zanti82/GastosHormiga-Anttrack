package com.example.ant_track_sboot.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ant_track_sboot.modelo.Usuario;

/**
 * Repositorio para la entidad Usuario.
 * Proporciona métodos CRUD automáticos gracias a JpaRepository.
 */
@Repository
public interface IUsuarioRepositorio extends JpaRepository<Usuario, Long> {
     // No es necesario agregar métodos aquí a menos que necesites consultas personalizadas (Query Methods)

    //Buscar por nombre exacto (1)
    List<Usuario> findByNombre(String nombre);
    //buscar por documento
    Optional<Usuario>  findByDocumento(String documento);
    //si me piden un filtro o consulta personalizada si no exite poner un campo en el modelo

    //buscar por nombres que contengan nnn (lista)
   List<Usuario> findByNombreContaining(String nombre);
    //buscar por edad (lista)
    List<Usuario> findByEdad(Integer edad);

    
    Optional<Usuario> findByCorreo(String correo);

    


   
}

