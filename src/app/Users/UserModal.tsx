import { Button, Modal, Row } from 'antd'
import React from 'react'

type IUserModal = {
  open: boolean
  setOpen: (value: boolean) => void
}

function UserModal({ open, setOpen }: IUserModal) {
  return (
    <Modal open={open}>


      <Row className='responsive-button-group'>
        <Button>
          Cancelar
        </Button>

        <Button type='primary'>
          Adicionar
        </Button>
      </Row>
    </Modal>
  )
}

export default UserModal
