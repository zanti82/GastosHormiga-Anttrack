package com.example.ant_track_sboot.DTO;

public class ComercioGastoDTO {

    private String nombreComercio;
    private Double totalGastado;

    public ComercioGastoDTO(String nombreComercio, Double totalGastado) {
        this.nombreComercio = nombreComercio;
        this.totalGastado = totalGastado;
    }

    public String getNombreComercio() {
        return nombreComercio;
    }

    public void setNombreComercio(String nombreComercio) {
        this.nombreComercio = nombreComercio;
    }

    public Double getTotalGastado() {
        return totalGastado;
    }

    public void setTotalGastado(Double totalGastado) {
        this.totalGastado = totalGastado;
    }

    

    
    
}
