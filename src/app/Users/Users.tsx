import { App, Button, Card, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import UserRepository from '../../repositories/UserRepository'
import { IUser } from './userInterfaces'

function Users() {
  const { message } = App.useApp()
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const getUsers = async () => {
    try {
      const response = await UserRepository.getAll()

      if (!response) throw new Error ('Erro ao se comunicar com o servidor')
      if (!response.data.data) throw new Error('Erro ao buscar usuários')

      setUsers(response.data.data)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      message.error(messageError)
      setError(messageError)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Row gutter={15}>
      <Col span={24} className='flex w-full justify-between items-center'>
        <Typography.Title level={5}>Lista de usuários disponíveis</Typography.Title>

        <Button type='primary'>
          Adicionar
        </Button>
      </Col>

      {users.map((user) => (
        <Col span={24} key={user.name}>
          <Card>
            <Typography.Title level={5}>{user.name}</Typography.Title>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Users
