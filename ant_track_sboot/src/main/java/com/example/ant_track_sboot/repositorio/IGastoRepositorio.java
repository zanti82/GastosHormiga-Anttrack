package com.example.ant_track_sboot.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ant_track_sboot.modelo.Gasto;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface IGastoRepositorio extends JpaRepository<Gasto, Long >{

    //implemanta todo el  crud clasico

    //buscar por nombre de gasto que contengan(esperamos una lista)

    List<Gasto> findByDescripcion(String descripcion);

    

    // estoe  spara buscar por una sola cosa Optional<Gasto> findByDocumento(String documento);
    
    //buscar por nombre de gasto que contengan(esperamos una lista)

    List<Gasto> findByDescripcionContaining(String descripcion);

    List<Gasto> findByUsuarioId(Long idUsuario);


     // ─────────────────────────────────────────────
    // 1. Gastos de un usuario en un rango de fechas
    //    Uso: base para el resumen mensual
    // ─────────────────────────────────────────────
    List<Gasto> findByUsuarioIdAndFechaBetween(
            Long usuarioId,
            LocalDateTime inicio,
            LocalDateTime fin
    );

    @Query("SELECT g.categoria, SUM(g.valor) " +
           "FROM Gasto g " +
           "WHERE g.usuario.id = :usuarioId " +
           "AND g.fecha BETWEEN :inicio AND :fin " +
           "GROUP BY g.categoria")
    List<Object[]> findGastoAgrupadoPorCategoria(
            @Param("usuarioId") Long usuarioId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin
    );

    @Query("SELECT EXTRACT(MONTH FROM g.fecha), SUM(g.valor) " +
           "FROM Gasto g " +
           "WHERE g.usuario.id = :usuarioId " +
           "AND EXTRACT(YEAR FROM g.fecha) = :anio " +
           "GROUP BY EXTRACT(MONTH FROM g.fecha) " +
           "ORDER BY EXTRACT(MONTH FROM g.fecha) ASC")
    List<Object[]> findGastoAgrupadoPorMes(
            @Param("usuarioId") Long usuarioId,
            @Param("anio") int anio
    );

    @Query("SELECT g.metodoPago, SUM(g.valor) " +
           "FROM Gasto g " +
           "WHERE g.usuario.id = :usuarioId " +
           "AND g.fecha BETWEEN :inicio AND :fin " +
           "GROUP BY g.metodoPago")
    List<Object[]> findGastoAgrupadoPorMetodoPago(
            @Param("usuarioId") Long usuarioId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin
    );

    @Query("SELECT g.comercio, SUM(g.valor) " +
           "FROM Gasto g " +
           "WHERE g.usuario.id = :usuarioId " +
           "AND g.fecha BETWEEN :inicio AND :fin " +
           "GROUP BY g.comercio " +
           "ORDER BY SUM(g.valor) DESC")
    List<Object[]> findGastoAgrupadoPorComercio(
            @Param("usuarioId") Long usuarioId,
            @Param("inicio") LocalDateTime inicio,
            @Param("fin") LocalDateTime fin
    );
}


    

