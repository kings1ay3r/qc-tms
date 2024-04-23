import React from 'react'
import { useForm } from 'react-hook-form'
import useNotify from '../../customHooks/useNotify'
import { createTruckSchema } from '@dtos'

import locations from '@web/pages/Locations'
import { yupResolver } from '@hookform/resolvers/yup'

interface LocationFormInputs {
  name: string
  longitude: number
  lattitude: number
  address: string
}

interface LocationFormModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onSubmit: (data: LocationFormInputs) => void
}

const Form = ({ onSubmit, initialValues = {}, locationsList }) => {
  const schema = createTruckSchema()

  // Use RHF to manage form state and validation (inline)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const showToast = useNotify()

  const onSubmitHandler = data => {
    // Basic validation before submitting (can be improved)
    let isValid = true

    if (isValid) {
      return onSubmit(data) // Pass data to parent component
    }
    showToast(Object.values(errors).join(', '), 'error')
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-4'>
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Name
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='text'
              {...register('name')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.name?.message && <p className='text-red-500 text-xs'>{errors.name?.message}</p>}
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          License Plate
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='text'
              {...register('licensePlate')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.licensePlate?.message && (
        <p className='text-red-500 text-xs'>{errors.licensePlate?.message}</p>
      )}

      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Location
        </label>
        <div className='mt-2'>
          {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
          <select
            {...register('locationUid')}
            className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 h-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-md'
          >
            {locationsList.map((location: locations) => (
              <option key={location.uid} value={location.uid}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errors.locationUid?.message && (
        <p className='text-red-500 text-xs'>{errors.locationUid?.message}</p>
      )}
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Make
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='text'
              {...register('make')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.make?.message && <p className='text-red-500 text-xs'>{errors.make?.message}</p>}
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Brand
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='text'
              {...register('brand')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.brand?.message && <p className='text-red-500 text-xs'>{errors.brand?.message}</p>}
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Model
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='text'
              {...register('model')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.model?.message && <p className='text-red-500 text-xs'>{errors.model?.message}</p>}
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Year
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='number'
              min={1900}
              max={9999}
              {...register('year')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.year?.message && <p className='text-red-500 text-xs'>{errors.year?.message}</p>}
      <div className='sm:col-span-4'>
        <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
          Capacity
        </label>
        <div className='mt-2'>
          <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
            {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
            <input
              type='number'
              min={0}
              max={9999}
              {...register('capacity')}
              className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
      </div>
      {errors.capacity?.message && (
        <p className='text-red-500 text-xs'>{errors.capacity?.message}</p>
      )}

      <div className='flex justify-center'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

const EditTruckForm: React.FC<LocationFormModalProps> = ({
  onSubmit,
  data,
  handleCloseModal,
  locations,
}) => {
  return (
    <>
      <Form
        initialValues={data}
        locationsList={locations}
        onSubmit={data => {
          onSubmit(data)
          handleCloseModal()
        }}
      />
    </>
  )
}

export default EditTruckForm
