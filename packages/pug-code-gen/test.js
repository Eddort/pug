const template = `
block(
        id='id-1-2-3'
        class='block-class'
    )
    image(
        src='/href'
    )
block(
        id='id-1-2-4'
    )
    gallery(
        images=''
    )
    - var images = ['/src1', '/src2', '/src3']
    each src in images
        image(
            src=src
        )
`;
var lex = require('pug-lexer');
var parse = require('pug-parser');
var wrap = require('pug-runtime/wrap');
var generateCode = require('./index');

var funcStr = generateCode(parse(lex(template)), {
  compileDebug: false,
  pretty: true,
  inlineRuntimeFunctions: true,
  templateName: 'helloWorld',
  kitTagModels: {
    block: {
      render(params) {
        console.log(params)
        return `block, method ${params}`
      }
    },
    gallery: {
      render(params) {
        return `gallery, method ${params}`
      }
    },
    image: {
      render(params) {
        return `image, method ${params}`
      }
    }
  }
});
//=> 'function helloWorld(locals) { ... }'

var func = wrap(funcStr, 'helloWorld');
console.log(func())
