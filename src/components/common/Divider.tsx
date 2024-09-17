import classNames from 'classnames'
import React from 'react'

type DividerProps = {
  className?: string
}

const Divider = ({ className }: DividerProps) => {
  return <div className={classNames(className, 'bg-dark-lime-green opacity-[0.2] h-[1px] w-full')} />
}

export default Divider
