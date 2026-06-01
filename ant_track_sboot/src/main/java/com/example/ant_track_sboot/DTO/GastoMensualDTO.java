package com.example.ant_track_sboot.DTO;

public class GastoMensualDTO {

    private String mes;      // "Enero", "Febrero"...
    private Double totalGastado;

    public GastoMensualDTO(String mes, Double totalGastado) {
        this.mes = mes;
        this.totalGastado = totalGastado;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public Double getTotalGastado() {
        return totalGastado;
    }

    public void setTotalGastado(Double totalGastado) {
        this.totalGastado = totalGastado;
    }

    

    
    
}
