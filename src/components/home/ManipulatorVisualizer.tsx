import { Speed } from '@mui/icons-material'
import { Box, Slider, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { FC, useState } from 'react'

const ManipulatorVisualizer: FC<{ position: { x: number; y: number } }> = ({ position }) => {
  const [speed, setSpeed] = useState<number>(1)

  const gridCellSize = 10
  const gridSize = 30

  return (
    <Box className="space-y-2">
      <Typography variant="h6" color="primary">
        ManipulatorVisualizer
      </Typography>

      <Box className="flex items-center gap-2">
        <Slider
          value={speed}
          onChange={(_, newValue) => setSpeed(newValue as number)}
          min={0.1}
          max={5}
          step={0.1}
          valueLabelDisplay="auto"
          sx={{ width: 300 }}
        />
        <Speed color="primary" />
        <Typography color="primary">{speed}</Typography>
      </Box>

      <Typography color="textSecondary">{`x: ${position.x}, y: ${position.y}`}</Typography>

      <Box
        className={`relative grid h-[300px] w-[300px] grid-cols-[repeat(${gridSize},_${gridCellSize}px)] grid-rows-[repeat(${gridSize},_${gridCellSize}px)] border border-gray-300`}>
        {Array.from({ length: gridSize * gridSize }).map((_, idx) => (
          <Box key={idx} className="border border-gray-200" />
        ))}

        <motion.div
          className="absolute h-[10px] w-[10px] rounded-full bg-blue-500"
          animate={{
            x: position.x * gridCellSize,
            y: position.y * gridCellSize
          }}
          transition={{ duration: speed, ease: 'easeInOut' }}
        />
      </Box>
    </Box>
  )
}

export default ManipulatorVisualizer
