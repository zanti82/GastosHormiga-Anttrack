package com.example.ant_track_sboot.DTO;

import com.example.ant_track_sboot.modelo.utils.MedioPago;

public class MetodoPagoGastoDTO {

    private MedioPago nombreMetodoPago;
    private Double totalGastado;

    public MetodoPagoGastoDTO(MedioPago nombreMetodoPago, Double totalGastado) {
        this.nombreMetodoPago = nombreMetodoPago;
        this.totalGastado = totalGastado;
    }

    public MedioPago getNombreMetodoPago() {
        return nombreMetodoPago;
    }

    public void setNombreMetodoPago(MedioPago nombreMetodoPago) {
        this.nombreMetodoPago = nombreMetodoPago;
    }

    public Double getTotalGastado() {
        return totalGastado;
    }

    public void setTotalGastado(Double totalGastado) {
        this.totalGastado = totalGastado;
    }

    

    
    
}
