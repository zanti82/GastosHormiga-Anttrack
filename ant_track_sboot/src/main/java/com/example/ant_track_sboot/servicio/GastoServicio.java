package com.example.ant_track_sboot.servicio;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.ant_track_sboot.DTO.CategoriaGastoDTO;
import com.example.ant_track_sboot.DTO.ComercioGastoDTO;
import com.example.ant_track_sboot.DTO.GastoDTO;
import com.example.ant_track_sboot.DTO.GastoMensualDTO;
import com.example.ant_track_sboot.DTO.MetodoPagoGastoDTO;
import com.example.ant_track_sboot.DTO.ResumenMensualDTO;
import com.example.ant_track_sboot.modelo.Categoria;
import com.example.ant_track_sboot.modelo.Comercio;
import com.example.ant_track_sboot.modelo.Gasto;
import com.example.ant_track_sboot.modelo.MetodoPago;
import com.example.ant_track_sboot.modelo.Usuario;
import com.example.ant_track_sboot.repositorio.IGastoRepositorio;

@Service
public class GastoServicio {

    private IGastoRepositorio gastoRepositorio;
    private final CategoriaServicio categoriaServicio;
    private final MetodoPagoServicio metodoPagoServicio;
    private final ComercioServicio comercioServicio;
    private final UsuarioServicio usuarioServicio;

  
 
    public GastoServicio(
        IGastoRepositorio gastoRepositorio,
        CategoriaServicio categoriaServicio,
        MetodoPagoServicio metodoPagoServicio,
        ComercioServicio comercioServicio,
        UsuarioServicio usuarioServicio
    ) {
        this.gastoRepositorio = gastoRepositorio;
        this.categoriaServicio = categoriaServicio;
        this.metodoPagoServicio = metodoPagoServicio;
        this.comercioServicio = comercioServicio;
        this.usuarioServicio = usuarioServicio;
    }
     

    //1. 1 guardar validadando gasto

    public Gasto guardarGasto(GastoDTO dto){ 

         //parametros con ID para que haga la tabal solo con id, no con objetos

        Categoria categoria = categoriaServicio.buscarPorId(dto.categoriaId);
        MetodoPago metodoPago = metodoPagoServicio.buscarPorId(dto.metodoPagoId);
        Comercio comercio = comercioServicio.buscar_comercio_id(dto.comercioId);
        Usuario usuario = usuarioServicio.buscarPorId(dto.usuarioId);

        if(dto.getDescripcion() == null || dto.getDescripcion().isBlank() 
            || dto.getDescripcion().isEmpty() ){

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "la descripcion e necesaria"
            );
            
        }

