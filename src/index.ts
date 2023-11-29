/**
 * 基础类型
 *  声明变量后声明变量类型
 *  boolean number string
 *  数组: Array<number> 或者 number[]声明的是数字类型的数组
 *  元组: 允许表示一个已知元素数量和类型的数组 例如: let x:[string,number]
 *       表示定义了一对值分别为 string 和 number 类型的元组
 *  枚举: 是标准的补充,使用枚举类型可以为一组数值赋予友好的名字
 *       enum Color{Red,Green,Blue}
 *       let c:Color=Color.Green
 *  Any: 在编程阶段还不清楚类型的变量指定一个类型,不希望类型检查器对这些值进行检查而是直接让他们
 *       通过编译阶段的检查,可以用 any 来标记这些变量
 *       let notSure:any=1
 *       let list:any[]=[1,true,'false']
 *  Void: 某种程度上来说, void 类型和 any 类型相反,它表示没有任何类型.当一个函数没有返回值时,
 *        你通常会见到其返回值类型是 void
 *        声明一个 void 类型的变量没有什么大的用,因为你只能为它赋予 undefined 和 null
 *  Null和 Undefined:
 *  Never: never 类型表示的是那些永不存在的值得类型.例如, never 类型是那些总会抛出异常或者根本就不会有
 *         返回值的函数表达式或者箭头函数表达式的返回值类型.变量也可以是 never 类型,当他们被永不为真
 *         的类型保护约束时.
 *  let isDone:boolean=true
 *
 */

let isDone: boolean = false;
console.log(isDone);

enum Color {
  Red,
  Green,
  Blue
}


let c: Color = Color.Green;
console.log(c);
