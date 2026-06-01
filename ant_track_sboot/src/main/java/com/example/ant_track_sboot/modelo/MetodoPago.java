
package com.example.ant_track_sboot.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.modelo.utils.Franquicia;
import com.example.ant_track_sboot.modelo.utils.MedioPago;
import com.fasterxml.jackson.annotation.JsonIgnore;

// Esta clase la trabaja Mafe H
// Datos: id, formaPago (efectivo, tarjeta), franquicia (Bancolombia, Davivienda), estado (activo/inactivo)
// descripcion(se refiere a una breve descripcion del metodo de pago, por ejemplo: 
// "Tarjeta de credito Visa").

@Entity
@Table(name = "metodos_pago")
public class MetodoPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_pago", nullable = false)
    private MedioPago formaPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "franquicia", nullable = false)
    private Franquicia franquicia;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private Estado estado;

    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;

    
    // Relación UNO a MUCHOS con Gasto (lado inverso)
    // Un método de pago puede usarse en muchos gastos
    @JsonIgnore
    @OneToMany(mappedBy = "metodoPago")
    private List<Gasto> gastos;



    //Constructor vacio
    public MetodoPago() {
    }

    //CONSTRUCTOR FULL 
    
    

    public Long getId() {
        return id;
    }

    public MetodoPago(MedioPago formaPago, Franquicia franquicia, String descripcion) {
        this.formaPago = formaPago;
        this.franquicia = franquicia;
        this.estado = Estado.ACTIVO; // va por defecto no va en parametros
        this.descripcion = descripcion;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedioPago getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(MedioPago formaPago) {
        this.formaPago = formaPago;
    }

    public Franquicia getFranquicia() {
        return franquicia;
    }

    public void setFranquicia(Franquicia franquicia) {
        this.franquicia = franquicia;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Gasto> getGastos() {
        return gastos;
    }

       

}