import React from 'react'

const ListName = ({ persons }) => {
	return (
		persons.map((x) => <li key={x.name}>{x.name} {x.number}</li>)
	)
}

export default ListName
