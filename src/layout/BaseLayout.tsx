import { QuestionCircleOutlined } from '@ant-design/icons'
import { FloatButton, Layout, Menu, Row, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar/Navbar'
import PathIcon from '../components/PathIcon/PathIcon'
import Sidebar from '../components/Sidebar/Sidebar'
import { IRouterRoute } from '../interfaces/IRoute'
import routes from '../router/routes'
import { IMenuItem } from '../utils/globalTypes'

type IBaseLayoutProps = {
  children: React.ReactNode
  routeTitle: string
}

function BaseLayout({ children, routeTitle }: IBaseLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [items, setItems] = useState<IMenuItem[]>([])
  const [mainRoutes, setMainRoutes] = useState<(IRouterRoute)[]>([])
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const mainContentRef = useRef<HTMLDivElement>(null)

  const handleDrawer = (value: boolean) => {
    setDrawerVisible(value)
  }

  useEffect(() => {
    const menuItems: IMenuItem[] = []

    mainRoutes.forEach((route) => {
      const { icon, name } = route
      menuItems.push({
        label: name,
        icon: (
          <PathIcon
            OutlinedIcon={icon?.outlined ?? QuestionCircleOutlined}
            FilledIcon={icon?.filled}
            name={route.name}
          />
        ),
        key: route.path,
        onClick: () => {
          navigate(route.path)
          handleDrawer(false)
        },
      })
    })

    setItems([...menuItems])
  }, [mainRoutes])

  useLayoutEffect(() => {
    setMainRoutes(routes)
  }, [])

  const RoutesMenu = (
    <Menu
      mode='inline'
      style={{ backgroundColor: 'inherit', borderInlineEnd: 'none' }}
      items={items}
      defaultSelectedKeys={[location.pathname]}
      openKeys={openSubMenu ? [openSubMenu] : []}
      onOpenChange={(openKeys) => setOpenSubMenu(openKeys[openKeys.length - 1])}
    />
  )

  return (
    <Layout className='layout'>
      <Sidebar
        menu={RoutesMenu}
      />

      <section
        className='layout__main-content'
        ref={mainContentRef}
        id='main-content'
      >
        <FloatButton.BackTop />

        <Navbar
          menu={RoutesMenu}
          visible={drawerVisible}
          handleDrawer={handleDrawer}
        />

        <Content id='infinite-scroller '>
          <Row justify='center' align='middle' className='flex-col w-full mt-4'>
            <Typography.Title level={3}>
              {routeTitle}
            </Typography.Title>

            <main className='layout__content'>
              {children}
            </main>
          </Row>
        </Content>
      </section>
    </Layout>
  )
}

export default BaseLayout
