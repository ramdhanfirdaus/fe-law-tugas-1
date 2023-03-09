import {MenuItem} from './MenuItem'
import React from "react";

export function MenuInner() {
  return (
    <>
      <MenuItem title='Search Question by Title' to='/search/by-title' />
      <MenuItem title='Search New Question by Tags' to='/search/by-tags' />
      <MenuItem title='Save Question' to='/save-question' />
    </>
  )
}