        //validando numero
        if(dto.getValor() == null || dto.getValor().compareTo(BigDecimal.ZERO) <= 0){
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "debe se un numero, no letras y mayor que 0"
            );
        }

        Gasto gasto = new Gasto(
            dto.descripcion,
            dto.valor,
            categoria,
            metodoPago,
            comercio,
            usuario
        );


    return gastoRepositorio.save(gasto);
        

    }

    // 2. BUSCAR TODOS
   
    public List<Gasto> buscarTodos() {
        return gastoRepositorio.findAll();
    }

    // 3. BUSCAR POR ID
     
    public Gasto buscarPorId(Long id) {
        
        Optional<Gasto> gasto = gastoRepositorio.findById(id);
       
        if (!gasto.isPresent()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "no existe el gasto buscado"
            );
        }
        return gasto.get(); //funcion del optional

       
    }

    // 4. BUSCAR POR ATRIBUTO (nombre parcial)
   
    public List<Gasto> buscarPorNombre(String nombre) {
        return gastoRepositorio.findByDescripcionContaining(nombre);
    }

  

    // 5. EDITAR
   
    public Gasto editar(Long id, GastoDTO dto) {

        Optional<Gasto> gastoExistente = gastoRepositorio.findById(id);
       
        if (!gastoExistente.isPresent()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "no existe el gasto buscado"
            );
        }

        Categoria categoria = categoriaServicio.buscarPorId(dto.getCategoriaId());
        MetodoPago metodoPago = metodoPagoServicio.buscarPorId(dto.getMetodoPagoId());
        Comercio comercio = comercioServicio.buscar_comercio_id(dto.getComercioId());
    
        Gasto gastoEditado = gastoExistente.get();

        gastoEditado.setDescripcion(dto.getDescripcion());
        gastoEditado.setValor(dto.getValor());
        gastoEditado.setCategoria(categoria);
        gastoEditado.setMetodoPago(metodoPago);
        gastoEditado.setComercio(comercio);
    
        return gastoRepositorio.save(gastoEditado);


     }

    // 6. ELIMINAR solo para desarrollo
  
    public void eliminar(Long id) {
        Gasto gasto = buscarPorId(id);
        gastoRepositorio.delete(gasto);
    }

     // 4. BUSCAR POR ATRIBUTO (nombre parcial)
   
     public List<Gasto> buscarPorID(Long id) {
        return gastoRepositorio.findByUsuarioId(id);
    }

    // ─────────────────────────────────────────────
    // MÉTODO PRIVADO: construye el rango del mes
    // Lo usan todos los métodos que filtran por mes
    // ─────────────────────────────────────────────
    private LocalDateTime[] calcularRangoMes(int mes, int anio) {
        LocalDateTime inicio = LocalDateTime.of(anio, mes, 1, 0, 0, 0);
        LocalDateTime fin = inicio
                .withDayOfMonth(inicio.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59);
        return new LocalDateTime[]{inicio, fin};
    }

    // ─────────────────────────────────────────────
    // MÉTODO PRIVADO: nombres de los meses
    // Para que el gráfico anual muestre "Enero" en vez de 1
    // ─────────────────────────────────────────────
    private String nombreMes(int numeroMes) {
        String[] meses = {"Enero","Febrero","Marzo","Abril","Mayo","Junio",
                          "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"};
        return meses[numeroMes - 1];
    }

    // ─────────────────────────────────────────────
    // 1. Gastos agrupados por categoría
    //    → alimenta gráfico de pie o barras
    // ─────────────────────────────────────────────
    public List<CategoriaGastoDTO> obtenerGastosPorCategoria(Long usuarioId, int mes, int anio) {
        LocalDateTime[] rango = calcularRangoMes(mes, anio);

        List<Object[]> resultados = gastoRepositorio
                .findGastoAgrupadoPorCategoria(usuarioId, rango[0], rango[1]);

        // Primero calculamos el total para sacar el porcentaje
        double totalGastado = resultados.stream()
        .mapToDouble(row -> ((BigDecimal) row[1]).doubleValue())
        .sum();

        return resultados.stream().map(row -> {
            Categoria categoria = (Categoria) row[0];
            Double gasto = ((BigDecimal) row[1]).doubleValue();
            Double porcentaje = totalGastado > 0
                    ? Math.round((gasto / totalGastado * 100) * 10.0) / 10.0
                    : 0.0;
            return new CategoriaGastoDTO(categoria.getNombre(), gasto, porcentaje);
        }).collect(Collectors.toList());
    }

    // ─────────────────────────────────────────────
    // 2. Resumen mensual del usuario
    //    → alimenta tarjetas del dashboard
    // ─────────────────────────────────────────────
    public ResumenMensualDTO obtenerResumenMensual(Long usuarioId, int mes, int anio) {
        LocalDateTime[] rango = calcularRangoMes(mes, anio);

        // Traemos todos los gastos del mes y sumamos
        List<Gasto> gastos = gastoRepositorio
                .findByUsuarioIdAndFechaBetween(usuarioId, rango[0], rango[1]);

        BigDecimal totalGastado = gastos.stream()
                .map((Gasto::getValor))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Buscamos el presupuesto del usuario
        Usuario usuario = usuarioServicio.buscarPorId(usuarioId);
                

        BigDecimal presupuesto = usuario.getPresupMensual();
        BigDecimal disponible = presupuesto.subtract(totalGastado);
        Double porcentajeUsado = presupuesto.compareTo(BigDecimal.ZERO) > 0
                ? totalGastado.divide(presupuesto, 4, RoundingMode.HALF_UP)
                              .multiply(BigDecimal.valueOf(100))
                              .doubleValue()
                : 0.0;

        return new ResumenMensualDTO(totalGastado, presupuesto, disponible, porcentajeUsado);
    }

    // ─────────────────────────────────────────────
    // 3. Gastos agrupados por mes en un año
    //    → alimenta gráfico de barras/línea anual
    //    Rellena con 0 los meses sin gastos
    // ─────────────────────────────────────────────
    public List<GastoMensualDTO> obtenerGastosPorMes(Long usuarioId, int anio) {
        List<Object[]> resultados = gastoRepositorio
                .findGastoAgrupadoPorMes(usuarioId, anio);

        // Convertimos los resultados en un mapa { numeroMes -> total }
        Map<Integer, Double> mapaGastos = resultados.stream()
                .collect(Collectors.toMap(
                        row -> (Integer) row[0],
                        row -> ((BigDecimal) row[1]).doubleValue()  // ← fix
                ));

        // Generamos los 12 meses, poniendo 0 donde no hay datos
        // Esto es clave para que el gráfico no tenga huecos
        List<GastoMensualDTO> resultado = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            resultado.add(new GastoMensualDTO(
                    nombreMes(i),
                    mapaGastos.getOrDefault(i, 0.0)
            ));
        }
        return resultado;
    }

    // ─────────────────────────────────────────────
    // 4. Gastos agrupados por método de pago
    //    → alimenta gráfico de pie
    // ─────────────────────────────────────────────
    public List<MetodoPagoGastoDTO> obtenerGastosPorMetodoPago(Long usuarioId, int mes, int anio) {
        LocalDateTime[] rango = calcularRangoMes(mes, anio);

        List<Object[]> resultados = gastoRepositorio
                .findGastoAgrupadoPorMetodoPago(usuarioId, rango[0], rango[1]);

        return resultados.stream().map(row -> {
            MetodoPago metodo = (MetodoPago) row[0];
            Double total = ((BigDecimal) row[1]).doubleValue();
            return new MetodoPagoGastoDTO(metodo.getFormaPago(), total);
        }).collect(Collectors.toList());
    }

    // ─────────────────────────────────────────────
    // 5. Top comercios con mayor gasto
    //    → alimenta ranking / gráfico de barras horizontal
    // ─────────────────────────────────────────────
    public List<ComercioGastoDTO> obtenerTopComercios(Long usuarioId, int mes, int anio, int top) {
        LocalDateTime[] rango = calcularRangoMes(mes, anio);

        List<Object[]> resultados = gastoRepositorio
                .findGastoAgrupadoPorComercio(usuarioId, rango[0], rango[1]);

        return resultados.stream()
                .limit(top)   // limitamos al top N aquí en el Service
                .map(row -> {
                    Comercio comercio = (Comercio) row[0];
                    Double total = ((BigDecimal) row[1]).doubleValue();
                    return new ComercioGastoDTO(comercio.getNombreComercio(), total);
                }).collect(Collectors.toList());
    }
}

    



    

