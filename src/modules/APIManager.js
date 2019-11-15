const remoteURL = "http://localhost:3000"

export default Object.create(null, {
  get: {
    value: function(name) {
      return fetch(`${remoteURL}/${name}`)
        .then(e => e.json())
    }
  },
  getAll: {
    value: function (name) {
      return fetch(`${remoteURL}/${name}`)
        .then(e => e.json())
    }
  },
  post: {
    value: function (name, newPost) {
        return fetch(`${remoteURL}/${name}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newPost)
        })
    }
  },
  put: {
    value (name, id, updatedPost) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost)
      })
    }
  },
  delete: {
    value (name, id) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        method: "DELETE",
      })
    }
  }
})