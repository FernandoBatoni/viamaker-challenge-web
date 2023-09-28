import { ColumnType } from "antd/es/table"

import { format } from "../../utils/format"
import { IProduct } from "./productsInterfaces"

// interface ITicketColumns {
//   onUpdate: (ticketId: string) => void
// }

// const updateOrBlock = ({ userDepartment, onUpdate }: ITicketColumns) => ({
//   title: 'Prioridade (TI)',
//   dataIndex: 'itPriority',
//   width: 140,
// })

const productColumns = () => {
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
    // updateOrBlock({ userDepartment, onUpdate }),
  ]

  return columns
}

export {
  productColumns
}
