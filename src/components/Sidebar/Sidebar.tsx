import { Typography } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React from 'react'

interface ISidebarProps {
  menu: React.ReactNode
}

function Sidebar ({ menu }: ISidebarProps) {
  return (
    <Sider
      trigger={null}
      theme='light'
      breakpoint='lg'
      className='sidebar'
      collapsedWidth='0'
      width={250}
    >
      <Typography.Title level={5} className='flex justify-center p-1'>
        Desafio Viamaker
      </Typography.Title>

      {menu}
    </Sider>
  )
}

export default Sidebar