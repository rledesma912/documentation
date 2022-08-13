const express = require('express');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mermaidParse = require('mermaid-parse');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

//El swagger-ui-express usa internamente redirección 301
app.get('/swagger/:name', async function(req, res, next) {
   
  var SwgrOpt = {
    explorer: true
  };

  var pathOAS = path.join(__dirname,'openapi-definitions', req.params.name + '.yml');
  var swaggerDocument = YAML.load(pathOAS);
  console.log("swagger: " + pathOAS);

  app.use('/swagger/:name', swaggerUi.serve, swaggerUi.setup(swaggerDocument, SwgrOpt));
  next();
});

app.get('/seqdiagram/:name', async function(req, res) {
  
  var pathMD = path.join(__dirname,'sequences-nx-integration', req.params.name + '.md');
  var file = fs.readFileSync(pathMD, 'utf8');
  console.log("markdown: " + pathMD);

  mermaidParse(file.toString(), { extension: 'svg' }).then(htmlRes => {
      res.send(htmlRes);
  });
});


app.listen(5000, function() {
    console.log('Doc site running on port 5000');
  })
