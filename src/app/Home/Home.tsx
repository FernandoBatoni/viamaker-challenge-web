import { App, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import HandleLoadingAndError from '../../components/HandleLoadingAndError/HandleLoadingAndError'
import YoutubeVideoPlayer from '../../components/YoutubeVideoPlayer/YoutubeVideoPlayer'
import VideoRepository from '../../repositories/VideoRepository'
import { IVideos } from './homeInterfaces'

function Home() {
  const { message } = App.useApp()
  const [videos, setVideos] = useState<Array<IVideos>>([])
  const [mainVideoIndex, setMainVideoIndex] = useState(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  const getVideos = async () => {
    setLoading(true)
    try {
      const response = await VideoRepository.getAll()

      if (!response) throw new Error ('Erro ao se comunicar com o servidor')
      if (!response.data.data) throw new Error('Erro ao buscar Videos')

      setVideos(response.data.data)
      setLoading(false)
    } catch (err) {
      const messageError = err.message || 'Erro desconhecido'
      message.error(messageError)
      setError(messageError)
      setLoading(false)
    }
  }

  const handleVideoClick = (index: number) => {
    if (index !== mainVideoIndex) {
      const newVideos = [...videos]
      const tempMainVideo = newVideos[mainVideoIndex]

      newVideos.splice(mainVideoIndex, 1, newVideos[index])
      newVideos.splice(index, 1, tempMainVideo)

      setVideos(newVideos)
      setMainVideoIndex(index)
      console.log(index)
    }
  }

  useEffect(() => {
    getVideos()
  }, [mainVideoIndex])

  return (
    <HandleLoadingAndError loading={loading} error={error} videoSkeleton>
      <Typography.Title level={4}>
        Meu vídeo favorito
      </Typography.Title>
      <YoutubeVideoPlayer embedId={videos[mainVideoIndex]?.video} autoplay={true} />

      <Typography.Title level={5} className='mt-4'>
        Outros vídeos que eu gosto
      </Typography.Title>
      <Row gutter={16} className='m-4'>
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
              <YoutubeVideoPlayer
                embedId={video.video}
                onClick={() => {
                  handleVideoClick(index)
                  console.log('ENTERS')
                }}
              />
            </Col>
          )
        ))}
      </Row>
    </HandleLoadingAndError>
  )
}

export default Home
