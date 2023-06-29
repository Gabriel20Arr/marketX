import React from 'react';
import Card from '../Card/Card';
import style from "./Cards.module.css";

export default function Cards({ currentItems }) {
	
	return (
		<div className={style.contt}>
			{currentItems.map((item) => (
				<div key={item.id || item._id}>
					<Card item={item}/>
				</div>
			))}
		</div>
	);
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
