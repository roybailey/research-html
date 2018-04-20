// UserStore definition.
// Flux stores house application logic and state that relate to a specific domain.
function Neo4jStore() {
  riot.observable(this) // Riot provides our event emitter.

  var self = this

  self.state = {
    isLoaded: false,
    data: [],
    results: []
  }

  // Create a session to run Cypher statements in.
  // Note: Always make sure to close sessions when you are done using them!
  var driver = neo4j.v1.driver("bolt://localhost:9687");
  // neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "neo4j"));
  var session = driver.session();

  // function to extract fields from Neo4j results
  var extract = function(record, keys) {
    var keyScan = keys || record.keys
    var result = {}
    keyScan.forEach(function(key) {
      result[key] = record.get(key)
    })
    return result
  }

  console.log('Initialising Neo4j Store...');


  self.on('neo4j_init', function() {
    loadDataTags(`
      match (meta:Meta)-[*..2]-(url:URL)
      return meta.value as value, count(url) as total, 'meta' as type, id(meta) as ref
      order by total desc
      `, {})
    loadDataTags(`
      match (ap:AccountProvider)-[*..2]-(url:URL)
      return ap.value as value, count(url) as total, 'provider' as type, id(ap) as ref
      order by total desc
      `, {})
    loadDataTags(`
      match (acc:Account)-[:LINKED]-(url:URL)
      return acc.value as value, count(url) as total, 'account' as type, id(acc) as ref
      order by total desc
      `, {})
  })


  self.on('neo4j_search', function(search) {
    console.log(`searching neo4j with (${search})...`)
    var match = self.state.data.filter(function(it) { 
      return it.type === 'meta' && it.value.toLowerCase().indexOf(search.toLowerCase()) >= 0
    })
    console.log(match)
    match.forEach(element => {
      loadResults(`
      match (meta:Meta)-[:LINKED]-(acc:Account)-[:LINKED]-(ap:AccountProvider), (acc)-[:LINKED]-(url:URL)-[:LINKED]-(dom:DomPath)
      where id(meta) = $id
      return meta.value as meta, acc.value as account, ap.value as provider, url.value as url, dom.value as dom
      `,{ id: element.ref })
    });
  })


  // Run a Cypher statement, reading the result into the data array
  function loadDataTags(cypher, params) {
    session
      .run(cypher, params)
      .subscribe({
        onNext: function (record) {
          //console.log(record);
          self.state.data.push(extract(record))
        },
        onCompleted: function () {
          session.close();
          self.state.isLoaded = true
          // sort the data we just loaded
          var diff = function(a, b) { return b.total - a.total; };
          self.state.data = R.sort(diff, self.state.data);
          // The store emits change events to any listening views, so that they may react and redraw themselves.
          self.trigger('neo4j_changed', self.state)
        },
        onError: function (error) {
          console.log(error);
        }
      });
  }

  // Run a Cypher statement, reading the result into the results array
  function loadResults(cypher, params) {
    session
      .run(cypher, params)
      .subscribe({
        onNext: function (record) {
          self.state.results.push(extract(record))
        },
        onCompleted: function () {
          session.close();
          console.log(`loaded results from ${cypher}`);
          console.log(self.state.results);
          self.state.isLoaded = true
          // The store emits change events to any listening views, so that they may react and redraw themselves.
          self.trigger('neo4j_changed', self.state)
        },
        onError: function (error) {
          console.log(error);
        }
      });
  }
}
