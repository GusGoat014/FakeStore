import { useEffect, useState } from "react"
import GetProdutos from "../hooks/GetProdutos"

export default function ProdutoDetalhe({ id }){

  const [produto, setProduto] = useState(null)

  useEffect(() => {
    async function loadProduto(){
      const res = await GetProdutos()
      const item = res.data.find(p => p.id === Number(id))
      setProduto(item)
    }

    loadProduto()
  }, [id])

    return(
        <h1>{produto ? produto.title : "carregando"}</h1>
    )
}