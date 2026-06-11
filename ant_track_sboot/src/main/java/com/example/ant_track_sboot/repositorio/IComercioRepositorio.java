package com.example.ant_track_sboot.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ant_track_sboot.modelo.Comercio;


@Repository
public interface IComercioRepositorio extends JpaRepository <Comercio, Long> {

  


//buscar por nombre exacto(lista)
List<Comercio> findByNombreComercio(String nombreComercio);

//buscar por documento(1)
Optional<Comercio> findById(Long id);

//buscar por nombres que contengan nnn(lista)
List<Comercio> findByNombreComercioContaining(String nombreComercio);

List<Comercio> findByCreadoPorId(Long usuarioId);
Comercio findByCreadoPorIdAndNombreComercioContainingIgnoreCase(Long usuarioId, String nombre);


}
