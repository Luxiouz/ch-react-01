import React, { useEffect, useState } from 'react'
import LoadingCard from './LoadingCard'

export default function LoadingCardList({length}) {

    const [items, setitems] = useState([])
    useEffect(() => {
        const cards = []
        for(let i=0; i<length; i++){
            cards.push(<LoadingCard key={i}/>)
        }
        setitems(cards);
    }, [length])

    return (
        <div className="row justify-content-between flex-wrap">
            {items}
        </div>
    )
}
