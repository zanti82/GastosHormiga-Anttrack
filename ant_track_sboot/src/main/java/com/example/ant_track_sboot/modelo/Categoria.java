package com.example.ant_track_sboot.modelo;


import java.util.List;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(length = 250)
    private String descripcion;

    @Column(nullable = false)
    private Double presupuestoMaximoMensual;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;

    @JsonIgnore
    @OneToMany(mappedBy = "categoria")
    private List<Gasto> gastos;


    //CONSTRUCTOR VACIO
    public Categoria() {
    }

    //CONSTRUCTOR FULL
   
   

    public Categoria(String nombre, String descripcion, Double presupuestoMaximoMensual ) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.presupuestoMaximoMensual = presupuestoMaximoMensual;
        this.estado = Estado.ACTIVO; //por default
     }

    public Long getId() {
        return id;
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPresupuestoMaximoMensual() {
        return presupuestoMaximoMensual;
    }

    public void setPresupuestoMaximoMensual(Double presupuestoMaximoMensual) {
        this.presupuestoMaximoMensual = presupuestoMaximoMensual;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public List<Gasto> getGastos() {
        return gastos;
    }
    
}