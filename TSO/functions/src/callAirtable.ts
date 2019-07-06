const Airtable = require('airtable');

var base = new Airtable({apiKey: 'keypaApcLOjHCGgZD'}).base('app1SYNrXjvOclF2i');
    base('Schedule').create({
      "Event name": "TestEvent2",
      "Date & Time　（JST)": "2019-01-24T19:00:00.000Z",
      "ref url":"https://google.com",
      "Report url ( Confluence)": "https://new-tech.atlassian.net/wiki/spaces/ER/pages/834961421/Test?atlOrigin=eyJpIjoiOTIyMTZjYTY4YzI2NDA2YmExMDY4MDY0N2QzMzBlOTUiLCJwIjoiYyJ9\n",

    }, function(err:Error, record:any) {
      if (err) {
        console.error(err);
        return;
      }
    });