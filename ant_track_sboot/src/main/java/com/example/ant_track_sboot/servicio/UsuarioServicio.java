package com.example.ant_track_sboot.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.modelo.utils.Estado;
import com.example.ant_track_sboot.repositorio.IUsuarioRepositorio;

@Service
public class UsuarioServicio {

    @Autowired
    private IUsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CREAR USUARIO
    public Usuario guardar_usuario(Usuario datos){

        if(datos.getNombre() == null || datos.getNombre().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nombre obligatorio");
        }

        if(datos.getPassword() == null || datos.getPassword().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password obligatorio");
        }

        datos.setPassword(passwordEncoder.encode(datos.getPassword()));

        return usuarioRepositorio.save(datos);
    }

    // LISTAR
    public List<Usuario> buscarTodos(){
        return usuarioRepositorio.findAll();
    }

    // BUSCAR
    public Usuario buscarPorId(Long id){
        return usuarioRepositorio.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no existe"));
    }

    // EDITAR
    public Usuario editar(Long id, Usuario datos){

        Optional<Usuario> usuarioBuscar = usuarioRepositorio.findById(id);
        if(!usuarioBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Usuario u = usuarioBuscar.get();

        u.setNombre(datos.getNombre());
        u.setCorreo(datos.getCorreo());
        u.setDocumento(datos.getDocumento());
        u.setTipoDocumento(datos.getTipoDocumento());
        u.setTelefono(datos.getTelefono());
        u.setDireccion(datos.getDireccion());
        u.setGenero(datos.getGenero());
        u.setEdad(datos.getEdad());
        u.setPresupMensual(datos.getPresupMensual());


        // actualizar password solo si viene
        if(datos.getPassword() != null && !datos.getPassword().isBlank()){
            u.setPassword(passwordEncoder.encode(datos.getPassword()));
        }

        return usuarioRepositorio.save(u);
    }

    // ELIMINAR
    public boolean eliminar_usuario(Long id){

        if(!usuarioRepositorio.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No existe");
        }

        usuarioRepositorio.deleteById(id);
        return true;
    }

    // 11. activar 
      
    public boolean activaUsuario(Long id) {
        Optional<Usuario> usuarioBuscar = usuarioRepositorio.findById(id);
        if(!usuarioBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Usuario usuarioActivar = usuarioBuscar.get();
        usuarioActivar.setEstado(Estado.ACTIVO);
           usuarioRepositorio.save(usuarioActivar);
           return true;
       }
       // 12. desactivar
      
    public boolean desactivaUsuario(Long id) {
        Optional<Usuario> usuarioBuscar = usuarioRepositorio.findById(id);
        if(!usuarioBuscar.isPresent()){
           throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Usuario usuarioDesaActivar = usuarioBuscar.get();
        usuarioDesaActivar.setEstado(Estado.INACTIVO);
           usuarioRepositorio.save(usuarioDesaActivar);
           return true;
       }
}