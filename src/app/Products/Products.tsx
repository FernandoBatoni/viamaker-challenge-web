import { App, Col, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { ContextModal, ModalContainer } from '../../components/ContextModal/ContextModal'
import ProductsRepository from '../../repositories/ProductsRepository'
import { productColumns } from './productsColumns'
import { IProduct } from './productsInterfaces'

function Products() {
  const { message } = App.useApp()
  const [products, setProducts] = useState<Array<IProduct>>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0)

  const onViewProduct = (index: number) => {
    setSelectedProductIndex(index)
    setModalOpen(true)
  }

  const getProducts = async () => {
    try {
      const response = await ProductsRepository.getAll()

      if (!response || !response.data.data) {
        throw new Error('Erro ao buscar Produtos')
      }

      setProducts(response.data.data)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      message.error(messageError)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Row gutter={16} className='m-4'>
      <ModalContainer open={modalOpen} onCancel={() => setModalOpen(false)}>
        {selectedProductIndex !== null && (
          <ContextModal products={products} modalOpen={modalOpen} productIndex={selectedProductIndex} />
        )}
      </ModalContainer>

      <Col span={24}>
        <Typography.Title level={5}>
          Lista de Produtos disponíveis
        </Typography.Title>
      </Col>

      <Col span={24}>
        <Table
          dataSource={products}
          columns={productColumns({ onViewProduct })}
        />
      </Col>
    </Row>
  )
}

export default Products
