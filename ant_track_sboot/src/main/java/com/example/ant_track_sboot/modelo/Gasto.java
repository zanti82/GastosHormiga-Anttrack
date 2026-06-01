package com.example.ant_track_sboot.modelo;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;



@Entity
public class Gasto {

    @Id  // por primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) //autoincrementable
    private Long id;

    @Column(name = "descripcion", length = 200) //Columna
    private String descripcion;

    @Column(name = "valor", nullable = false) //Columna obligatoria
    private BigDecimal valor;
    
    @Column(name = "fecha_gasto", nullable = false ) //Columna obligatoria
    private LocalDateTime fecha;

    @ManyToOne  //un usuario tiene muchos gastos
    @JoinColumn(name = "fk_usuario", referencedColumnName = "id")
    private Usuario usuario;

    @ManyToOne // gastos tiene una forma de pago(aunque se prodia decir que es many to many) 
    @JoinColumn(name = "fk_metodoPago", referencedColumnName = "id")
    private MetodoPago metodoPago; // se debe relacionar con la Clase MetodoPago.

    @ManyToOne //a una categoria pertnecen muchos gastos
    @JoinColumn(name = "fk_categoria", referencedColumnName = "id")
    private Categoria categoria;

    @ManyToOne // a un comercio pertenece mucgos gastos (aunque puede pagar en varios comercios)
    @JoinColumn(name = "fk_comercio", referencedColumnName = "id")
    private Comercio comercio;

    
    //Constructor vacio
    public Gasto() {
    }
    public Gasto(String descripcion, BigDecimal valor, Categoria categoria,
        MetodoPago metodoPago, Comercio comercio,  Usuario usuario) {
        this.descripcion = descripcion;
        this.valor = valor;
        this.categoria = categoria;
        this.metodoPago = metodoPago;
        this.comercio = comercio;
        this.usuario = usuario;
        this.fecha = LocalDateTime.now();
    
    }

    //GETTER AND SETTER
    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
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


    public LocalDateTime getFecha() {
        return fecha;
    }


    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }


    public Usuario getUsuario() {
        return usuario;
    }


    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


    public MetodoPago getMetodoPago() {
        return metodoPago;
    }


    public void setMetodoPago(MetodoPago metodoPago) {
        this.metodoPago = metodoPago;
    }


    public Categoria getCategoria() {
        return categoria;
    }


    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }


    public Comercio getComercio() {
        return comercio;
    }


    public void setComercio(Comercio comercio) {
        this.comercio = comercio;
    }

    

    

}