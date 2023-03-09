import QuestionService from "../../../../../service/question/QuestionService";
import { useState } from "react";

type Props = {
  id: string
  title: string
  link: string
  tags: []
  color: string
}

const QuestionWidget = ({id, title, link, tags, color}: Props) => {
  const [loading, setLoading] = useState(false)
  const save = async () => {
    setLoading(true)
    await QuestionService.saveQuestion(id, title, link, tags.toString())
    setLoading(false)
  }

  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end`}
      style={{
        backgroundColor: color,
      }}
    >
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <span className='fs-2x fw-bold text-white me-2 lh-1 ls-n2' style={{textAlign: 'justify', display:'block'}}>{title}</span>
          <span className='text-white opacity-75 pt-1 fw-semibold fs-6'>Tags: {tags.toString().replace(',', ', ')}</span>
        </div>
      </div>
      <div className='card-body d-flex align-items-end pt-0'>
        <div className='d-flex align-items-center flex-column mt-3 w-100'>
          <div className='d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2'>
            <button
              type='button'
              className='btn btn-light-danger btn-sm p-2'
              onClick={save}
            >
              {!loading && <span className='indicator-label'>Save Question</span>}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
              Saving...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
              )}
            </button>
            <a
              href={link}
              target='_blank'
              type='button'
              className='btn btn-light-danger btn-sm p-2'
            >
              Go to Link
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export {QuestionWidget}
