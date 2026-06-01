package com.example.ant_track_sboot.modelo;

import java.util.List;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.modelo.utils.Role;
import com.example.ant_track_sboot.modelo.utils.TipoDocumento;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoDocumento tipoDocumento;

    @Column(nullable = false, length = 20)
    private String documento;

    @Column(nullable = false)
    private Integer edad;

    @Column(nullable = false)
    private String genero;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false)
    private String telefono;
    @Column(nullable = false)
    private String  direccion;

    @Column(nullable = false)
    private BigDecimal presupMensual;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;

    @Column(nullable = true)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column( nullable = false)
    private Estado estado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role rol;

    @Column(name = "ultimo_acceso")
    private LocalDateTime ultimoAcceso;


    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private List<Gasto> gastos;

    //constructor
    public Usuario() {
    }

    

    public Usuario(String nombre, TipoDocumento tipoDocumento, String documento, 
                    Integer edad, String genero,String correo, String telefono, 
                    String direccion,  BigDecimal presupMensual,
                      String password
                 ) {
        this.nombre = nombre;
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.edad = edad;
        this.genero = genero;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.presupMensual = presupMensual;
        this.password = password;
        this.estado = Estado.ACTIVO;
        this.fechaRegistro = LocalDateTime.now();
        this.ultimoAcceso = LocalDateTime.now();
        this.rol = Role.USER;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public BigDecimal getPresupMensual() {
        return presupMensual;
    }

    public void setPresupMensual(BigDecimal presupMensual) {
        this.presupMensual = presupMensual;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Gasto> getGastos() {
        return gastos;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }



    public Role getRol() {
        return rol;
    }

 
    public String getDireccion() {
        return direccion;
    }



    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

   

 

    

    

   
}