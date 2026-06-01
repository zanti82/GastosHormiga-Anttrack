package com.example.ant_track_sboot.servicio;

import com.example.ant_track_sboot.modelo.Categoria;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.repositorio.ICategoriaRepositorio;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service //le dice a Spring que esta clase es un servicio.
public class CategoriaServicio{

   
    private ICategoriaRepositorio categoriaRepositorio;

    //inyeccion CONSTRUCTOR
    public CategoriaServicio(ICategoriaRepositorio categoriaRepository) {
        this.categoriaRepositorio = categoriaRepository;
    }

    // 1. BUSCAR TODOS
   
    public List<Categoria> buscarTodos() {
        return categoriaRepositorio.findAll();
    }

    // 2. GUARDAR
   
    public Categoria crearCategoria(Categoria categoria) {
        return categoriaRepositorio.save(categoria);
    }

    // 3. BUSCAR POR ID
  
    public Categoria buscarPorId(Long id) {
        Optional <Categoria> categoriaBuscar = categoriaRepositorio.findById(id);

        if(categoriaBuscar.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }else{
            return categoriaBuscar.get();
        }
    }

   
    // 4. EDITAR
   
    public Categoria editarCategoria(Long id, Categoria categoriaActualizada) {
        Categoria categoriaExistente = buscarPorId(id);

        categoriaExistente.setNombre(categoriaActualizada.getNombre());
        categoriaExistente.setDescripcion(categoriaActualizada.getDescripcion());
        categoriaExistente.setPresupuestoMaximoMensual(categoriaActualizada.getPresupuestoMaximoMensual());
        
       
        return categoriaRepositorio.save(categoriaExistente);
    }

    // 5. ELIMINAR para desarrollo
      
    public boolean eliminar(Long id) {
        Optional<Categoria> categoriaBuscar = categoriaRepositorio.findById(id);
        if(!categoriaBuscar.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }else{
            categoriaRepositorio.deleteById(id);
            return true;
        }
    }

    // 5. activar 
      
    public boolean activaCategoria(Long id) {
        Optional<Categoria> categoriaBuscar = categoriaRepositorio.findById(id);
        if(!categoriaBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
           Categoria categoriaActivar = categoriaBuscar.get();
           categoriaActivar.setEstado(Estado.ACTIVO);
           categoriaRepositorio.save(categoriaActivar);
           return true;
       }
       // 6. desactivasr
      
    public boolean desactivaCategoria(Long id) {
        Optional<Categoria> categoriaBuscar = categoriaRepositorio.findById(id);
        if(!categoriaBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
           Categoria categoriaDesaActivar = categoriaBuscar.get();
           categoriaDesaActivar.setEstado(Estado.INACTIVO);
           categoriaRepositorio.save(categoriaDesaActivar);
           return true;
       }
}