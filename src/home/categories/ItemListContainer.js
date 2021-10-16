import { useState, useEffect } from "react";
import LoadingCardList from "../../shared/placeholders/LoadingCardList";
import CategoryList from "./ItemList";
import { getCategories } from "../../utils/dataSource"
import errorCatcher from "../../utils/errorCatcher";


export default function CategoryContainer() {

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setLoading(true);
        getCategories().then(result => {
            setCategories(result);
        }).catch(e => errorCatcher(e)).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <div>
            {
                loading ?
                    <LoadingCardList length="12" />
                    :
                    <CategoryList categories={categories} />
            }
        </div>
    )
}
