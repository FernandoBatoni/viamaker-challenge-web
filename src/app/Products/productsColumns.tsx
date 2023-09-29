import { EyeOutlined } from "@ant-design/icons"
import { ColumnType } from "antd/es/table"
import React from 'react'

import { format } from "../../utils/format"
import { IProduct } from "./productsInterfaces"

interface IProductColumn {
  onViewProduct: (index: number) => void
}

const productColumns = (actions: IProductColumn) => {
  const columns: Array<ColumnType<IProduct>> = [
    {
      title: 'Nome do Produto',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'Preço do Produto',
      dataIndex: 'value',
      width: 250,
      render: (value: number) => {
        return format.formatBRL(value)
      }
    },
    {
      title: 'Ações',
      width: 10,
      render: (_, row: IProduct, index: number) => (
        <EyeOutlined onClick={() => actions.onViewProduct(index)} color="var(--primary-color)" />
      )
    }
  ]

  return columns
}

export {
  productColumns
}
