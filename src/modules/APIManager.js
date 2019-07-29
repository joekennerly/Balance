const remoteURL = "http://localhost:5002"

export default Object.create(null, {
  get: {
    value: function(name) {
      return fetch(`${remoteURL}/${name}`)
        .then(e => e.json())
        .then(converted => converted.reverse())
    }
  },
  getById: {
    value: function(name, id) {
      return fetch(`${remoteURL}/${name}/${id}`)
        .then(e => e.json())
        .then(converted => converted.reverse())
    }
  },
  getAll: {
    value: function (name) {
      return fetch(`${remoteURL}/${name}`)
        .then(e => e.json())
        .then(converted => converted.reverse())
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
        }).then(data => data.json())
    }
  },
  put: {
    value (name, updatedPost) {
      return fetch(`${remoteURL}/${name}/${updatedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost)
      }).then(data => data.json());
    }
  },
  delete: {
    value (name, id) {
      return fetch(`${remoteURL}/${name}/${id}`, {
        method: "DELETE",
      }).then(data => data.json());
    }
  },
  getLike: {
    value (name, word) {
      return fetch(`${remoteURL}/${name}?username_like=${word}`).then(data => data.json());
    }
  }
})