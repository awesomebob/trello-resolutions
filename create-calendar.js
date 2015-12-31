var fs = require('fs');
var YAML = require('yamljs');
var Trello = require('node-trello');
var calendar = YAML.load('./data.yml');
var secrets = YAML.load('./secrets.yml');
var t = new Trello(secrets.key, secrets.token);

var month = process.argv[2];

if (!month){
  console.log('Please select a month');
} else {
  t.get('/1/boards/' + secrets.boardId + '/lists', function(err, data){
    if (err) console.log(err);
    if (!data) return;
    var list = data[0];
    var args = {
      idList: list.id,
      name: month
    };

    setTimeout(
    t.post('/1/cards/', args, function(err, data){
      if (err) console.log(err);
      if (!data) return;
      var card = data;
      var args = {
        idCard: card.id
      };

      setTimeout(
      t.post('/1/checklists/', args, function(err, data){
        if (err) console.log(err);
        if (!data) return;
        var checklist = data;
        for (var day in calendar[month]){
          var goal = calendar[month][day];
          var args = {
            name: goal
          };

          setTimeout(
          t.post('/1/checklists/' + checklist.id + '/checkItems', args, function(err, data){
            if (err) console.log(err);
            if (!data) return;
            var item = data;
            console.log(item.name);
          }), 100);
        }
      }), 100);
    }), 100);
  });
}
