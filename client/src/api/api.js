const productos = [
	{
		id: 1,
		titulo: 'Placa de video AMD Sapphire Pulse Radeon RX 6800 Series',
		categoria: 'Placas de video',
		imagen:
			'https://http2.mlstatic.com/D_NQ_NP_661754-MLA52583653779_112022-O.webp',
		descripcion:
			'AMD es un fabricante estadounidense de placas de video.',
		precio: 199,
		cantidadVenta: 12,
		stock: 1
	},
	{
		id: 2,
		titulo: 'Procesador AMD Ryzen 7 5800X',
		categoria: 'Procesadores',
		imagen:
			'https://http2.mlstatic.com/D_NQ_NP_2X_903113-MLA44347094942_122020-F.webp',
		descripcion:
			'El procesador AMD Ryzen™ 7 5800X tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.8 GHz que puede subir hasta los 4.7 GHz.',
		precio: 69999,
		cantidadVenta: 8,
		stock: 3
	},
	{
		id: 3,
		titulo: 'Motherboard ASUS ROG STRIX B550-F',
		categoria: 'Motherboard',
		imagen:
			'https://www.fullh4rd.com.ar/img/productos/Pics_Prod/mother-asus-b550f-gaming-rog-strix-wifi-0.jpg',
		descripcion:
			'La motherboard ASUS ROG STRIX B550-F GAMING (WI-FI) es una placa base de gama alta para los procesadores AMD Ryzen™ de tercera generación.',
		precio: 39999,
		cantidadVenta: 5,
		stock: 2
	},
	{
		id: 4,
		titulo: 'Placa de video Radeon RX 6800 XT',
		categoria: 'Placas de video',
		imagen:
			'https://http2.mlstatic.com/D_NQ_NP_930614-MLA52110425889_102022-O.webp',
		descripcion:
			'La Radeon RX 6800 XT es una placa de video de alto rendimiento basada en la arquitectura RDNA 2 de AMD. Cuenta con 4608 núcleos Stream, 16GB de memoria GDDR6 y soporte para Ray Tracing. Es ideal para jugar en resolución 4K y con altas tasas de refresco.',
		precio: 249999,
		cantidadVenta: 6,
		stock: 8

	},
	{
		id: 5,
		titulo: 'Microprocesador Pc Amd Ryzen 5 4600g',
		categoria: 'Procesadores',
		imagen:
			'https://http2.mlstatic.com/D_NQ_NP_659520-MLM51338788281_082022-O.webp',
		descripcion:
			'En este producto, encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo. Estos tienen relación directa con dos elementos: los hilos y el modelo. Por lo tanto, a la hora de elegir un procesador, es importante que valores los tres en su conjunto.',
		precio: 99999,
		cantidadVenta: 4,
		stock: 2
	},
	{
		id: 6,
		titulo: 'Placa de video MSI GeForce RTX 3070 Ti',
		categoria: 'Placas de video',
		imagen:
			'https://s3-sa-east-1.amazonaws.com/saasargentina/GiAOweZodfPYy5ty3Fs3/imagen',
		descripcion:
			'La placa de video MSI GeForce RTX 3070 Ti es una tarjeta gráfica de gama alta que ofrece un rendimiento excepcional para juegos en resolución 1440p y 4K. Cuenta con la arquitectura Ampere de NVIDIA, con núcleos RT y Tensor mejorados, y 8GB de memoria GDDR6X. Además, tiene un diseño elegante con iluminación RGB personalizable.',
		precio: 179999,
		cantidadVenta: 7,
		stock: 5
	},
	{
		id: 7,
		titulo: 'Procesador gamer AMD Ryzen 5 5600G',
		categoria: 'Procesadores',
		imagen:
			'https://http2.mlstatic.com/D_NQ_NP_835553-MLA51325236484_082022-O.webp',
		descripcion:
			'Máxima potencia. Al estar desbloqueado, podrás realizar overclocking y así aumentar la frecuencia de funcionamiento y optimizar el rendimiento de tu equipo. Personalizalo a tu gusto y disfrutá de tus videojuegos o hacé que la renderización de imágenes sea más ágil. ¡Descubrí el abanico de posibilidades que esta función te ofrece!',
		precio: 79999,
		cantidadVenta: 6,
		stock: 4

	},
	{
		id: 8,
		titulo: 'Placa de video MSI GeForce RTX 3050',
		categoria: 'Placas de video',
		imagen:
			'https://images-ext-2.discordapp.net/external/iMLY9DOdbnMoqW8cPuESMMmaItuHhEpswOUU72twwIY/https/http2.mlstatic.com/D_NQ_NP_2X_642143-MLA49407168504_032022-F.webp?width=593&height=473',
		descripcion:
			'La placa de video MSI GeForce RTX 3050 es una tarjeta gráfica de gama alta que ofrece un rendimiento excepcional para juegos en resolución 1440p y 4K. Cuenta con la arquitectura Ampere de NVIDIA, con núcleos RT y Tensor mejorados, y 8GB de memoria GDDR6X. Además, tiene un diseño elegante con iluminación RGB personalizable.',
		precio: 179999,
		cantidadVenta: 7,
		stock: 5
	},
	{
		id: 9,
		titulo: 'Procesador Intel Core i5-11700K',
		categoria: 'Procesadores',
		imagen:
			'https://images-ext-2.discordapp.net/external/1H7FD2DA3oIAD2lbOsoTLCRPLmtdU_sqZdIMggNkqYc/https/http2.mlstatic.com/D_NQ_NP_2X_686262-MLA42885718700_072020-F.webp?width=420&height=473',
		descripcion:
			'El procesador Intel Core i5-11700K es un CPU de alto rendimiento que pertenece a la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.6 GHz que puede alcanzar los 5 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un excelente desempeño para juegos y multitarea.',
		precio: 79999,
		cantidadVenta: 6,
		stock: 2
	},
	{
		id: 10,
		titulo: 'Placa De Video Arktek Radeon Rx580 8gb Gddr5 256bit Pcreg',
		categoria: 'Placas de video',
		imagen:
			'https://http2.mlstatic.com/D_NQ_NP_758514-MLA69947394484_062023-O.webp',
		descripcion:
			'La placa de video Arktek Radeon Rx580 es una tarjeta gráfica de gama alta que ofrece un rendimiento excepcional para juegos en resolución 1440p y 4K. Cuenta con la arquitectura Ampere de NVIDIA, con núcleos RT y Tensor mejorados, y 8GB de memoria GDDR6X. Además, tiene un diseño elegante con iluminación RGB personalizable.',
		precio: 179999,
		cantidadVenta: 7,
		stock: 3
	},
	{
		id: 11,
		titulo: 'Procesador Intel Core i7-11700K',
		categoria: 'Procesadores',
		imagen:
			'https://images-ext-1.discordapp.net/external/i11NoLORCWnngrTBrYp-dZbp3mxIBi4GNa59a2oJTI8/https/http2.mlstatic.com/D_NQ_NP_2X_793315-MLA45400163649_032021-F.webp?width=395&height=473',
		descripcion:
			'El procesador Intel Core i7-11700K es un CPU de alto rendimiento que pertenece a la undécima generación de procesadores Intel Core. Tiene 8 núcleos y 16 hilos, con una frecuencia base de 3.6 GHz que puede alcanzar los 5 GHz con Turbo Boost. Es compatible con la plataforma LGA1200 y ofrece un excelente desempeño para juegos y multitarea.',
		precio: 79999,
		cantidadVenta: 6,
		stock: 9
	},
];

module.exports = productos