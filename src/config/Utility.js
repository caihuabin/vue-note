import Action from './Action'

function deObject (obj) {
  for (var key in obj) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}

function getSearchJson () {
  let searchStr = location.hash.split('?')[1]
  let searchJson = {}
  if (searchStr) {
    searchStr.split('&').forEach(function (item) {
      let itemArr = item.split('=')
      searchJson[itemArr[0]] = itemArr[1]
    })
  }
  return searchJson
}

function ajax (data, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open(data.type === 'POST' ? 'POST' : 'GET', data.url, true)
  if (data.type === 'POST') {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
      callback.call(this, xhr.responseText)
    }
  }
  xhr.send(data.params)
}

function requestPromise (data) {
  return new Promise(function (resolve, reject) {
    ajax(data, (response) => {
      resolve(JSON.parse(response))
    })
  })
}

function getAction (language, key) {
  return Action[language][key]
}

function isScrollToBottom () {
  let documentElement = window.document.documentElement
  let body = window.document.body
  let scrollTop = 0
  let clientHeight = 0
  let scrollHeight = Math.max(body.scrollHeight, documentElement.scrollHeight) || 0
  if (documentElement && documentElement.scrollTop) {
    scrollTop = documentElement.scrollTop
  } else if (body) {
    scrollTop = body.scrollTop
  }
  if (body.clientHeight && documentElement.clientHeight) {
    clientHeight = (body.clientHeight < documentElement.clientHeight) ? body.clientHeight : documentElement.clientHeight
  } else {
    clientHeight = (body.clientHeight > documentElement.clientHeight) ? body.clientHeight : documentElement.clientHeight
  }
  return scrollTop + clientHeight >= scrollHeight
}

let filters = {
  categoryFilter: function (data, category) {
    if (!category) {
      return data
    }
    return data.filter(function (item) {
      return item.categoryList.indexOf(category) > -1
    })
  },
  searchFilter: function (data, searchText) {
    if (!searchText) {
      return data
    }
    return data.filter(function (item) {
      return item.title.indexOf(searchText) > -1
    })
  },
  orderFilter: function (data, orderBy) {
    if (!orderBy) {
      return data
    }
    return data.sort(function (a, b) {
      return a[orderBy] - b[orderBy]
    })
  },
  paginationFilter: function (data, start, limit) {
    return data.slice(start, start + limit)
  }
}

export default {
  deObject,
  getSearchJson,
  ajax,
  requestPromise,
  getAction,
  isScrollToBottom,
  filters
}
