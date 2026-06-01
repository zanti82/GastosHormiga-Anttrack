package com.example.ant_track_sboot.DTO;


//dto para mennejo de login, evita info sensible

public class LoginRequestDTO {
    private String correo;
    private String password;
    
    // Constructores
    public LoginRequestDTO() {
    }
    
    public LoginRequestDTO(String correo, String password) {
        this.correo = correo;
        this.password = password;
    }
    
    // Getters y Setters
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
    
}
