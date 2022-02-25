import LoadingCardList from "../../shared/placeholders/LoadingCardList";
import CategoryList from "./ItemList";

export default function CategoryContainer({loading, categories}) {

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
