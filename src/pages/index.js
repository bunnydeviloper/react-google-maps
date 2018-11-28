import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import GoogleMap from '../components/map'

const IndexPage = () => (
  <Layout>
    <p>Powered By Google Maps API</p>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
      <GoogleMap />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
