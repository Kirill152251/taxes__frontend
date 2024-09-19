import StarIcon from "@mui/icons-material/Star";

import { Button } from "@/shared/components/button/Button";

import { useLocation } from "react-router-dom";
import { ProductsResults } from "@/model";
import { useDispatch } from "react-redux";
import { increment } from "@/widgets/header/api/ProductCounter";

import style from "./product.module.scss";
import { addProduct } from "../api/ProductCard";
import { Path } from "@/widgets";
import { usePostOrdersMutation } from "@/features/user/api/ordersApi";
import { useGetUserInfQuery } from "@/features/user/api/user.api";
import { addOrders } from "@/widgets/basket/api/ordersBasket";

export const ProductCard = () => {  

  const {data} = useGetUserInfQuery();

  const userID = data?.id;

  const [PostOrders] = usePostOrdersMutation();
  const location = useLocation();

  const cardData = location.state as ProductsResults;
  const dispatch = useDispatch();

  console.log(userID);

  const dataOrders = {
    product: cardData.id,
    count: cardData.count,
    seller: cardData.seller,
    buyer: userID,
  };

  const handleUploudOrders = () => {
    PostOrders(dataOrders);
  };

  return (
    <>
      <Path path="Карточка товара" />
      <div className={style.card}>
        <div className={style.card__imgs}>
          <img
            src={cardData?.images[0]?.photo}
            alt=""
            className={style.card__imgs_main}
          />
        </div>
        <div className={style.card__inf}>
          <h3 className={style.card__inf_title}>{cardData.name}</h3>
          <h4 className={style.card__art}>Артикул № {cardData.count}</h4>
          <div className={style.card__box}>
            <StarIcon />
            <p>112</p>
          </div>
          <div className={style.card__inf_text}>
            <p>{cardData.description}</p>
          </div>
        </div>
        <div className={style.card__price}>
          <h3 className={style.card__price_title}>{cardData.price} BYN</h3>
          <h3 className={style.card__inf_t}>{cardData.name}</h3>
          <h4 className={style.card__inf_t}>Артикул № {cardData.id}</h4>
          <Button
            variant={"smallBlue"}
            onClick={() => {
              dispatch(increment());
              dispatch(addProduct(cardData));
              dispatch(addOrders(dataOrders));
            }}
          >
            Добавить в корзину
          </Button>
          <div className={style.btn}>
            <Button variant={"smallOrange"} onClick={handleUploudOrders}>Заказать</Button>
          </div>
        </div>
      </div>
    </>
  );
};
