## Ant Track Spring Boot

Aplicación de seguimiento de gastos hormiga desarrollada en Spring Boot.

## Descripción
Permite a los usuarios registrar y categorizar sus gastos pequeños del día a día,
con alertas y control de presupuesto mensual.

## Entidades
- **Usuario** → usuario de la aplicación
- **Categoria** → agrupa los gastos por tipo
- **Gasto** → registro de cada gasto realizado
- **Comercio** → lugar donde se realizó el gasto
- **MetodoPago** → forma de pago utilizada

## Relaciones

- Un Gasto pertenece a un ususario, una Categoria, un Comercio y un MetodoPago

## Tecnologías
- Java 17
- Spring Boot
- JPA / Hibernate
- MySQL

## Flujo de trabajo
- Rama principal: `main`
- Rama de desarrollo: `develop`
- Ramas por integrante: `feat-nombre`

## JSON EJEMPLOS POSTMAN

METODOS PAGO

{
  "formaPago": "EFECTIVO",
  "franquicia": "OTRA",
  "descripcion": "Pago mediante efectivo"
}

CATEGORIA

{
  "nombre": "Arriendo",
  "descripcion": "Todo tipo de arriendos",
  "presupuestoMaximoMensual": 3000000,
  "gastoMensual": 0
 }

 COMERCIO

 {
  "nit": "20222828281",
  "nombreComercio": "confama",
  "telefono": "30011133310",
  "direccion": "Calle 20 40, medellin",
  "horarioAtencion": "8am-5pm"
}

GASTOS

{
  "descripcion": "Arriendo",
  "valor": 1000000,
  "categoriaId": 2,
  "usuarioId": 2,
  "metodoPagoId": 1,
  "comercioId": 5
}

USAURIOS



{
   "nombre": "Julián Esteban Rojas PASS 1111",
    "tipoDocumento": "PASAPORTE",
    "documento": "CE456789012",
    "edad": 35,
    "genero": "Masculino",
    "correo": "julian.rojas@email.com",
    "telefono": "3159876543",
    "presupMensual": 4500000,
    "password": "1111"
}
