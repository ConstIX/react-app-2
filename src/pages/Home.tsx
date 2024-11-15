import { Box } from '@mui/material'

import { FC, useState } from 'react'
import CommandsForm from '../components/home/CommandsForm'
import CommandsHistory from '../components/home/CommandsHistory'
import ManipulatorVisualizer from '../components/home/ManipulatorVisualizer'

const Home: FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  return (
    <Box className="custom-container space-y-10">
      <CommandsForm position={position} setPosition={setPosition} />
      <CommandsHistory />
      <ManipulatorVisualizer position={position} />
    </Box>
  )
}

export default Home
