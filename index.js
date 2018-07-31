var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var main = require('./main/main')
var trigger = require('./trigger/trigger')
var monitoring = require('./monitoring/monitoring')
var elasticsearch = require('elasticsearch');


var client = elasticsearch.Client({
  host: '169.56.88.132:9200'
});


// client.indices.create({
// index: 'test1'
// },function(err,resp,status) {
// if(err) {
// 	console.log("Console already exists.");
// }
// else {
// 	console.log("create",resp.index);
// }
// });
// client.search({
// index: 'basketball'
// },function(err,resp,status) {
// var hits = resp.hits.hits;
//
// if(err) {
// 	console.log("Console already exists.");
// }
// else {
// 	console.log(hits);
// }
// });

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
//
// client.search({
//   q: 'basketball'
// }).then(function (body) {
//   var hits = body.hits.hits;
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log(hits);
//   }
// });
//
//
//
// //url routing
// client.search({
// 	index: 'basketball'
// })

router.post('/test', function(req,res) {

  client.search({
  index: 'called_api-'+req.body.startDate
  },function(err,resp,status) {
  var hits = resp.hits.hits;

  if(err) {
  	console.log("Console already exists.");
  }
  else {
  	console.log(hits);
  }
  })
  console.log(req.body.trigger);
  console.log(req.body.note);
  console.log(index);
});


router.get('/', function(req,res) {
	res.render('main.ejs', {
    title : 'test'
  });
});

// client.search({
//   index: 'error_log-2018.06.18'}, function(err,resp,status){
//     if(err){
//         console.log("Console already exists.");
//     }
//     else {
//       var result = resp.hits.hits.map(function(hit){
//         console.log(hit._source.Controller);
//         const { count } = client.count({
//           index: 'error_log-2018.06.18'}).then(function(count){
//             console.log(count.count);
//           })
//       })
//     }
//   })


// router.post('/api_result_count', function(req,res) {
//    client.count({
//     index: 'called_api-'+req.body.startDate,
//   body: {
//     query: {
//       match: {
//         "api" : "result"
//       }
//     }
//   }},
//     function(err,resp,status){
//       var responsedate = {'scount' : resp.count}
//       console.log(resp.count)
//       return res.json(responsedate);
//     }
//   )
  //
  // client.search({
  // index: 'called_api-'req.body.startDate
  // },function(err,resp,status) {
  // var hits = resp.hits.hits;
  //
  // if(err) {
  //   console.log("Console already exists.");
  // }
  // else {
  //   console.log(hits);
  // }
  // })
// });


//
// function getcount(fg,api){
//   client.count({
//    index: 'called_api-'+fg,
//  body: {
//    query: {
//      match: {
//        "api" : api
//      }
//    }
//  }},
//     function(err,resp,status){
//       var responsedate = {'ccount' : resp.count}
//       console.log("ccount is " + resp.count)
//       return responsedate;
//       // res.render('monitoring.ejs', {'count' : resp.count});
//     }
//   )
// }

function getcount(fg, api){
  return new Promise(function(resolve, reject){
    client.count({
     index: 'called_api-'+fg,
   body: {
     query: {
       match: {
         "api" : api
       }
     }
   }}, function(err, resp, status){
     resolve(resp);
  }
)
})
}



// function getcount(fg,api){
//   client.count({
//    index: 'called_api-'+fg,
//  body: {
//    query: {
//      match: {
//        "api" : api
//      }
//    }
//  }}).then(function(resp){
//    console.log(resp)
//     return resp.count;
//  })
// }


router.post('/api_create_count', function(req,res){
  var api = 'create'
  var fg = req.body.datefg
  console.log(fg)
    getcount(fg,api).then(function(resp){
      console.log(resp)
      res.send(resp)
    })
}
  // var responsedate = {'ccount' : ccount}
  // console.log("ccount is tt " + ccount)
  // return res.json(responsedate);

)

// router.post('/api_delete_count', function(req,res){
//   var fromDate =Date.parse(req.body.fromDate)
//   var dcount = 0;
//   var api = 'delete'
//   for (var sd = new Date(req.body.startDate); sd <= fromDate; sd.setDate(sd.getDate() + 1)){
//     var sd = formatDate(sd);
//     dcount = dcount+parseInt(cnt)
//     console.log("for dcount is " + dcount)
// }
//   var responsedate = {'dcount' : dcount}
//   console.log("dcount is " + dcount)
//   return res.json(responsedate);
//
// })
//
// router.post('/api_result_count', function(req,res){
//   var fromDate =Date.parse(req.body.fromDate)
//   var scount = 0;
//   var api = 'result'
//   for (var sd = new Date(req.body.startDate); sd <= fromDate; sd.setDate(sd.getDate() + 1)){
//     var cnt = formatDate(sd);
//     scount = scount+parseInt(cnt)
// }
//   var responsedate = {'scount' : scount}
//   console.log("scount is " + scount)
//   return res.json(responsedate);
//
// })






//
// router.post('/api_create_count', function(req,res) {
//   var fromDate =Date.parse(req.body.fromDate)
//   for (var sd = new Date(req.body.startDate); sd <= fromDate; sd.setDate(sd.getDate() + 1)) {
//   var FG = formatDate(sd)
//   client.count({
//    index: 'called_api-'+FG,
//  body: {
//    query: {
//      match: {
//        "api" : "create"
//      }
//    }
//  }},
//     function(err,resp,status){
//       var responsedate = {'ccount' : resp.count}
//       console.log("ccount is " + resp.count)
//       //return res.json(responsedate);
//       // res.render('monitoring.ejs', {'count' : resp.count});
//     }
//   )
// }
//
// });

// router.post('/api_delete_count', function(req,res) {
//   //var test = req.body.startDate. - req.body.fromDate
//   //console.log(test+ "날짜테스트")
//   client.count({
//    index: 'called_api-'+req.body.startDate,
//  body: {
//    query: {
//      match: {
//        "api" : "delete"
//      }
//    }
//  }},
//     function(err,resp,status){
//       var responsedate = {'dcount' : resp.count}
//       console.log(resp.count)
//       return res.json(responsedate);
//       // res.render('monitoring.ejs', {'count' : resp.count});
//     }
//   )
//
// });







router.use('/main', main)
router.use('/trigger', trigger)
router.use('/monitoring', monitoring)

module.exports = router;
