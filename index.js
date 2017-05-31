#! /usr/bin/env node
var shell = require('shelljs');
var structureGenerator = require('folder-structure-generator');
var fs = require('fs');
var files = require('./lib/files');
var componentSchema = require('./schema/component.schema');

const OPERATION_INDEX = 2;

const NEW_PROJECT_NAME_INDEX = 3;
const MAX_NEW_ARG = 4;

const GENERATION_TYPE_INDEX = 3;
const GENERATION_TYPE_NAME = 4;

var operations = {
  "new":true,
  "generate": true,
  "g": true
}

if(!operations[process.argv[OPERATION_INDEX]]){
  console.log(`ERROR: "${process.argv[OPERATION_INDEX]}" is not a valid argument`);
  process.exit();
}

function new_project(){
  if(process.argv.length > MAX_NEW_ARG){
    console.log(`ERROR: Only two arguments are allowed. Total arguments passes is ${process.argv.length}`)
    process.exit();
  }else{
    var createReactApp = require('create-react-app');
    createReactApp(process.argv[NEW_PROJECT_NAME_INDEX]);
  }
}

function generation(){
  let new_directory = `./${process.argv[GENERATION_TYPE_NAME]}`;
  if(files.directoryExists(new_directory)){
    console.log(`${process.argv[GENERATION_TYPE_NAME]} component already exist`);
    process.exit();
  }
  let generation_type = process.argv[GENERATION_TYPE_INDEX];
  let types = {
    component: function(){
      let json_component = JSON.parse(componentSchema.generateStructure(process.argv[GENERATION_TYPE_NAME]));
      structureGenerator(json_component);
      let jsFileData = componentSchema.jsFileData(process.argv[GENERATION_TYPE_NAME]);
      fs.appendFile(`./${new_directory}/${process.argv[GENERATION_TYPE_NAME]}.component.js`, jsFileData, function(err){
        if(err) throw err;
        console.log('file saved successfully');
      });
    }
  };
  types[generation_type]();
}

var process_operation = {
  new: new_project,
  g: generation,
  generate: generation
}

process_operation[process.argv[OPERATION_INDEX]]();
