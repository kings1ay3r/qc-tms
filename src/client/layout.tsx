import React, { Fragment, ReactNode, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAccessor from './customHooks/useAccessor'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessor, setAccessor } = useAccessor()
  const [sidebarOpen, setSidebarOpen] = useState(!!accessor)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', current: false },
    { name: 'Trucks', href: '/trucks', current: false },
    { name: 'Locations', href: '/locations', current: false },
  ]

  if (location.pathname) {
    navigation.map(item => {
      if (location.pathname == '/' && item.href == '/') {
        item.current = true
      } else if (item.href != '/' && location.pathname.trim().startsWith(item.href)) {
        item.current = true
      }
      return item
    })
  }

  const userNavigation = [
    {
      name: 'Sign out',
      href: '/login',
      onClick: () => {
        setAccessor(null)
      },
    },
  ]

  const navigate = useNavigate()

  if (!accessor || accessor.claims === undefined) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <div className='min-h-full'>
        <div className='bg-gray-800 pb-32'>
          <Disclosure as='nav' className='bg-gray-800'>
            {({ open }) => (
              <>
                <div className='mx-auto sm:px-6 lg:px-8'>
                  <div className='border-b border-gray-700'>
                    <div className='flex h-16 items-center justify-between px-4 sm:px-0'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <span className={'text-2xl font-semibold text-white'}>Q</span>
                        </div>
                        <div className='hidden md:block'>
                          <div className='ml-10 flex items-baseline space-x-4'>
                            {navigation.map(item => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium',
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className='hidden md:block'>
                        <div className='ml-4 flex items-center md:ml-6'>
                          {/* Profile dropdown */}
                          <Menu as='div' className='relative ml-3'>
                            <div>
                              <Menu.Button className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                <span className='absolute -inset-1.5' />
                                <span className='sr-only'>Open user menu</span>
                                <img className='h-8 w-8 rounded-full' src={accessor.img} alt='' />
                                <span className={'text-white mx-2'}>{accessor.name}</span>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter='transition ease-out duration-100'
                              enterFrom='transform opacity-0 scale-95'
                              enterTo='transform opacity-100 scale-100'
                              leave='transition ease-in duration-75'
                              leaveFrom='transform opacity-100 scale-100'
                              leaveTo='transform opacity-0 scale-95'
                            >
                              <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                {userNavigation.map(item => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <div
                                        // href={item.href}
                                        onClick={item.onClick}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                                        )}
                                      >
                                        {item.name}
                                      </div>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className='-mr-2 flex md:hidden'>
                        {/* Mobile menu button */}
                        <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='absolute -inset-0.5' />
                          <span className='sr-only'>Open main menu</span>
                          {open ? <>x</> : <>!</>}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className='border-b border-gray-700 md:hidden'>
                  <div className='space-y-1 px-2 py-3 sm:px-3'>
                    {navigation.map(item => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className='border-t border-gray-700 pb-3 pt-4'>
                    <div className='flex items-center px-5'>
                      <div className='flex-shrink-0'>
                        <img className='h-10 w-10 rounded-full' src={accessor.img} alt='' />
                      </div>
                      <div className='ml-3'>
                        <div className='text-base font-medium leading-none text-white'>
                          {accessor.name}
                        </div>
                      </div>
                    </div>
                    <div className='mt-3 space-y-1 px-2'>
                      {userNavigation.map(item => (
                        <Disclosure.Button
                          key={item.name}
                          as='a'
                          onClick={item.onClick}
                          className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className='py-10'>
            <div className='mx-auto px-4 sm:px-6 lg:px-8'>
              <h1 className='text-3xl font-bold tracking-tight text-white'>
                {navigation.filter(item => item.current === true)[0]?.name}
              </h1>
            </div>
          </header>
        </div>

        <main className='-mt-32'>
          <div className='mx-auto  px-4 pb-12 sm:px-6 lg:px-8'>
            <div className='rounded-lg bg-white px-5 py-6 shadow sm:px-6'>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default DefaultLayout
