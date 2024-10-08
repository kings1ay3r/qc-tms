import * as yup from 'yup'

export type Truck = {
  id: number
  uid: string | undefined
  name: string | undefined
  model: string | undefined
  year: number
  licensePlate: string | undefined
  make: string | undefined
  brand: string | undefined
  capacity: number | undefined
  locationId: number
}
export type CreateTruckRequest = {
  licensePlate: string
  name: string
  make: string
  brand: string
  model: string
  year: number
  capacity: number
  locationUuid: string
}

export type UpdateTruckRequest = {
  licensePlate: string
  name?: string
  make?: string
  brand?: string
  model?: string
  year?: number
  capacity?: number
  locationUuid?: string
}

export const createTruckSchema = () => {
  return yup.object().shape({
    licensePlate: yup.string().required('License plate is required.'),
    name: yup.string().required('Truck name is required.'),
    make: yup.string().required('Make of the truck is required.'),
    brand: yup.string().required('Brand of the truck is required.'),
    model: yup.string().required('Model of the truck is required.'),
    year: yup
      .number()
      .required('Year of the truck is required.')
      .typeError('Year must be a number.') // Custom error message for type errors
      .integer('Year must be an integer.')
      .min(1900, 'Year must be no earlier than 1900.')
      .max(new Date().getFullYear(), `Year must be no later than ${new Date().getFullYear()}.`),
    capacity: yup
      .number()
      .required('Capacity is required.')
      .typeError('Capacity must be a number.') // Custom error message for type errors
      .positive('Capacity must be a positive number.'),
    locationUuid: yup.string().required('Location UID is required.'),
  })
}

export const updateTruckSchema = () => {
  return yup.object().shape({
    licensePlate: yup.string(),
    make: yup.string(),
    brand: yup.string(),
    model: yup.string(),
    year: yup
      .number()
      .typeError('Year must be a number.') // Custom error message for type errors
      .integer('Year must be an integer.')
      .min(1900, 'Year must be no earlier than 1900.')
      .max(new Date().getFullYear(), `Year must be no later than ${new Date().getFullYear()}.`),
    capacity: yup
      .number()
      .typeError('Capacity must be a number.') // Custom error message for type errors
      .positive('Capacity must be a positive number.'),
    locationUuid: yup.string(),
  })
}
