package com.example.ant_track_sboot.DTO;

public class CategoriaGastoDTO {

    private String nombreCategoria;
    private Double gastoReal;
    private Double porcentajeDelTotal;

    
    public CategoriaGastoDTO(String nombreCategoria, Double gastoReal, Double porcentajeDelTotal) {
        this.nombreCategoria = nombreCategoria;
        this.gastoReal = gastoReal;
        this.porcentajeDelTotal = porcentajeDelTotal;
    }
    
    public String getNombreCategoria() {
        return nombreCategoria;
    }
    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }
    public Double getGastoReal() {
        return gastoReal;
    }
    public void setGastoReal(Double gastoReal) {
        this.gastoReal = gastoReal;
    }
    public Double getPorcentajeDelTotal() {
        return porcentajeDelTotal;
    }
    public void setPorcentajeDelTotal(Double porcentajeDelTotal) {
        this.porcentajeDelTotal = porcentajeDelTotal;
    }

    
    
}
