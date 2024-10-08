import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./details.module.scss";

import { HintCloud } from "@/shared/components/hintCloud/HintCloud";
import { Typography } from "@/shared/components/typography/Typography";
import { Button } from "@/shared/components/button/Button";
import productImg from "@/shared/assets/img/no_photo.jpg";

import { ProductsImages, ProductsResults } from "@/model";
import { CategoriesType } from "@/model/CategoriesData/CategoriesType";

import {
  useDeleteProductMutation,
  useNewProductMutation,
  usePatchProductMutation,
} from "@/features/user/api/productsApi";
import {
  useDeleteImagesMutation,
  useNewImagesMutation,
  usePatchImagesMutation,
} from "@/features/user/api/imagesApi";
import { useGetDataUserQuery } from "@/features/user/api/AccountApi";
import { useGetCategoriesQuery } from "@/features/user/api/categoriesApi";

export const Details = () => {
  const location = useLocation();
  const { state } = location;

  let photoID =
    state !== null
      ? state.from.results.images.map((item: ProductsImages) => item.id)
      : [];

  let photo =
    state !== null
      ? state.from.results.images.map((item: ProductsImages) => item.photo)
      : [];

  //image--------------------

  const [imageURL, setImageURL] = useState<any>(
    photo[0] !== undefined ? photo[0] : productImg
  );
  const [image, setImage] = useState<any>(null);

  const [imageURL1, setImageURL1] = useState<any>(
    photo[1] !== undefined ? photo[1] : productImg
  );
  const [image1, setImage1] = useState<any>(null);

  const [imageURL2, setImageURL2] = useState<any>(
    photo[2] !== undefined ? photo[2] : productImg
  );
  const [image2, setImage2] = useState<any>(null);

  const [imageURL3, setImageURL3] = useState<any>(
    photo[3] !== undefined ? photo[3] : productImg
  );
  const [image3, setImage3] = useState<any>(null);

  const handleOnChange = (event: any) => {
    setImage(event.target.files[0]);

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImageURL(fileReader.result);
    };

    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
    }
  };

  const handleOnChange1 = (event: any) => {
    setImage1(event.target.files[0]);

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImageURL1(fileReader.result);
    };

    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
    }
  };

  const handleOnChange2 = (event: any) => {
    setImage2(event.target.files[0]);

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImageURL2(fileReader.result);
    };

    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
    }
  };

  const handleOnChange3 = (event: any) => {
    setImage3(event.target.files[0]);

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImageURL3(fileReader.result);
    };

    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      fileReader.readAsDataURL(file);
    }
  };

  //-----------------

  const navigate = useNavigate();

  const [NewImages] = useNewImagesMutation();
  const [addProductsResultsData] = useNewProductMutation();
  const [patchProductsResultsData] = usePatchProductMutation();
  const [DeleteProduct] = useDeleteProductMutation();
  const [DeleteImages] = useDeleteImagesMutation();
  const [PatchImages] = usePatchImagesMutation();
  const { data } = useGetCategoriesQuery("");

  let producsId: any;

  let userId: string;

  (function () {
    const { data } = useGetDataUserQuery("");
    return (userId = data != undefined ? data.id : "error");
  })();

  let [addProductsResults] = useState<ProductsResults>(
    state !== null
      ? {
          id: `${state.from.results.id}`,
          name: `${state.from.results.name}`,
          description: `${state.from.results.description}`,
          price: `${state.from.results.price}`,
          count: `${state.from.results.count}`,
          category: `${state.from.results.category}`,
          seller: `${state.from.results.seller}`,
        }
      : {
          id: "",
          name: "",
          description: "",
          price: "",
          count: "1",
          category: "",
          seller: "",
        }
  );

  const text = `Информация по добавлению инфы
  - символы
  - количество`;

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    DeleteProduct(state.from.results.id);
    navigate("/mySuggestions");
  };

  const deleteImage0 = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    DeleteImages(photoID[0]);
    setImageURL(productImg);
  };

  const deleteImage1 = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    DeleteImages(photoID[1]);
    setImageURL1(productImg);
  };

  const deleteImage2 = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    DeleteImages(photoID[2]);
    setImageURL2(productImg);
  };

  const deleteImage3 = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    DeleteImages(photoID[3]);
    setImageURL3(productImg);
  };

  return (
    <div className={style.card}>
      <Typography variant="default" tag={"h3"}>
        Новое предложение
      </Typography>

      <Formik<ProductsResults>
        initialValues={addProductsResults}
        onSubmit={(values) => {
          values.seller = userId;
          console.log(values);
          state !== null
            ? patchProductsResultsData(values).then((data) => {
                if (imageURL !== null && photoID[0] !== undefined) {
                  const formData = new FormData();
                  formData.append("id", photoID[0]);
                  formData.append("product", values.id);
                  formData.append("photo", image);
                  const body = [photoID[0], formData];
                  PatchImages(body);
                } else if (photoID[0] == undefined) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image);
                  NewImages(formData);
                }

                if (imageURL1 !== null && photoID[1] !== undefined) {
                  const formData = new FormData();
                  formData.append("id", photoID[1]);
                  formData.append("product", values.id);
                  formData.append("photo", image1);
                  const body = [photoID[1], formData];
                  PatchImages(body);
                } else if (photoID[1] == undefined) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image1);
                  NewImages(formData);
                }

                if (imageURL2 !== null && photoID[2] !== undefined) {
                  const formData = new FormData();
                  formData.append("id", photoID[2]);
                  formData.append("product", values.id);
                  formData.append("photo", image2);
                  const body = [photoID[2], formData];
                  PatchImages(body);
                } else if (photoID[2] == undefined) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image2);
                  NewImages(formData);
                }

                if (image3 !== null && photoID[3] !== undefined) {
                  const formData = new FormData();
                  formData.append("id", photoID[3]);
                  formData.append("product", values.id);
                  formData.append("photo", image);
                  const body = [photoID[3], formData];
                  PatchImages(body);
                } else if (photoID[3] == undefined) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image3);
                  NewImages(formData);
                }
              })
            : addProductsResultsData(values).then((data) => {
                if (image !== null) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image);
                  NewImages(formData);
                }

                if (image1 !== null) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image1);
                  NewImages(formData);
                }

                if (image2 !== null) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image2);
                  NewImages(formData);
                }

                if (image3 !== null) {
                  producsId = data.data?.id;
                  const formData = new FormData();
                  formData.append("product", producsId);
                  formData.append("photo", image3);
                  NewImages(formData);
                }
              });
          navigate("/mySuggestions");
        }}
      >
        {() => (
          <Form>
            <div className={style.card__Line}>
              <div className={style.card__Column}>
                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Название товара/услуги *
                  </Typography>

                  <HintCloud text={text}>
                    <Field
                      required
                      className={style.card__input}
                      name={"name"}
                      type="text"
                      placeholder="Введите название товара/услуги"
                    />
                  </HintCloud>
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Категория*
                  </Typography>
                  <Field
                    as="select"
                    required
                    className={style.card__input}
                    name={"category"}
                    type="text"
                  >
                    {state == null ? (
                      <option disabled={true} value="" key="0">
                        Выберите категорию
                      </option>
                    ) : null}
                    {data != undefined
                      ? data.results.map((item: CategoriesType) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))
                      : "ERROR"}
                  </Field>
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Описание*
                  </Typography>
                  <Field
                    as="textarea"
                    required
                    className={style.card__input__description}
                    name="description"
                    placeholder="Введите описание товара"
                  />
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Местонахождение товара*
                  </Typography>

                  <HintCloud text={text}>
                    <Field
                      className={style.card__input}
                      name="location"
                      type="text"
                      placeholder="Введите местонахождение товара"
                    />
                  </HintCloud>
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Контактная информация*
                  </Typography>
                  <HintCloud text={text}>
                    <Field
                      className={style.card__input}
                      name="phone_number"
                      type="text"
                      placeholder="Введите номер телефона"
                    />

                    <div className={style.m_t }>
                      <Field
                        className={style.card__input}
                        name="e-mail"
                        type="text"
                        placeholder="Введите e-mail"
                      />
                    </div>
                  </HintCloud>
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Условия оплаты*
                  </Typography>
                  <Field
                    className={style.card__input}
                    name="payment_terms"
                    type="text"
                    placeholder="Введите условия оплаты"
                  />
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Условия доставки
                  </Typography>
                  <Field
                    className={style.card__input}
                    name="delivery_terms"
                    type="text"
                    placeholder="Введите условия доставки"
                  />
                </div>

                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Цена, BYN*
                  </Typography>
                  <Field
                    required
                    className={style.card__input}
                    name={"price"}
                    type="text"
                    placeholder="Введите цену"
                  />
                </div>

                {state === null ? (
                  <div className={style.card__Button}>
                    <Button type="submit" variant="bigBlue">
                      Добавить предложение
                    </Button>
                  </div>
                ) : (
                  <div className={style.card__Button}>
                    <Button type="submit" variant="normalBlue">
                      Сохранить
                    </Button>
                    <Button variant="normalWhite" onClick={handleRemove}>
                      Удалить
                    </Button>
                  </div>
                )}
              </div>

              <div className={style.card__Column}>
                <div className={style.card__Indent}>
                  <Typography variant="default" tag={"p"}>
                    Фото товара/услуги*
                  </Typography>

                  <label
                    htmlFor="ava"
                    className={style.card__input__photo__big}
                  >
                    <img src={imageURL} alt="product" />
                    {imageURL !== productImg ? (
                      <button
                        className={style.card__photoDelete}
                        onClick={deleteImage0}
                      >
                        Удалить фото
                      </button>
                    ) : (
                      ""
                    )}
                  </label>

                  <Field
                    className={style.card__input__file}
                    id="ava"
                    onChange={handleOnChange}
                    name="images[0].photo[0]"
                    accept="image/jpeg,image/jpg,image/png"
                    type="file"
                    placeholder="Добавить фото"
                  />
                </div>

                <div className={style.card__input__Indent_photo}>
                  <label htmlFor="ava1" className={style.card__input__photo}>
                    <img src={imageURL1} alt="product" />
                    {imageURL1 !== productImg ? (
                      <button
                        className={style.card__photo1Delete}
                        onClick={deleteImage1}
                      >
                        Удалить фото
                      </button>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={style.card__input__file}
                    id="ava1"
                    onChange={handleOnChange1}
                    name="images[1].photo[1]"
                    accept="image/jpeg,image/jpg,image/png"
                    type="file"
                    placeholder="Добавить фото"
                  />
                  <label htmlFor="ava2" className={style.card__input__photo}>
                    <img src={imageURL2} alt="product" />
                    {imageURL2 !== productImg ? (
                      <button
                        className={style.card__photo2Delete}
                        onClick={deleteImage2}
                      >
                        Удалить фото
                      </button>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={style.card__input__file}
                    id="ava2"
                    onChange={handleOnChange2}
                    name="images[2].photo[2]"
                    accept="image/jpeg,image/jpg,image/png"
                    type="file"
                    placeholder="Добавить фото"
                  />
                  <label htmlFor="ava3" className={style.card__input__photo}>
                    <img src={imageURL3} alt="product" />
                    {imageURL3 !== productImg ? (
                      <button
                        className={style.card__photo3Delete}
                        onClick={deleteImage3}
                      >
                        Удалить фото
                      </button>
                    ) : (
                      ""
                    )}
                  </label>
                  <Field
                    className={style.card__input__file}
                    id="ava3"
                    onChange={handleOnChange3}
                    name="images[3].photo[3]"
                    accept="image/jpeg,image/jpg,image/png"
                    type="file"
                    placeholder="Добавить фото"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
