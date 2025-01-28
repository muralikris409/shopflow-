import React from 'react'
import Filter from '../../_components/ProductFilter'

export default function layout({children}) {
  return (
    <>
    <Filter/>
    {children}
    </>
  )
}
