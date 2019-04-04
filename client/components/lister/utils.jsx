import { api } from '../../../backend/setup-functions'

export const navigateToShowPosting = (history, id) => {
  history.push('/showposting/' + id)
}

export const navigateToEditPosting = (history, id) => {
  history.push('/editposting/' + id)
}

export const deletePosting = (id) => {
  api['delete-post'](id)
}

export const transformPostings = (postings, obj) => postings.map(p => Object.assign(p, obj))
