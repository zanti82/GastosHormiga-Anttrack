package com.example.ant_track_sboot.DTO;

import java.math.BigDecimal;

public class ResumenMensualDTO {
    
    private BigDecimal totalGastado;
    private BigDecimal presupuesto;
    private BigDecimal disponible;
    private Double porcentajeUsado;

    public ResumenMensualDTO(BigDecimal totalGastado, BigDecimal presupuesto, BigDecimal disponible,
            Double porcentajeUsado) {
        this.totalGastado = totalGastado;
        this.presupuesto = presupuesto;
        this.disponible = disponible;
        this.porcentajeUsado = porcentajeUsado;
    }

    public BigDecimal getTotalGastado() {
        return totalGastado;
    }

    public void setTotalGastado(BigDecimal totalGastado) {
        this.totalGastado = totalGastado;
    }

    public BigDecimal getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(BigDecimal presupuesto) {
        this.presupuesto = presupuesto;
    }

    public BigDecimal getDisponible() {
        return disponible;
    }

    public void setDisponible(BigDecimal disponible) {
        this.disponible = disponible;
    }

    public Double getPorcentajeUsado() {
        return porcentajeUsado;
    }

    public void setPorcentajeUsado(Double porcentajeUsado) {
        this.porcentajeUsado = porcentajeUsado;
    }

    
    
    

    
}
