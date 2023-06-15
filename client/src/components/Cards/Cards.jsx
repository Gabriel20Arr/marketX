import React from 'react';
import Card from '../Card/Card';

export default function Cards({ currentItems }) {
	return (
		<div>
			{currentItems.map((item) => (
				<div key={item.id}>
					<Card item={item} />
				</div>
			))}
		</div>
	);
}
