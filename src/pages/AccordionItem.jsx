import React from 'react'
import {Collapse} from 'react-collapse'
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
const AccordionItem = ({open, toggle, title, desc}) => {
  return (
    <div className='pt-[10px] ml-8 mr-8 mb-8'>
      <div className='bg-blue-100 py-[32px] px-[30px] flex justify-between items-center cursor-pointer' onClick={toggle}>
        <p className='text-[22px] font-semibold '>{title}</p>
        <div className='text-[30px]'>
            {open? <AiOutlineMinus/> : <AiOutlinePlus/>}
        </div>
      </div>

      <Collapse isOpened={open}>
      <div className=' px-[50px] pb-[20px] bg-blue-100'>{desc}</div>
      </Collapse>
    </div>
  )
}

export default AccordionItem
