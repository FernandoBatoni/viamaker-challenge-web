import { MenuOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'

interface INavbar {
  menu: React.ReactNode
  visible: boolean
  handleDrawer: (value: boolean) => void
}

function Navbar ({ menu, visible, handleDrawer }: INavbar) {
  return (
    <Header
      className='navbar'
    >
      <section className='navbar__section'>
        <Button
          className='navbar__menu'
          type='text'
          icon={<MenuOutlined />}
          onClick={() => handleDrawer(true)}
        />

      </section>

      <Drawer
        title='Desafio Viamaker'
        placement='left'
        onClose={() => handleDrawer(false)}
        open={visible}
        className='navbar__drawer'
        width={250}
      >
        {menu}
      </Drawer>
    </Header>
  )
}

export default Navbar