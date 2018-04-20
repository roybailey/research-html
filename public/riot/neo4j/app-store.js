// UserStore definition.
// Flux stores house application logic and state that relate to a specific domain.
function AppStore() {
  riot.observable(this) // Riot provides our event emitter.

  var self = this

  self.state = {
    search: ""
  }

  self.on('search_update', function(text) {
    console.log(`search updated = ${text}`)
    self.state.search = text
    self.trigger('search_changed', self.state.search)
  })

}
