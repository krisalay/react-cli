let core = require('../lib/core');

function generateStructure(component_name){
  return `{
    "structure": [
      {
        "name": "${component_name}",
        "children":[
          { "name": "${component_name}.component.js" },
          { "name": "${component_name}.component.css" },
          { "name": "${component_name}.component.test.js" }
        ]
      }
    ]
  }`;
}

function jsFileData(class_name) {
  return `
    import React, { Component } from 'react';
    import './${class_name.toLowerCase()}.component.css';

    class ${core.capitalizeFirstCharacter(class_name)} extends Component {
      constructor(props) {
        super(props);
      }

      componentDidMount() {

      }

      componentWillUnmount() {

      }

      render(){
        return(
          <div>
            ${class_name} component works!!
          </div>
        );
      }
    }

    export default ${core.capitalizeFirstCharacter(class_name)};
  `;
}

module.exports = {
  generateStructure: generateStructure,
  jsFileData: jsFileData
}
