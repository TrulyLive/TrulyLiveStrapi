import React, { Fragment } from 'react'
import spinner from '../public/images/spinner.gif'
import Image from 'next/image'
const Spinner = () => (
  <Fragment>
    <Image
      src={spinner}
      alt="Loading..."
      height={100}
      width={100}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
)

export default Spinner
