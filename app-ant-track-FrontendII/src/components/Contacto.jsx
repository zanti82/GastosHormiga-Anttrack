import React, { useState } from 'react'
import Swal from 'sweetalert2';

const Contacto = () => {

    const onSubmit = async (event) => {
        event.preventDefault();

        Swal.fire({
            title:'Eniviando...',
            text: 'Por favor espera un momento',
            allowOutsideClick: false,
            didOpen: ()=>{
                Swal.showLoading()
            }
        })
        const formData = new FormData(event.target);
        formData.append("access_key", "4a1d600c-03c9-48d5-8ac0-fa69354ff586");

        try{
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
           Swal.fire({
                    title: '¡Éxito!',
                    text: 'Tu mensaje ha sido enviado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#2563eb'
                });
            event.target.reset();
        } else {
            Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar el mensaje',
                    icon: 'error'
                });
            }
        }catch(error){
        
            Swal.fire({
                title: 'Error de conexión',
                text: 'No se pudo contactar con el servidor',
                icon: 'error'
            });
        }
    };
    return (
        <div className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden bg-blue-50' id='Contacto'>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Contacta <span className='underline underline-offset-4 decoration-1 under font-light'>con nosotros</span></h1>
            <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>Listo para dar el siguiente paso</p>

            <form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-8'>
                <div className='flex flex-wrap'>
                    <div className='w-full md:w-1/2 text-left'>
                        Tu nombre
                        <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="text" name='Name' placeholder='Tu nombre' required/>
                    </div>
                    <div className='w-full md:w-1/2 text-left md:pl-4'>
                        Tu Email
                        <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="email" name='Email' placeholder='Tu email' required/>
                    </div>
                </div>
                <div className='my-6 text-left'>
                    Mensaje
                    <textarea className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none' 
                    name="Mensaje" placeholder='Deja tu mensaje' required></textarea>
                </div>
                <button className='bg-blue-600 text-white py-2 px-12 mb-10 rounded cursor-pointer transition-transform duration-300 hover:-translate-y-1'>Enviar mensaje</button>
            </form>
        </div>
    )
}

export default Contacto