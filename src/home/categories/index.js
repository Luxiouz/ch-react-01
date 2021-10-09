import { useState, useEffect } from "react";
import LoadingCardList from "../../shared/placeholders/LoadingCardList";
import dataSource from '../../utils/dataSource'
import CatList from "./CatList";


export default function Categories() {

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true);
        dataSource().then(result => {
            setCategories(result);
        }).catch(e => console.error(e)).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <div>
            {
                loading ?
                    <LoadingCardList length="6" />
                    :
                    <CatList categories={categories} />
            }
        </div>
    )
}
