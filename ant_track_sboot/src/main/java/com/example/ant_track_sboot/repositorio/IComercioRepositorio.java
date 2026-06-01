package com.example.ant_track_sboot.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ant_track_sboot.modelo.Comercio;


@Repository
public interface IComercioRepositorio extends JpaRepository <Comercio, Long> {

    //ya este codigo es capaz de realizar las operaciones basicas de CRUD
    //  (Guardar, Buscar por ID, Buscar todos los registros, Modificar,
    // Crear, Leer, Actualizar, Eliminar)
    //  para la entidad Comercio sin necesidad de escribir código adicional.


//ejemplo para busqueda personalizada:

//buscar por nombre exacto(lista)
List<Comercio> findByNombreComercio(String nombreComercio);

//buscar por documento(1)
Optional<Comercio> findByNit(String nit);

//buscar por nombres que contengan nnn(lista)
List<Comercio> findByNombreComercioContaining(String nombreComercio);



}
