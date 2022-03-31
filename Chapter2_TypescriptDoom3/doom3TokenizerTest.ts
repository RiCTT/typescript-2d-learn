import { IDoom3Token, IDoom3Tokenizer, Doom3Factory, ETokenType } from './src/doom3Tokenizer'

let tokenizer: IDoom3Tokenizer = Doom3Factory.createDoom3Tokenizer()
let str: string = `
  numMeshes 5
  /**
   * joints 关键字定义了骨骼动画的bindPose
   */
  
  joints {
    "origin" -1 (0 0 0)  (-0.5 -0.5 -0.5)
    "Body"    0 (-12.1038131714 0 79.004776001) (-0.5 -0.5 -0.5)
    //origin
  }
`

// tokenizer.setSource(str)
// while (tokenizer.moveNext()) {
//   if (tokenizer.current.type === ETokenType.NUMBER) {
//     console.log("NUMBER = " + tokenizer.current.getFloat()); //输出该数字的浮点值
//   } else if (tokenizer.current.isString("joints")) {
//     //如果当前token是字符串类型，并且其值为joints，则输出
//     console.log("开始解析joints数据");
//   }
//   else { //否则获取当前token的字符串值
//     console.log("STRING = " + tokenizer.current.getString());
//   }
// }

let input: string = "[3.14, -3.14, .14, -.14, 3., -3., +12]";
tokenizer.setSource(input);
while (tokenizer.moveNext()) {
  if (tokenizer.current.type === ETokenType.NUMBER) {
    console.log("NUMBER : " + tokenizer.current.getFloat());
  }
  else {
    console.log("STRING : " + tokenizer.current.getString());
  }
}