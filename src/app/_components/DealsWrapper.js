"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { setProductData } from '../_lib/utilReducer';
export default function DealsWrapper({children,product}) {
    const router=useRouter();
    const dispatch=useDispatch();
       const handleNavigation=(product)=>{
            
          dispatch(setProductData({id:product.id}));
          router.push(`product/${product.name}`);
          }
  return (
    <div onClick={()=>handleNavigation(product)}>
      {children}
    </div>
  )
}
