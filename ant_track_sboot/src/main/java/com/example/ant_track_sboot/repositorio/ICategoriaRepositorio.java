package com.example.ant_track_sboot.repositorio;//Define el paquete donde está tu repositorio

import org.springframework.data.jpa.repository.JpaRepository;//Importa la interfaz JpaRepository de Spring Data JPA
import org.springframework.stereotype.Repository;//Importa la anotación @Repository.Marca la interfaz como un componente de Spring que maneja persistencia
import com.example.ant_track_sboot.modelo.Categoria;//Importa la entidad Categoria sobre la cual va a operar.

@Repository
public interface ICategoriaRepositorio extends JpaRepository<Categoria, Long> {

  // Spring Data JPA genera automáticamente la implementación 
    //hace el crud: save(), findAll(), findById(), deleteById(), etc.
    
}