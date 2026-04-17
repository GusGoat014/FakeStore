import { useEffect, useState } from "react";
import "./Login.css";

export default function Login(){



    const[MostrarSenha,setMostrarSenha] = useState(false);
    const[Caixa,setCaixa] = useState();

    const[CampoNome,setCampoNome] = useState("");
    const[CampoSenha,setCampoSenha] = useState("");

    useEffect(()=>{
        try{
        const usuario = JSON.parse(localStorage.getItem("usuario"))
        if (usuario) {
            setCampoNome(usuario.nome)
            setCampoSenha(usuario.senha)
        }
        }catch(erro){
            console.log(erro);  
        }
    },[])

    function DinamicaSenha(){
        setMostrarSenha(!MostrarSenha);
    }

    function Logar() {
        if(Caixa){
            const usuario = {
                nome: CampoNome,
                senha: CampoSenha
            }
            localStorage.setItem("usuario",JSON.stringify(usuario))
        }
    }

    return(
        <>
        <div className="login-container">
        <input onChange={(texto)=>{setCampoNome(texto.target.value)}} type="text" placeholder="Nome" />
        <input onChange={(texto)=>{setCampoSenha(texto.target.value)}} type={MostrarSenha ? "text" : "password"} placeholder="Senha" />
        <label>
            <input onChange={(ab)=>{setCaixa(ab.target.checked)}} type="checkbox"/>
            Permanecer logado
        </label>
        <p>Lembrar usuario e senha</p>
        <button onClick={()=>{DinamicaSenha()}}>Mostrar Senha</button>
        <button onClick={()=>{Logar()}}>Login</button>
        </div>
        </>
        )
}