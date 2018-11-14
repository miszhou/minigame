## fly bird

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── Resources.js                       // 静态图片资源路径
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── runtime
│   ├── BackGround.js                      // 背景类
│   ├── Birds.js                           // 小鸟类
│   ├── DownPencil.js                      // 下方铅笔类
│   ├── Land.js                            // 陆地类
│   ├── Music.js                           // 音乐类
│   ├── Pencil.js                          // 铅笔基类
│   ├── ResourcesLoader.js                 // 资源加载器
│   ├── Restart.js                         // 开始按钮类
│   └── UpPencil.js                        // 上方铅笔类
├── DataBus.js                             // 全局数据管理器 单例模式
├── Director.js                            // 全局逻辑控制器 单例模式
└── Main.js                                // 游戏入口主函数

./opendata                                 // 开放数据域文件夹
├── index.js                               // 开放域入口
```