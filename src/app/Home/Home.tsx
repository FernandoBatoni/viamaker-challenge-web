import { App, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import VideoRepository from '../../repositories/VideoRepository'
import { IVideos } from './homeInterfaces'

function Home() {
  const { message } = App.useApp()
  const [videos, setVideos] = useState<Array<IVideos>>([])
  const [mainVideoIndex, setMainVideoIndex] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const getVideos = async () => {
    try {
      const response = await VideoRepository.getAll()
      if (!response || !response.data.data) {
        throw new Error('Erro ao buscar vídeos')
      }
      setVideos(response.data.data)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      message.error(messageError)
      setError(messageError)
      setLoading(false)
    }
  }

  useEffect(() => {
    getVideos()
  }, [mainVideoIndex])

  const handleVideoClick = (index: number) => {
    if (index !== mainVideoIndex) {
      const newVideos = [...videos]
      const tempMainVideo = newVideos[mainVideoIndex]

      newVideos.splice(mainVideoIndex, 1, newVideos[index])
      newVideos.splice(index, 1, tempMainVideo)

      setVideos(newVideos)
      setMainVideoIndex(index)
    }
  }

  return (
    <div>
      <Typography.Title level={4}>
        Meu vídeo favorito
      </Typography.Title>
      <ReactPlayer width="100%" url={videos[mainVideoIndex]?.video} playing />

      <Typography.Title level={5} className='mt-4'>
        Outros vídeos que eu gosto
      </Typography.Title>
      <Row gutter={16} style={{ margin: '16px 0' }}>
        {videos.map((video, index) => (
          index !== mainVideoIndex && (
            <Col
              key={video.videoCode}
              xxl={6}
              xl={6}
              lg={6}
              md={12}
              sm={24}
              xs={24}
              style={{
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              <ReactPlayer width="100%" url={video.video} onStart={() => handleVideoClick(index)} />
            </Col>
          )
        ))}
      </Row>
    </div>
  )
}

export default Home
