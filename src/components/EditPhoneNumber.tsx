import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IPhoneNumber } from "../types";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editPhoneNumber, setEditingNumber } from "../redux/phoneNumberSlice";

interface Props {
  phoneNumber: IPhoneNumber;
  index: number;
}

interface FormFields {
  number: string;
}

const schema = yup.object({
  number: yup
    .string()
    .required("No debe estar vacío")
    .matches(/^\+[1-9]\d{1,14}$/, "El número no es compatible"),
});

const EditPhoneNumber: FC<Props> = ({ phoneNumber, index }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      number: phoneNumber.number,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(
      editPhoneNumber({ id: phoneNumber._id, number: data.number, i: index })
    );
  };

  return (
    <div className="flex-grow-1">
      {errors.number && (
        <Alert variant="danger" className="my-1">
          {errors.number.message}
        </Alert>
      )}
      <Form
        className="d-flex flex-grow-1 mb-2 justify-content-between align-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Control {...register("number")} placeholder="Ej: +999999999999" />
        <div className="d-flex ms-2">
          <Button
            type="submit"
            disabled={phoneNumber.loading}
            variant="success"
          >
            {phoneNumber.loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Confirmar"
            )}
          </Button>
          <Button
            className="ms-2"
            variant="danger"
            onClick={() =>
              dispatch(setEditingNumber({ value: false, i: index }))
            }
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditPhoneNumber;
