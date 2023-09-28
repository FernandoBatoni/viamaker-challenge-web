import React, { ElementType } from 'react'
import { useLocation } from 'react-router-dom'


function PathIcon ({ OutlinedIcon, FilledIcon, name, ...rest }: { OutlinedIcon: ElementType, FilledIcon?: ElementType, name?: string }) {
  const location = useLocation()
  const isAtPath = name ? location.pathname.includes(name) : ''

  return (
    (isAtPath && FilledIcon)
      ? <FilledIcon {...rest} />
      : <OutlinedIcon {...rest} />
  )
}

export default PathIcon
