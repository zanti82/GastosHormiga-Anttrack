package com.example.ant_track_sboot.DTO;


import java.math.BigDecimal;

import com.example.ant_track_sboot.modelo.utils.TipoDocumento;

public class RegisterRequestDTO {

    private String nombre;
    private TipoDocumento tipoDocumento;
    private String documento;
    private Integer edad;
    private String genero;
    private String correo;
    private String password;
    private String telefono;
    private BigDecimal presupMensual;
    private String  direccion;
    
    // Constructores
    public RegisterRequestDTO() {
    }
    
    
    
  
    public RegisterRequestDTO(String nombre, TipoDocumento tipoDocumento, String documento, Integer edad, String genero,
            String correo, String password, String telefono, BigDecimal presupMensual, String direccion) {
        this.nombre = nombre;
        this.tipoDocumento = tipoDocumento;
        this.documento = documento;
        this.edad = edad;
        this.genero = genero;
        this.correo = correo;
        this.password = password;
        this.telefono = telefono;
        this.presupMensual = presupMensual;
        this.direccion = direccion;
    }




    public String getCorreo() {
        return correo;
    }
    
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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




    public BigDecimal getPresupMensual() {
        return presupMensual;
    }




    public void setPresupMensual(BigDecimal presupMensual) {
        this.presupMensual = presupMensual;
    }
    
  

    
}
