let productos = [
  {
    id: 1,
    titulo: "Placa de video NVIDIA GeForce RTX 3080",
    categoria: "Placas de video",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "La GeForce RTX™ 3080 ofrece el rendimiento ultra que los gamers anhelan, alimentada por Ampere, la arquitectura RTX de segunda generación de NVIDIA. Cuenta con núcleos RT y Tensor mejorados, nuevos multiprocesadores de transmisión y una memoria G6X superrápida para una experiencia de juego increíble.",
    precio: "$199999",
    cantidadVenta: 12
  },
  {
    id: 2,
    titulo: "Procesador AMD Ryzen 7 5800X",
    categoria: "Procesadores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "El procesador AMD Ryzen™ 7 5800X tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.8 GHz que puede subir hasta los 4.7 GHz. Es compatible con la plataforma AM4 y ofrece un rendimiento excepcional para juegos y aplicaciones exigentes.",
    precio: "$69999",
    cantidadVenta: 8
  },
  {
    id: 3,
    titulo: "Motherboard ASUS ROG STRIX B550-F GAMING (WI-FI)",
    categoria: "Motherboards",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "La motherboard ASUS ROG STRIX B550-F GAMING (WI-FI) es una placa base de gama alta para los procesadores AMD Ryzen™ de tercera generación. Cuenta con un diseño robusto de alimentación, refrigeración avanzada, conectividad rápida y personalización RGB. Además, incluye Wi-Fi 6 integrado para una conexión inalámbrica de alta velocidad.",
    precio: "$39999",
    cantidadVenta: 5
  },
  {
    id: 4,
    titulo: "Placa de video Radeon RX 6800 XT",
    categoria: "Placas de video",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "La Radeon RX 6800 XT es una placa de video de alto rendimiento basada en la arquitectura RDNA 2 de AMD. Cuenta con 4608 núcleos Stream, 16GB de memoria GDDR6 y soporte para Ray Tracing. Es ideal para jugar en resolución 4K y con altas tasas de refresco.",
    precio: "$249999",
    cantidadVenta: 6
  },
  {
    id: 5,
    titulo: "Procesador Intel Core i9-11900K",
    categoria: "Procesadores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "El procesador Intel Core i9-11900K es el buque insignia de la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.5 GHz que puede llegar hasta los 5.3 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un rendimiento sobresaliente para juegos y creación de contenido.",
    precio: "$99999",
    cantidadVenta: 4
  },
  {
    id: 6,
    titulo: "Placa de video MSI GeForce RTX 3070 Ti",
    categoria: "Placas de video",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "La placa de video MSI GeForce RTX 3070 Ti es una tarjeta gráfica de gama alta que ofrece un rendimiento excepcional para juegos en resolución 1440p y 4K. Cuenta con la arquitectura Ampere de NVIDIA, con núcleos RT y Tensor mejorados, y 8GB de memoria GDDR6X. Además, tiene un diseño elegante con iluminación RGB personalizable.",
    precio: "$179999",
    cantidadVenta: 7
  },
  {
    id: 7,
    titulo: "Procesador Intel Core i7-11700K",
    categoria: "Procesadores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "El procesador Intel Core i7-11700K es un CPU de alto rendimiento que pertenece a la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.6 GHz que puede alcanzar los 5 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un excelente desempeño para juegos y multitarea.",
    precio: "$79999",
    cantidadVenta: 6
  },
    {
    id: 8,
    titulo: "Placa de video MSI GeForce RTX 3070 Ti",
    categoria: "Placas de video",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "La placa de video MSI GeForce RTX 3070 Ti es una tarjeta gráfica de gama alta que ofrece un rendimiento excepcional para juegos en resolución 1440p y 4K. Cuenta con la arquitectura Ampere de NVIDIA, con núcleos RT y Tensor mejorados, y 8GB de memoria GDDR6X. Además, tiene un diseño elegante con iluminación RGB personalizable.",
    precio: "$179999",
    cantidadVenta: 7
  },
  {
    id: 9,
    titulo: "Procesador Intel Core i7-11700K",
    categoria: "Procesadores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "El procesador Intel Core i7-11700K es un CPU de alto rendimiento que pertenece a la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.6 GHz que puede alcanzar los 5 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un excelente desempeño para juegos y multitarea.",
    precio: "$79999",
    cantidadVenta: 6
  },
      {
    id: 10,
    titulo: "Placa de video MSI GeForce RTX 3070 Ti",
    categoria: "Placas de video",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "La placa de video MSI GeForce RTX 3070 Ti es una tarjeta gráfica de gama alta que ofrece un rendimiento excepcional para juegos en resolución 1440p y 4K. Cuenta con la arquitectura Ampere de NVIDIA, con núcleos RT y Tensor mejorados, y 8GB de memoria GDDR6X. Además, tiene un diseño elegante con iluminación RGB personalizable.",
    precio: "$179999",
    cantidadVenta: 7
  },
  {
    id: 11,
    titulo: "Procesador Intel Core i7-11700K",
    categoria: "Procesadores",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGfQ0ORNQl1cWy4ALB1joTR5uF-Ift-jUHg&usqp=CAU",
    descripcion: "El procesador Intel Core i7-11700K es un CPU de alto rendimiento que pertenece a la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.6 GHz que puede alcanzar los 5 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un excelente desempeño para juegos y multitarea.",
    precio: "$79999",
    cantidadVenta: 6
  }
];

