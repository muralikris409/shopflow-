
import React from 'react'
import Product from './Product';
export default async function page({params}) {
    const productId=await params.id;
    console.log("ProductId:",productId)
  return (
    <div>
     <Product productId={productId}/>
    </div>
  )
}
