import { Field, Form, Formik } from "formik";
import { Button } from "@/shared/components/button/Button";
import { Typography } from "@/shared/components/typography/Typography";
import { TaxpayerType } from "@/model";

import style from "./account.module.scss";
import { useState } from "react";
import { useTaxpayerMutation } from "@/features/user/api/AccountApi";

export const TaxpayerDetails = () => {
  const [addTaxpayer] = useState<TaxpayerType>({
    UNP: "",
    сategory: "",
  });

  const [addTaxpayerData] = useTaxpayerMutation();

  return (
    <>
      <Formik<TaxpayerType>
        initialValues={addTaxpayer}
        onSubmit={(values) => {
          addTaxpayerData(values);
        }}
      >
        {({ isValid }) => (
          <Form>
            <div className={style.card__Line}>
              <div className={style.card__Column}>
                <Typography variant="subscribe-input" tag={"p"}>
                  УНП
                </Typography>
                <Typography variant="subscribe-input" tag={"p"}>
                  Категория услуг
                </Typography>
              </div>

              <div className={style.card__Column}>
                <div
                  className={style.item}
                  data-title="УНП девятизначный код (из цифр для организаций, из букв и цифр для частных лиц), который содержит идентификатор региона, серийный номер для региона и контрольную цифру"
                >
                  <Field
                    className={style.input}
                    name={"UNP"}
                    type="text"
                    placeholder="Введите УНП"
                  />
                </div>

                <Field
                  className={style.card__input}
                  name="сategory"
                  as="select"
                >
                  <option value="red">Ремесленная деятельность</option>
                  <option value="green">Видеосъемка событий</option>
                  <option value="blue">Нанесение аквагрима</option>
                  <option value="blue">Репетиторство</option>
                  <option value="blue">Уход за взрослыми и детьми</option>
                </Field>
                <div className={style.card__Line}>
                  <Button type="submit" variant={"text"} disabled={!isValid}>
                    <Typography variant="link-account" tag={"p"}>
                      Изменить
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
