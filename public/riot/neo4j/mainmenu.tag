<mainmenu>

  <div class="ui pointing menu">
    <div each={ menu } class={ getMenuClass(id) }>
      <a href="#{ id }">{ title }</a>
    </div>
    <div class="right menu">
      <div class="item">
        <div class="ui icon input">
          <input ref="search" type="text" placeholder="Search..." onkeyup={ searchUpdate }>
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- this script tag is optional -->
  <script>

    var self = this
    self.menu = [ 
      { id: 'home', title: 'Home' },
      { id: 'about', title: 'About' }
    ]

    var r = route.create()
    r(function highlightCurrent(id) {
      console.log(`new active id = ${id}`)
      self.selectedId = id || 'home'
      self.update()
    });
    
    getMenuClass(id) {
      var className = "item "+ ((self.selectedId === id)? "active" : "")
      console.log(`${id} = ${className}`)
      return className
    }

    searchUpdate(e) {
      if (e.keyCode == 13) {
        self.search = self.refs.search.value
        console.log(`Search updated = ${self.search}`)
        RiotControl.trigger('search_update', self.search)
      }
    }
  </script>

</mainmenu>
