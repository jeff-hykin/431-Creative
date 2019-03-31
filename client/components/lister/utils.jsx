export const navigateToShowPosting = (history, id) => {
  history.push('/showposting/' + id)
}

export const navigateToEditPosting = (history, id) => {
  history.push('/editposting/' + id)
}

export const transformPostings = (postings, obj) => postings.map(p => Object.assign(p, obj))
