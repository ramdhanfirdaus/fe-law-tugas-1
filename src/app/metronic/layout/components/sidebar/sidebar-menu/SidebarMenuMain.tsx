/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {

  return (
    <>
      <SidebarMenuItem
        to='/search/by-title'
        icon='/media/icons/duotune/general/gen004.svg'
        title='Search Question by Title'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/search/by-tags'
        icon='/media/icons/duotune/general/gen008.svg'
        title='Search New Question by Tags'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/save-question'
        icon='/media/icons/duotune/general/gen003.svg'
        title='Save Question'
        fontIcon='bi-layers'
      />
    </>
  )
}

export {SidebarMenuMain}
