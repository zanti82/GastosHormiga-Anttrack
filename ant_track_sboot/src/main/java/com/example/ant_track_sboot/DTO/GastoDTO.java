package com.example.ant_track_sboot.DTO;

import java.math.BigDecimal;

public class GastoDTO {
    public String descripcion;
    public BigDecimal valor;
    public Long categoriaId;
    public Long metodoPagoId;
    public Long comercioId;
    public Long usuarioId;

    
    public GastoDTO() {
    }
    
    public GastoDTO(String descripcion, BigDecimal valor, Long categoriaId, Long metodoPagoId, Long comercioId,
            Long usuarioId) {
        this.descripcion = descripcion;
        this.valor = valor;
        this.categoriaId = categoriaId;
        this.metodoPagoId = metodoPagoId;
        this.comercioId = comercioId;
        this.usuarioId = usuarioId;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public BigDecimal getValor() {
        return valor;
    }
    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    public Long getCategoriaId() {
        return categoriaId;
    }
    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
    public Long getMetodoPagoId() {
        return metodoPagoId;
    }
    public void setMetodoPagoId(Long metodoPagoId) {
        this.metodoPagoId = metodoPagoId;
    }
    public Long getComercioId() {
        return comercioId;
    }
    public void setComercioId(Long comercioId) {
        this.comercioId = comercioId;
    }
    public Long getUsuarioId() {
        return usuarioId;
    }
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    
    
}
