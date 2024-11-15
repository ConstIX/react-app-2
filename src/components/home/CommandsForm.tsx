import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import moment from 'moment'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateCommandsMutation } from '../../redux/services/commands'
import { calculateFinalPosition } from '../../utils/calculateFinalPosition'
import { optimizeCommands } from '../../utils/optimizeCommands'

interface ICommandsForm {
  position: { x: number; y: number }
  setPosition: (obj: { x: number; y: number }) => void
}

const CommandsForm: FC<ICommandsForm> = ({ position, setPosition }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ commands: string }>()
  const [snackbarState, setSnackbarState] = useState<{ message: string; open: boolean; severity: 'error' | 'success' }>(
    { message: '', open: false, severity: 'success' as 'success' | 'error' }
  )
  const [createCommands] = useCreateCommandsMutation()

  const handleSendCommands = (data: { commands: string }) => {
    try {
      const optimizedCommands = optimizeCommands(data.commands.toUpperCase())
      const finalPosition = calculateFinalPosition(position, data.commands.toUpperCase())

      createCommands({
        original: data.commands.toUpperCase(),
        optimized: optimizedCommands,
        date: moment().format('DD/MM/YYYY'),
        time: moment().format('HH:mm'),
        initialPosition: `(${position.x}, ${position.y})`,
        finalPosition: `(${finalPosition.x}, ${finalPosition.y})`
      })

      setPosition(finalPosition)
      reset()

      setSnackbarState({ message: 'Success!', open: true, severity: 'success' })
    } catch (error) {
      setSnackbarState({ message: 'Error!', open: true, severity: 'error' })
      console.error('Failed to register:', error)
    }
  }

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(handleSendCommands)} className="flex items-start gap-3">
        <TextField
          label="Commands"
          size="small"
          fullWidth
          {...register('commands', {
            required: 'This field is required!',
            pattern: {
              value: /^[ЛПВНОБ]+$/i,
              message: 'Only commands Л, П, В, Н, О, Б are allowed'
            }
          })}
          error={!!errors.commands}
          helperText={errors.commands?.message as string}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          sx={{ width: '200px', height: '40px' }}>
          Send
        </Button>
      </Box>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default CommandsForm
