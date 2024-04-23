import React from 'react'
import Map from '../../components/Map'
import { useApiCall } from '../../customHooks/useApiCall'

const getMarkers = (locationsList, trucksList) => {
  if (!locationsList?.data || !trucksList?.data) return []

  const locations = locationsList.data

  const locationHashMap = []

  locations.map(location => {
    locationHashMap[location.uid] = {
      position: [location.lattitude, location.longitude],
      name: location.name,
      uid: location.uid,
      trucks: [],
    }
  })

  trucksList.data.map(item => {
    if (locationHashMap[item.location.uid]) locationHashMap[item.location.uid].trucks.push(item)
  })
  return Object.values(locationHashMap)
}

const Dashboard: React.FC = () => {
  const locationsResp = useApiCall({
    queryKey: ['locations'],
    url: '/locations',
    method: 'GET',
  })
  const { data: locationsList } = locationsResp

  const trucksResp = useApiCall({
    queryKey: ['trucks'],
    url: '/trucks',
    method: 'GET',
  })
  const { data: trucksList } = trucksResp
  const markers = getMarkers(locationsList, trucksList)

  const mapCenter = markers?.length ? markers[0]?.position : [52.2676, 4.9041]

  return (
    <div className={'h-full'}>
      <h5 className={'italic text-right flex flex-row-reverse'}>
        <span className={'mx-1'}>
          Click on a location marker to see the details of the location.
        </span>
        <svg
          fill='#ceceff'
          height='20px'
          width='20px'
          version='1.1'
          id='Layer_1'
          xmlns='http://www.w3.org/2000/svg'
          xmlns:xlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 493.636 493.636'
          xml:space='preserve'
        >
          <g>
            <g>
              <path
                d='M421.428,72.476C374.868,25.84,312.86,0.104,246.724,0.044C110.792,0.044,0.112,110.624,0,246.548
			c-0.068,65.912,25.544,127.944,72.1,174.584c46.564,46.644,108.492,72.46,174.4,72.46h0.58v-0.048
			c134.956,0,246.428-110.608,246.556-246.532C493.7,181.12,468,119.124,421.428,72.476z M257.516,377.292
			c-2.852,2.856-6.844,4.5-10.904,4.5c-4.052,0-8.044-1.66-10.932-4.516c-2.856-2.864-4.496-6.852-4.492-10.916
			c0.004-4.072,1.876-8.044,4.732-10.884c2.884-2.86,7.218-4.511,11.047-4.542c3.992,0.038,7.811,1.689,10.677,4.562
			c2.872,2.848,4.46,6.816,4.456,10.884C262.096,370.46,260.404,374.432,257.516,377.292z M262.112,304.692
			c-0.008,8.508-6.928,15.404-15.448,15.404c-8.5-0.008-15.42-6.916-15.416-15.432L231.528,135
			c0.004-8.484,3.975-15.387,15.488-15.414c4.093,0.021,7.895,1.613,10.78,4.522c2.912,2.916,4.476,6.788,4.472,10.912
			L262.112,304.692z'
              />
            </g>
          </g>
        </svg>
      </h5>
      {markers && markers.length && <Map center={mapCenter} zoom={13} locations={markers} />}
    </div>
  )
}

export default Dashboard
