import { App, Button, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect } from 'react'

import { useValidation } from '../../hooks/useValidate'
import { IErrorForm } from '../../repositories/Repository'
import UserRepository from '../../repositories/UserRepository'
import { IUser } from './userInterfaces'

type IUserModal = {
  open: boolean
  onUserChange: () => Promise<void>
  editUser: IUser | null
  onCancel: () => void
}

function UserModal({ open, onUserChange, editUser, onCancel }: IUserModal) {
  const [userForm] = Form.useForm<IUser>()
  const { message } = App.useApp()
  const {
    validateAllResponse, loading, errors, setLoading
  } = useValidation<IErrorForm<IUser>>()

  const editText = editUser ? 'Alterar' : 'Adicionar'

  useEffect(() => {
    if (editUser) {
      userForm.setFieldsValue(editUser)
    }
  }, [editUser, userForm])

  const finishUserForm = async (values: IUser) => {
    setLoading(true)

    try {
      let response

      if (editUser) {
        response = await UserRepository.update(editUser._id, values)
      } else {
        response = await UserRepository.create(values)
      }

      if (!response) throw new Error('Falha ao se comunicar com servidor, tente novamente mais tarde.')

      message.success(response.data.message)
      setLoading(false)
      onUserChange()
      userForm.resetFields()
      onCancel()
    } catch (err) {
      if (err.errors && err.errors?.invalid) message.warning({
        content: validateAllResponse(err.errors.invalid, err.message)
      })

      else message.error(err.message)
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      footer={null}
      title={`${editText} usuário`}
      onCancel={onCancel}
    >
      <Form layout='vertical' onFinish={finishUserForm} form={userForm}>
        <Row gutter={15}>
          <Col xxl={12} xl={12} md={24} sm={24} xs={24}>
            <Form.Item
              name='name'
              label='Nome'
              help={errors.name && (errors.name)}
              validateStatus={errors.name && 'error'}
            >
              <Input placeholder='Exemplo: Nome Sobrenome' />
            </Form.Item>
          </Col>

          <Col xxl={12} xl={12} md={24} sm={24} xs={24}>
            <Form.Item
              name='email'
              label='E-mail'
              help={errors.email && (errors.email)}
              validateStatus={errors.email && 'error'}
            >
              <Input
                inputMode='email'
                placeholder='Exemplo: xxx@email.com'
                autoComplete='email'
              />
            </Form.Item>
          </Col>
        </Row>

        <Row className='responsive-button-group' justify='center'>
          <Button onClick={onCancel}>
            Cancelar
          </Button>

          <Button type='primary' htmlType='submit' loading={loading}>
            {editText}
          </Button>
        </Row>
      </Form>
    </Modal>
  )
}

export default UserModal
