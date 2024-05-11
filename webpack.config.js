const path = require('path');
module.exports={
    mode:'development',
    watch:true,
    target:'node',
    stats:'errors-only',
    // devtool:'source-map',
    // entry:{
    //   main: "./src/index.js", //属性名: chunk的名称，属性值：入口模块的路径
    // },
    // output:{
    // //     //配置时，最好使用node环境中自带的path模块，防止不同操作系统的路径问题 /与\问题
    //     path: path.resolve(__dirname,"dist"), //必须是绝对路径，表示输出文件的目录，默认是dist，使用__dirname表示配置文件所在的目录
    // //     //通常输出两个文件，一个是合并模块后的js代码文件，一个是source map文件。只能配置合并模块后的js代码文件
    // //     // filename:'scripts/abc/bundle.js' //配置的合并的js文件的规则
    //     filename:'[name].js', //占位符，表示使用entry的属性名
        
    // }
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
}