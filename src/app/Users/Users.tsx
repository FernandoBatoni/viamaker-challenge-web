import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { App, Button, Card, Col, Popconfirm, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import HandleLoadingAndError from '../../components/HandleLoadingAndError/HandleLoadingAndError'
import UserRepository from '../../repositories/UserRepository'
import { IUser } from './userInterfaces'
import UserModal from './UserModal'

function Users() {
  const { message } = App.useApp()
  const [users, setUsers] = useState<IUser[]>([])
  const [editingUser, setEditingUser] = useState<IUser | null>(null)
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

  const onCancel = () => {
    setOpenUserModal(false)
    setEditingUser(null)
  }

  return (
    <Row gutter={[15, 15]} className='user w-full'>
      <UserModal
        open={openUserModal}
        onUserChange={() =>getUsers()}
        editUser={editingUser}
        onCancel={onCancel}
      />

      <Col span={24} className='flex w-full justify-between items-center'>
        <Typography.Title level={5}>Lista de usuários disponíveis</Typography.Title>

        <Button type='primary' onClick={() => setOpenUserModal(true)}>
          Adicionar
        </Button>
      </Col>

      <Col span={24}>
        <HandleLoadingAndError
          loading={loading}
          error={error}
          xxl={24}
          xl={24}
          md={24}
          sm={24}
          xs={24}
        >
          {users.map((user) => (
            <Col span={24} key={user.name}>
              <Card className='user__card'>
                <Typography.Title level={5}>{user.name}</Typography.Title>

                <section className='user__action-section'>
                  <EditOutlined
                    style={{ color: 'var(--cool-blue-status)' }}
                    onClick={() => {
                      setEditingUser(user)
                      setOpenUserModal(true)
                    }}
                  />
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
        </HandleLoadingAndError>
      </Col>
    </Row>
  )
}

export default Users
