/* eslint-disable react/jsx-no-target-blank */

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        href='./dashboard'
        className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='Ramdhan Firdaus Amelia'
      >
        <span className='btn-label'>Tugas 1 - LAW</span>
      </a>
    </div>
  )
}

export {SidebarFooter}
