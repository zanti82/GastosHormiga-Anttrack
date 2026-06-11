package com.example.ant_track_sboot.modelo;

import java.time.LocalDateTime;
import java.util.List;

import com.example.ant_track_sboot.modelo.utils.Estado;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "comercio")
public class Comercio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_comercio", nullable = false, length = 100)
    private String nombreComercio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario creadoPor;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Estado estado;

    @JsonIgnore
    @OneToMany(mappedBy = "comercio")
    private List<Gasto> gastos;

    // Constructors
    public Comercio() {
    }

    public Comercio(String nombreComercio, Usuario creadoPor) {
        this.nombreComercio = nombreComercio;
        this.creadoPor = creadoPor;
        this.fechaCreacion = LocalDateTime.now();
        this.estado = Estado.ACTIVO;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreComercio() {
        return nombreComercio;
    }

    public void setNombreComercio(String nombreComercio) {
        this.nombreComercio = nombreComercio;
    }

    public Usuario getCreadoPor() {
        return creadoPor;
    }

    public void setCreadoPor(Usuario creadoPor) {
        this.creadoPor = creadoPor;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
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