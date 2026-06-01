
import Clogo from "./cardlogo.png"
import anttra from "./ant.png"
import men_icon from './menu_icon.svg'
import x_icon from './x_icon.svg'
import izq from './left.svg'
import der from './right.svg'
import ztar from './stars.svg'
import insta from './instagram.svg'
import face from './facebook.svg'
import yout from './youtube.svg'
import regisPago from './regisPago.png'
import regisDato from './regisDato.png'
import categor from './categor.png'
import visuali from './visuali.png'
import chat from './chat.png'
import testim1 from './testim1.jpg'
import testim2 from './testim2.jpg'
import testim3 from './testim3.jpg'
import about from './pexels14.jpg'



export const assets ={

    men_icon,
    x_icon,
    izq,
    der,
    ztar,
    insta,
    face,
    yout,
    regisPago,
    regisDato,
    categor,
    visuali,
    chat,
    testim1,
    testim2,
    testim3,
    anttra,
    about

}

export const projectsData = [
    {
    title: "Registrate",
    price: "Crea tu cuenta y empieza a controlar tus gastos desde el primer día.",
    image: Clogo
},
   {
    title: "Agrega tus metodos de pago",
    price: "Registra cómo pagas para llevarte un control más preciso.",
    image: regisPago
},
   {
    title: "Registra tus datos",
    price: "Anota cada gasto en segundos, sin procesos complicados.",
    image: regisDato
},
   {
    title: "Organiza por categorias",
    price: "Clasifica tus gastos y descubre en qué estás gastando de más.",
    image: categor
},
   {
    title: "Visualiza y mejora",
    price: "Analiza tus habitos y toma mejores deciciones.",
    image: visuali
},
   {
    title: "¿Tienes dudas?",
    price: "Estamos aqui para ayudarte. Escribenos.",
    image: chat
}
];

export const testimoniData = [
    {
        name: "Claudia Marin",
        title: "Admimistradora",
        image: testim1,
        alt: "peril de persona",
        rating: 5,
        text: "¿No sabes a dónde va tu dinero? Con esta app, puedes poner en orden el presupuesto familiar."
    },
     {
        name: "Mario Sabio",
        title: "Ingeniero",
        image: testim3,
        alt: "peril de Mario Sabio",
        rating: 4,
        text: "Esta app es una excelente forma de registrar los gastos mientras gasto, ya que es muy fácil preguntarme dónde ha ido el dinero que estaba en la cuenta bancaria."
    },
     {
        name: "Paloma Velez",
        title: "Artista",
        image: testim2,
        alt: "peril de Mario Sabio",
        rating: 4,
        text: "He estado usando esta app para hacer un seguimiento de mis gastos, y ha sido un cambio radical. La interfaz es súper intuitiva, lo que facilita mucho seguir dónde va mi dinero."
    }

];



