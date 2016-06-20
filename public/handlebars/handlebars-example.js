import handlebars from 'handlebars'
import fs from 'fs'
import mainmenu from './lib/main'

var data = {
  title: 'practical node.js',
  author: '@azat_co',
  tags: ['express', 'node', 'javascript']
}

data.body = process.argv[2];

fs.readFile('handlebars-example.html', 'utf-8', function(error, source){
  handlebars.registerHelper('custom_title', function(title){
    var words = title.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 4) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }
    title = words.join(' ');
    return title;
  })

  data.mainmenu = mainmenu;
  console.log(JSON.stringify(data,null,2));

  var template = handlebars.compile(source);
  var html = template(data);
  console.log(html)
});
