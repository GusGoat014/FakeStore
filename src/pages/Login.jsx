import { useEffect, useState } from "react";
import "./Login.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Login({ setCurrentUser }){
    const navigate = useNavigate();

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
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.nome === CampoNome && u.senha === CampoSenha);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
            if (Caixa) {
                localStorage.setItem("usuario", JSON.stringify({ nome: CampoNome, senha: CampoSenha }));
            }
            if (user.role === 'admin') {
                navigate('/Dashboard');
            } else {
                navigate('/');
            }
        } else {
            alert('Usuário ou senha inválidos');
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