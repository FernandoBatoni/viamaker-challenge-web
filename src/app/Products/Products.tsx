import { LoadingOutlined } from '@ant-design/icons'
import { Col, Result, Row, Spin, Table, Typography } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

import { ContextModal, ModalContainer } from '../../components/ContextModal/ContextModal'
import ProductsRepository from '../../repositories/ProductsRepository'
import { productColumns } from './productsColumns'
import { IProduct } from './productsInterfaces'

function Products() {
  const [products, setProducts] = useState<Array<IProduct>>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const onViewProduct = (index: number) => {
    setSelectedProductIndex(index)
    setModalOpen(true)
  }

  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await ProductsRepository.getAll()

      if (!response || !response.data.data) {
        throw new Error('Erro ao buscar Produtos')
      }
      setProducts(response.data.data)
      setLoading(false)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      setError(messageError)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const renderTableIcon = useMemo(() => {
    if (loading) return <Result subTitle='Carregando informações.' />
    if (error) return <Result status='error' subTitle={error} />
    return <Result status={404} subTitle='Sem resultados' />
  }, [error, loading])

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
        <Spin indicator={<LoadingOutlined />} spinning={loading}>
          <Table
            dataSource={products}
            columns={productColumns({ onViewProduct })}
            locale={{ emptyText: renderTableIcon }}
          />
        </Spin>
      </Col>
    </Row>
  )
}

export default Products
