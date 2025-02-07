import React from 'react'
import Filter from '../../_components/ProductFilter'

export default function layout({children}) {
  return (
    <div className='max-w-screen overflow-x-hidden overflow-y-hidden flex flex-row flex-nowrap'>
    <Filter/>
    {children}
    </div>
  )
}
