import { App, Col, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import ProductsRepository from '../../repositories/ProductsRepository'
import { productColumns } from './productsColumns'
import { IProduct } from './productsInterfaces'

function Products() {
  const { message } = App.useApp()
  const [products, setProducts] = useState<Array<IProduct>>([])
  const [mainVideoIndex, setMainVideoIndex] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await ProductsRepository.getAll()

      if (!response) throw new Error ('Erro ao se comunicar com o servidor')
      if (!response.data.data) throw new Error('Erro ao buscar Produtos')

      setProducts(response.data.data)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      message.error(messageError)
      setError(messageError)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Row gutter={16} className='m-4'>
      <Col span={24}>
        <Typography.Title level={5}>
        Lista de Produtos disponíveis
        </Typography.Title>
      </Col>

      <Col span={24}>
        <Table
          dataSource={products}
          columns={productColumns()}
        />
      </Col>
    </Row>
  )
}

export default Products
