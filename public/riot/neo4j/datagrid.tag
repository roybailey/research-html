<datagrid>
  <h3>{ opts.title }</h3>

  <div if={ state.isLoaded }>

    <table class="ui celled padded table">
      <thead>
        <tr>
          <th>P</th>
          <th>A</th>
          <th>M</th>
          <th>U</th>
          <th>D</th>
        </tr>
      </thead>
      <tbody>
        <tr each={ state.results.filter(applyFilter) }>
          <td class="single line">
            <div>{ provider }</div>
          </td>
          <td class="single line">
            <div>{ account }</div>
          </td>
          <td>
            <div each={ tag in meta }>{ tag }</div>
          </td>
          <td class="single line">
            <div>{ url }</div>
          </td>
          <td class="single line">
            <div>{ dom }</div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

  <div if={ !state.isLoaded }>
    <h1>Loading...</h1>
  </div>

  <!-- this script tag is optional -->
  <script>
    var self = this

    self.state = { 
      isLoaded: false, 
      data: [],
      results: []
    }

    applyFilter(row) {
        //console.log(row)
        return true
    }

    self.on('mount', function() {
      // Trigger init event when component is mounted to page.
      // Any store could respond to this.
      RiotControl.trigger('neo4j_init')
    })

    // Register a listener for store change events.
    RiotControl.on('neo4j_changed', function(neo4jState) {
      console.log('neo4j changed, updating datagrid tag')
      self.state = neo4jState
      self.update()
    })

    // Register a listener for store change events.
    RiotControl.on('search_changed', function(search) {
      console.log(`search changed to (${search}), updating datagrid tag`)
      self.state.isLoaded = false
      self.update()
      RiotControl.trigger('neo4j_search', search)
    })

</script>

</datagrid>
