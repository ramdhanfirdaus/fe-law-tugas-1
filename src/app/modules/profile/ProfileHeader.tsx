/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {toAbsoluteUrl} from '../../metronic/helpers'
import clsx from "clsx";
import { useFormik } from "formik";
import AuthService from "../../service/auth/AuthService";
import * as Yup from "yup";
import FavoriteTagService from "../../service/favoriteType/FavoriteTagService";
import User from "../../service/User";

const initialValues = {
  nama: '',
  favtag: '',
}

const registrationSchema = Yup.object().shape({
  nama: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Nama is required'),
  favtag: Yup.string()
    .required('Favorite Type is required'),
})

const ProfileHeader: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        await AuthService.updateProfile(values.nama)
        await FavoriteTagService.updateFavoriteTag(values.favtag)
        document.location.reload()
      } catch (error) {
        console.error(error)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    const setValue = async () => {
      setLoading(true)
      const user = User();
      formik.values.nama = user.nama
      const tags = (await FavoriteTagService.getFavoriteTag()).data
      console.log(tags)
      let dataTags = '';
      tags.map((tag:any, i:number) => {
        if (i !== 0) {
          dataTags = dataTags + ';'
        }
        dataTags = dataTags + tag.tag
      })
      formik.values.favtag = dataTags
      setLoading(false)
    }

    setValue()
  }, [])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap mb-3'>
          <form
            className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
            noValidate
            id='kt_login_signup_form'
            onSubmit={formik.handleSubmit}
          >
            {/* begin::Heading */}
            <div className='text-center mb-11'>
              {/* begin::Title */}
              <h1 className='text-dark fw-bolder mb-3'>Update Profile</h1>
              {/* end::Title */}
            </div>
            {/* end::Heading */}

            {formik.status && (
              <div className='mb-lg-15 alert alert-danger'>
                <div className='alert-text font-weight-bold'>{formik.status}</div>
              </div>
            )}
            <div className='text-center mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={toAbsoluteUrl('/media/avatars/blank.png')} alt='Metornic' />
                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
              </div>
            </div>

            {/* begin::Form group Nama */}
            <div className='fv-row mb-8'>
              <label className='form-label fw-bolder text-dark fs-6'>Nama Lengkap</label>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('nama')}
                className={clsx(
                  'form-control bg-transparent',
                  {
                    'is-invalid': formik.touched.nama && formik.errors.nama,
                  },
                  {
                    'is-valid': formik.touched.nama && !formik.errors.nama,
                  }
                )}
              />
              {formik.touched.nama && formik.errors.nama && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.nama}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group Nama */}

            {/* begin::Form group Type */}
            <div className='fv-row mb-8'>
              <label className='form-label fw-bolder text-dark fs-6'>Favorite Tag Quesion</label>
              <input
                type='text'
                {...formik.getFieldProps('favtag')}
                className={clsx(
                  'form-control bg-transparent',
                  {'is-invalid': formik.touched.favtag && formik.errors.favtag},
                  {
                    'is-valid': formik.touched.favtag && !formik.errors.favtag,
                  }
                )}
              />
              {formik.touched.favtag && formik.errors.favtag && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.favtag}</span>
                  </div>
                </div>
              )}
              {/* begin::Meter */}
              <div
                className='d-flex align-items-center mb-3'
                data-kt-password-meter-control='highlight'
              >
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
              </div>
              {/* end::Meter */}
              <div className='text-muted'>
                Pisahkan setiap type dengan titik koma ";". Example: react js;python
              </div>
            </div>
            {/* end::Form group Type */}

            {/* begin::Form group */}
            <div className='text-center'>
              <button
                type='submit'
                id='kt_sign_up_submit'
                className='btn btn-lg btn-primary w-100 mb-5'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'>Simpan</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                )}
              </button>
            </div>
            {/* end::Form group */}
          </form>
        </div>
      </div>
    </div>
  )
}

export {ProfileHeader}
