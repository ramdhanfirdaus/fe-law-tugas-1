/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import {PageTitle} from '../metronic/layout/core'
import QuestionService from "../service/question/QuestionService";
import { SaveQuestionWidget } from "../metronic/partials/widgets";

const SaveQuestionPage: FC = () => {
  const [listQuestion, setListQuestion] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const callApi = async () => {
      setListQuestion((await QuestionService.getSaveQuestion()).data);
      setLoading(false)
    }

    callApi()
  }, [])

  return (
    <>
      {/* begin::Row */}
      <span className='indicator-label'>

        {!loading && <>
          <div className='row g-5 g-xl-10 mb-3 mb-xl-6 mt-0'>
            {listQuestion.map(function(question, i){
              return <div key={i} className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
                <SaveQuestionWidget
                  id= {question.id}
                  title= {question.title}
                  link= {question.link}
                  tags= {question.tags}
                  color='#F1416C'
                />
              </div>
            })}
          </div>
          {listQuestion.length === 0 &&
            <span className='indicator-label'>No Save Question</span>
          }
        </>}
        {loading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            Loading...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </span>
      {/* end::Row */}
    </>
  )
}

const SaveQuestionWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Save Question</PageTitle>
      <SaveQuestionPage />
    </>
  )
}

export {SaveQuestionWrapper}
