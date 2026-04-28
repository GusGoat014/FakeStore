import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "schema";
import "./Cadastro.css";

export default function Cadastro(){

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

    const onSubmit = (data) => {
        console.log("dados: ", data);
    }

  return (
    <div className="cadastro-form">
      <div className="cadastro-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} placeholder="Email" />
          <p>{errors.email?.message}</p>

          <input type="password" {...register("senha")} placeholder="Senha" />
          <p>{errors.senha?.message}</p>

          <input
            type="password"
            {...register("confirmarSenha")}
            placeholder="Confirmar senha"
          />
          <p>{errors.confirmarSenha?.message}</p>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}