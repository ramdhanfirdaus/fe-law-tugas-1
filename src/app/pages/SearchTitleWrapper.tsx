/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import {PageTitle} from '../metronic/layout/core'
import {
  QuestionWidget,
} from '../metronic/partials/widgets'
import QuestionService from "../service/question/QuestionService";

const SearchTitlePage: FC = () => {
  const [loading, setLoading] = useState(false)
  const [listQuestion, setListQuestion] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const searchByTitle = async () => {
    setLoading(true)
    try {
      const questions = (await QuestionService.getAllQuestionByTitle(title)).data
      if (questions == null) {
        setListQuestion([])
      } else {
        setListQuestion(questions)
      }
      setLoading(false)
      setError('')
    } catch (e:any) {
      setError(e.toString())
      setLoading(false)
    }

  }
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-10 mb-3 mb-xl-6 mt-0'>
        {/* begin::Col */}
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6'>
          <input
            type='text'
            className='form-control'
            name='search'
            placeholder='Search by Title...'
            data-kt-search-element='input'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='col-md-3 col-lg-3 col-xl-3 col-xxl-3'>
          <button
            type='button'
            className='btn btn-light-danger me-3'
            onClick={searchByTitle}
          >
            {!loading && <span className='indicator-label'>Search</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
            )}
          </button>
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}
      {/* begin::Row */}
      {(error === '') && <span className='indicator-label'>
        <div className='row g-5 g-xl-10 mb-3 mb-xl-6 mt-0'>
        {listQuestion.map(function(question, i){
          return <div key={i} className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
            {(question.question_id !== undefined) && (
              <QuestionWidget
                id= {question.question_id}
                title= {question.title}
                link= {question.link}
                tags= {question.tags}
                color='#F1416C'
              />
            )}
          </div>
        })}
      </div>
      </span>}
      {(error !== '') && <span className='indicator-label'>{error}</span>}
      {/* end::Row */}
    </>
  )
}

const SearchTitleWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Search Question by Title</PageTitle>
      <SearchTitlePage />
    </>
  )
}

export {SearchTitleWrapper}
