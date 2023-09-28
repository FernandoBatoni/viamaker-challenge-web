
import { App, Col, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import VideoRepository from '../../repositories/VideoRepository'
import { IVideos } from './homeInterfaces'

function Home() {
  const { message } = App.useApp()
  const [videos, setVideos] = useState<IVideos>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const getVideos = async () => {
    const source = axios.CancelToken.source()
    setLoading(true)

    try {
      const response = await VideoRepository.getAll({ cancelToken: source.token })

      if (!response) throw new Error('Erro ao se comunicar com o servidor')

      if (!response.data.data) throw new Error('Erro ao encontrar formulário de Sac')

      setVideos(response.data.data)
      setLoading(false)

    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      message.error(messageError)
      setError(messageError)
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    getVideos()
  }, [])

  return (
    <>
      <Col span={24} className='flex flex-col justify-center align-middle'>
        <Typography.Title level={5}>
          Meu vídeo favorito
        </Typography.Title>

        <ReactPlayer url='https://www.youtube.com/embed/Bqzb0gErek8?si=sJODH-2m-5sqYBL4' />
      </Col>

      <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24}>

      </Col>
    </>
  )
}

export default Home
