package com.example.ant_track_sboot.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ant_track_sboot.DTO.CategoriaGastoDTO;
import com.example.ant_track_sboot.DTO.ComercioGastoDTO;
import com.example.ant_track_sboot.DTO.GastoMensualDTO;
import com.example.ant_track_sboot.DTO.MetodoPagoGastoDTO;
import com.example.ant_track_sboot.DTO.ResumenMensualDTO;
import com.example.ant_track_sboot.servicio.GastoServicio;

@RestController
@RequestMapping("/anttrackapi/v1/reportes")
public class ReporteController {

    private final GastoServicio gastoService;

    public ReporteController(GastoServicio gastoService) {
        this.gastoService = gastoService;
    }

    // ─────────────────────────────────────────────
    // 1. Gastos por categoría
    //    GET /reportes/usuario/{id}/por-categoria?mes=5&anio=2026
    //    → alimenta gráfico de pie / barras por categoría
    // ─────────────────────────────────────────────
    @GetMapping("/usuario/{id}/por-categoria")
    public ResponseEntity<List<CategoriaGastoDTO>> obtenerGastosPorCategoria(
            @PathVariable Long id,
            @RequestParam int mes,
            @RequestParam int anio) {

        List<CategoriaGastoDTO> resultado = gastoService
                .obtenerGastosPorCategoria(id, mes, anio);
        return ResponseEntity.ok(resultado);
    }

    // ─────────────────────────────────────────────
    // 2. Resumen mensual del usuario
    //    GET /api/gastos/usuario/{id}/resumen?mes=5&anio=2026
    //    → alimenta tarjetas del dashboard
    // ─────────────────────────────────────────────
    @GetMapping("/usuario/{id}/resumen")
    public ResponseEntity<ResumenMensualDTO> obtenerResumenMensual(
            @PathVariable Long id,
            @RequestParam int mes,
            @RequestParam int anio) {

        ResumenMensualDTO resultado = gastoService
                .obtenerResumenMensual(id, mes, anio);
        return ResponseEntity.ok(resultado);
    }

    // ─────────────────────────────────────────────
    // 3. Gastos por mes en un año
    //    GET /api/gastos/usuario/{id}/por-mes?anio=2026
    //    → alimenta gráfico de barras / línea anual
    // ─────────────────────────────────────────────
    @GetMapping("/usuario/{id}/por-mes")
    public ResponseEntity<List<GastoMensualDTO>> obtenerGastosPorMes(
            @PathVariable Long id,
            @RequestParam int anio) {

        List<GastoMensualDTO> resultado = gastoService
                .obtenerGastosPorMes(id, anio);
        return ResponseEntity.ok(resultado);
    }

    // ─────────────────────────────────────────────
    // 4. Gastos por método de pago
    //    GET /api/gastos/usuario/{id}/por-metodo-pago?mes=5&anio=2026
    //    → alimenta gráfico de pie por método de pago
    // ─────────────────────────────────────────────
    @GetMapping("/usuario/{id}/por-metodo-pago")
    public ResponseEntity<List<MetodoPagoGastoDTO>> obtenerGastosPorMetodoPago(
            @PathVariable Long id,
            @RequestParam int mes,
            @RequestParam int anio) {

        List<MetodoPagoGastoDTO> resultado = gastoService
                .obtenerGastosPorMetodoPago(id, mes, anio);
        return ResponseEntity.ok(resultado);
    }

    // ─────────────────────────────────────────────
    // 5. Top comercios
    //    GET /api/gastos/usuario/{id}/top-comercios?mes=5&anio=2026&top=5
    //    → alimenta ranking / gráfico de barras horizontal
    // ─────────────────────────────────────────────
    @GetMapping("/usuario/{id}/top-comercios")
    public ResponseEntity<List<ComercioGastoDTO>> obtenerTopComercios(
            @PathVariable Long id,
            @RequestParam int mes,
            @RequestParam int anio,
            @RequestParam(defaultValue = "5") int top) {

        List<ComercioGastoDTO> resultado = gastoService
                .obtenerTopComercios(id, mes, anio, top);
        return ResponseEntity.ok(resultado);
    }


    
}
