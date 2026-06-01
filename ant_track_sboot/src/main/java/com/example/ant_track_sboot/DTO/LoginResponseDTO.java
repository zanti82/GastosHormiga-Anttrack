package com.example.ant_track_sboot.DTO;

public class LoginResponseDTO {
   
    
    private String identificacion;
    private String correo;
    private String rol;
    private String token;  // JWT (después lo implementamos)
    private String message;
    
    // Constructores
    public LoginResponseDTO() {
        
    }
    
    public LoginResponseDTO(String identificacion, String correo, 
        String rol, String message) {
            
        this.identificacion = identificacion;
        this.correo = correo;
        this.rol = rol;
        this.message = message;
    }
    
    // Getters y Setters
    public String getIdentificacion() {
        return identificacion;
    }
    
    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }
    
    public String getCorreo() {
        return correo;
    }
    
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    
    public String getRol() {
        return rol;
    }
    
    public void setRol(String rol) {
        this.rol = rol;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }

    
}
