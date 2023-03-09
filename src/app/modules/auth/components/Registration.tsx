/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {PasswordMeterComponent} from '../../../metronic/assets/ts/components'
import AuthService from '../../../service/auth/AuthService'
import FavoriteTagService from "../../../service/favoriteType/FavoriteTagService";

const initialValues = {
  nama: '',
  username: '',
  password: '',
  changepassword: '',
  favtype: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  nama: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Nama is required'),
  username: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (!!(val && val.length > 0)),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  favtype: Yup.string()
    .required('Favorite Type is required'),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        await AuthService.register(
          values.username,
          values.nama,
          values.password
        )
        await AuthService.login(values.username, values.password)
        await FavoriteTagService.postFavoriteTag(values.favtype)
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
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
        {/* end::Title */}
      </div>
      {/* end::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Nama */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Nama Lengkap</label>
        <input
          placeholder='Nama Lengkap'
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

      {/* begin::Form group Username */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Username</label>
        <input
          placeholder='Username'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.username}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group Username */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Type */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Favorite Type Quesion</label>
        <input
          placeholder='Favorite Type Quesion'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('favtype')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.favtype && formik.errors.favtype},
            {
              'is-valid': formik.touched.favtype && !formik.errors.favtype,
            }
          )}
        />
        {formik.touched.favtype && formik.errors.favtype && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.favtype}</span>
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
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
