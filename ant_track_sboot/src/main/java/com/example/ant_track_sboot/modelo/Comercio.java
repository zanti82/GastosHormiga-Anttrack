package com.example.ant_track_sboot.modelo;

import java.time.LocalDateTime;
import java.util.List;

import com.example.ant_track_sboot.modelo.utils.Estado;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

// Anotaciones para indicar que esta clase es una entidad y se mapea a una tabla en la base de datos
@Entity
@Table(name = "comercio")

public class Comercio {

/*Colocar Datos para tabla */    

@Id //anotacion id  para indicar que es la clave primaria
@GeneratedValue(strategy = GenerationType.IDENTITY) // anotacion para indicar que el valor se genera automaticamente por la base de datos
private Long id;

@Column(name = "nit",nullable = false, unique = false, length = 30)
private String nit;

@Column(name = "nombreComercio",nullable = false, unique = false, length = 100)
private String nombreComercio;

@Column(name = "contacto",nullable = false, unique = false, length = 100)
private String telefono;

@Column(name = "direccion",nullable = false, unique = false, length = 100)
private String direccion;

@Column(name = "HorarioAtencion",nullable = false, unique = false, length = 30)
private String horarioAtencion;

@Column(name = "fechaCreacion",nullable = false, unique = false)
private LocalDateTime fechaCreacion;

@Enumerated(EnumType.STRING)
@Column(nullable = false)
private Estado estado;


//relacion bd

 @JsonIgnore
@OneToMany(mappedBy = "comercio")
private List<Gasto> gastos;

//CONSTRUCTORES
public Comercio() {
}



/*Creacion de get and set de cada dato */

public Comercio(String nit, String nombreComercio, String telefono, String direccion, String horarioAtencion
        ) {
    this.nit = nit;
    this.nombreComercio = nombreComercio;
    this.telefono = telefono;
    this.direccion = direccion;
    this.horarioAtencion = horarioAtencion;
    this.fechaCreacion = LocalDateTime.now(); //no van en los parametros
    this.estado = Estado.ACTIVO; // van por default
}



public String getNit() {
    return nit;
}

public void setNit(String nit) {
    this.nit = nit;
}

public String getNombreComercio() {
    return nombreComercio;
}

public void setNombreComercio(String nombreComercio) {
    this.nombreComercio = nombreComercio;
}

public String getDireccion() {
    return direccion;
}

public void setDireccion(String direccion) {
    this.direccion = direccion;
}

public LocalDateTime getFechaCreacion() {
    return fechaCreacion;
}

public void setFechaCreacion(LocalDateTime fechaCreacion) {
    this.fechaCreacion = fechaCreacion;
}

public String getHorarioAtencion() {
    return horarioAtencion;
}

public void setHorarioAtencion(String horarioAtencion) {
    this.horarioAtencion = horarioAtencion;
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getTelefono() {
    return telefono;
}

public void setTelefono(String telefono) {
    this.telefono = telefono;
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

