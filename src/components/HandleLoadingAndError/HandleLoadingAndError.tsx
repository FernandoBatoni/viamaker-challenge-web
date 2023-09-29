import { Result, Skeleton } from 'antd'
import React from 'react'

interface IHandleLoadingAndError {
  children?: React.ReactNode
  loading: boolean
  error?: string | boolean
  arrayNumber?: number
}

function HandleLoadingAndError(
  { arrayNumber, children, loading, error}: IHandleLoadingAndError
) {
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
      <div className='flex flex-wrap gap-3 flex-space-around'>
        {Array(arrayNumber || 4).fill(' ').map((_, idx) =>
          <Skeleton.Button key={idx} active className='handle-load-error' />
        )}
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default HandleLoadingAndError
