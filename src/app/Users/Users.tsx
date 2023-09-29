import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Col, Popconfirm, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import UserRepository from '../../repositories/UserRepository'
import { IUser } from './userInterfaces'
import UserModal from './UserModal'

function Users() {
  const { message } = App.useApp()
  const [users, setUsers] = useState<IUser[]>([])
  const [openUserModal, setOpenUserModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await UserRepository.getAll()

      if (!response) throw new Error('Erro ao se comunicar com o servidor')

      setUsers(response.data.data || [])
      setLoading(false)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      setError(messageError)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  async function deleteUser(userId: string) {
    try {
      const response = await UserRepository.delete(userId)
      await getUsers()
      message.success(response?.data?.message)
    } catch (err) {
      message.error(err.message)
    }
  }

  return (
    <Row gutter={[15, 15]} className='user'>
      <UserModal
        open={openUserModal}
        setOpen={setOpenUserModal}
        onUserChange={() => getUsers()}
      />

      <Col span={24} className='flex w-full justify-between items-center'>
        <Typography.Title level={5}>Lista de usuários disponíveis</Typography.Title>

        <Button type='primary' onClick={() => setOpenUserModal(true)}>
          Adicionar
        </Button>
      </Col>

      {users.map((user) => (
        <Col span={24} key={user.name}>
          <Card className='user__card'>
            <Typography.Title level={5}>{user.name}</Typography.Title>

            <section className='user__action-section'>
              <EditOutlined style={{ color: 'var(--cool-blue-status)' }} />
              <Popconfirm
                title='Atenção!'
                description='Tem certeza que deseja remover este usuário?'
                placement='top'
                onConfirm={() => deleteUser(user._id)}
                okText='Remover'
              >
                <DeleteOutlined style={{ color: 'var(--red-status)' }} />
              </Popconfirm>
            </section>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Users
