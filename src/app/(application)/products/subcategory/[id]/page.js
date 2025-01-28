import React from 'react'
import Products from './SubCategoryProduct';
export default async function page({params}) {
    const {id}=await params;
  return (
      <Products id={id}/>
  )
}
