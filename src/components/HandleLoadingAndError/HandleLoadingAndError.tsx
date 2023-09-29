import { Col, Result, Row, Skeleton } from 'antd'
import React from 'react'

interface IHandleLoadingAndError {
  children?: React.ReactNode
  loading: boolean
  error?: string | boolean
  videoSkeleton?: boolean
  skeletonNumber?: number
  xxl?: number
  xl?: number
  md?: number
  sm?: number
  xs?: number
}

function HandleLoadingAndError(
  {
    children, loading, error, videoSkeleton,
    skeletonNumber, xxl, xl, md, sm, xs
  }: IHandleLoadingAndError) {
  if (error) {
    return (
      <Result
        status='error'
        title='Erro ao carregar as informações.'
        subTitle={typeof error === 'string' ? error : 'Tente novamente mais tarde'}
      />
    )
  }

  if (loading) {
    return (
      <Row gutter={[ 15,15 ]} className=''>
        {videoSkeleton &&
          <Col span={24}>
            <Skeleton.Button active className='handle-load-error__video-skeleton' />
          </Col>
        }
        {Array(skeletonNumber ?? 4).fill(' ').map((_, idx) =>
          <Col
            xxl={xxl ?? 6}
            xl={xl ?? 6}
            md={md ?? 12}
            sm={sm ?? 24}
            xs={xs ?? 24}
            key={idx}
          >
            <Skeleton.Button
              key={idx}
              active
              className='handle-load-error'
            />
          </Col>
        )}
      </Row>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default HandleLoadingAndError
