import Parser from "./Parser";

function JS_SDK(context: string) {
    console.log('JSSDK', context);
}

JS_SDK('hello');
const parser = new Parser();

console.log(parser);

export default JS_SDK;
