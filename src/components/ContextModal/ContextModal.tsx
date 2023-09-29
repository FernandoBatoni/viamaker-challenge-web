import { Divider, Modal, Row, Tag, Typography } from 'antd'
import React, { ReactNode, useContext } from 'react'

import { IProduct } from '../../app/Products/productsInterfaces'
import { format } from '../../utils/format'

interface IModalContext {
  open: boolean
}

interface IBaseModalProps {
  products: IProduct[]
  modalOpen: boolean
  productIndex: number
}

const RenderModal = React.createContext<IModalContext>({ open: false })

function ModalContainer({ children, open, onCancel }: { children: ReactNode, open: boolean, onCancel: (value: boolean) => void }) {
  const renderingOpen = useContext(RenderModal)

  return (
    <Modal open={renderingOpen.open !== open} footer={null} onCancel={() => onCancel(false)}>
      {children}
    </Modal>
  )
}

function ContextModal({
  products, modalOpen, productIndex
}: IBaseModalProps) {
  const product = products[productIndex]

  return (
    <RenderModal.Provider value={{ open: modalOpen }}>
      {product && (
        <Row gutter={15}>
          <section className='flex w-4/5 justify-between items-center'>
            <Typography.Title level={5}>
              {product.name}
            </Typography.Title>

            <Tag color='var(--green-status)'>
              {format.formatBRL(product.value)}
            </Tag>

          </section>
          <Divider />

          <Typography.Paragraph>
            {product.description}
          </Typography.Paragraph>
        </Row>
      )}
    </RenderModal.Provider>
  )
}

export { ContextModal, ModalContainer }
