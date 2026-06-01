
package com.example.ant_track_sboot.repositorio;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ant_track_sboot.modelo.MetodoPago;

@Repository


public interface IMetodoPagoRepositorio extends JpaRepository<MetodoPago,Long> {

    // Aquí puedes agregar métodos personalizados para consultas específicas/personalizadas si es necesario
    //GUARDAR, ACTUALIZAR, ELIMINAR, BUSCAR POR ID, BUSCAR TODOS

    //Buscar por nombre exacto (lista)
    List<MetodoPago> findByDescripcion(String descripcion);

    //Buscar por documento (1)
    //Optional<MetodoPago> findByDocumento(Long id); Si en el metodo no hay documento no se puede 
    // realizar esta busqueda, o si se necesita incluir esta busqueda se debe anexar este campo en el 
    //modelo de MetodoPago

    //Buscar por nombres que contenga nnn (lista)
    List<MetodoPago> findByDescripcionContaining(String descripcion);

    //Buscar por estado (lista)
    List<MetodoPago> findByEstado(String estado);

    //Buscar por franquicia (lista)
    List<MetodoPago> findByFranquicia(String franquicia);

    //Buscar por forma de pago (lista)
    List<MetodoPago> findByFormaPago(String formaPago);

    











}
