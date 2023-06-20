import React from 'react';
import Card from '../Card/Card';
import style from "./Cards.module.css";

export default function Cards({ currentItems }) {
	return (
<<<<<<< HEAD
		<div>
=======
		<div className={style.contt}>
>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257
			{currentItems.map((item) => (
				<div key={item.id}>
					<Card item={item} />
				</div>
			))}
		</div>
	);
<<<<<<< HEAD
=======

>>>>>>> f24094d22adacd1c300c5d303a860c7244ecb257
}
// import React from 'react'
// import Card from '../Card/Card';

// export default function Cards({currentItems}) {
//   return (
//     <div>
//         <div>
//         {currentItems?.map((item, index) => (
//             <div>
//             <Card item={item} key={index}/>
//             </div>
//         ))}
//       </div>
//     </div>

//   )
// }
