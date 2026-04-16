import axios from 'axios';

export default async function GetProdutos(){
    const data = await axios.get('https://fakestoreapi.com/products')
    return data;
}