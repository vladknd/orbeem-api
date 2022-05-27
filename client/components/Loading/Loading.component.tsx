import React from 'react'
import Image from 'next/image'
import { LoadingContainer } from './Loading.styled'

const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <Image src="/loading.svg" width={150} height={150}/>
    </LoadingContainer>
  )
}

export default LoadingComponent