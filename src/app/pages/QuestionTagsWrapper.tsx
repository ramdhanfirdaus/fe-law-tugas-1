/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from "react";
import {PageTitle} from '../metronic/layout/core'
import {
  QuestionWidget,
} from '../metronic/partials/widgets'
import QuestionService from "../service/question/QuestionService";

const QuestionTagsPage: FC = () => {
  const [listAllTagsQuestion, setListAllTagsQuestion] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const callApi = async () => {
      setListAllTagsQuestion((await QuestionService.getAllQuestionByTags()).data)
      setLoading(false)
    }

    callApi()
  }, [])

  return (
    <>
      <span className='indicator-label'>
        {!loading && <span className='indicator-label'>
          {(listAllTagsQuestion[0] !== undefined) && (listAllTagsQuestion[0].data === undefined) && <span className='indicator-label'>No Question</span>}
          {listAllTagsQuestion.map(function(listQuestion, i){
            return <span key={i}>
            {(listQuestion.data !== undefined) && (
              <>
                <h2 className='pt-5 mt-5 text-center'>Tags: {listQuestion.tag}</h2>
                <div className='row g-5 g-xl-10 mb-3 mb-xl-6 mt-0'>
                  {listQuestion.data.map(function(question:any, j:number){
                    return <div key={j} className='col-md-6 col-lg-6 col-xl-6 col-xxl-3'>
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
                <hr/>
              </>
            )}
          </span>
          })}
        </span>}
        {loading && (
          <span className='indicator-progress' style={{display: 'block'}}>
            Loading...{' '}
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </span>
    </>
  )
}

const QuestionTagsWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>New Question by Favorite Tags</PageTitle>
      <QuestionTagsPage />
    </>
  )
}

export {QuestionTagsWrapper}
