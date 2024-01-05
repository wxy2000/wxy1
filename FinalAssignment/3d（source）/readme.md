# Web 3D 开发文档

## 一，Web 3D

用于在 Web 页面中创建声明性 3D 场景，它基于标准的浏览器技术，不需要特别的插件接口（例如 X3D 特定的 SAI ）。使用结构化的文本表示形式来创建和显示交互式 3D 场景，使 3D 内容就像文本、链接、图像或电影一样，成为网页内容的一部分。

这里的目标是在 HTML DOM 中实现一个实时的 3D 场景，并可以操纵 3D 内容。它还支持 3D 对象上的大多数 HTML 事件（例如“ onclick”），能够通过按住鼠标左键并四处移动鼠标从各个方面查看。类似的方式还有，按住鼠标右键或通过鼠标滚轮来放大和缩小。

## 二，引用的框架

Web 3D 使用了 X3DOM 基于 MIT （在软件和软件的所有副本中都必须包含版权声明和许可声明） 和 GPL（任何包含版权所有者声明的程序和其他作品） 双重许可的免费开源 JavaScript 框架。

使用X3DOM的原因：无需插件即可显示 X3DOM 场景，仅基于标准的浏览器技术，例如 HTML5 和 WebGL 。
基于 ISO 标准 X3D 的新 HTML 概要文件，X3DOM 的大部分符合标准。这不仅极大地方便了学习X3DOM，而且还方便了X3DOM内容的交换。

## 三，开发环境

1.  常见的 Web 服务器，如 Apache 和 IIS 等。

2.  数据库支持（复杂的实物 3D 场景需要数据库支持），如 MySQL 和 SQL Server 等。

3.  将 X3DOM 框架存放在 x3dom 文件夹下。

## 四，基础开发

1.  创建开发环境，本例使用 Microsoft IIS （已集成在 Windows 的任何最新版本中）作为 Web 服务器。

2.  创建默认文档，index.html：

    ```
    <!DOCTYPE html>
    <html lang="zh-cmn-Hans">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <!-- 引入 X3DOM 框架 CSS 文件 -->
        <link rel="stylesheet" type="text/css" href="x3dom/x3dom.css">
        <title>Web 3D</title>
    </head>
    <body>
        <h1>Hello, Web 3D !</h1>
        <p>
            This is my first html page with some 3d objects.
        </p>

        <!-- 引入 X3DOM 框架 JS 文件 -->
        <script type="text/JavaScript" src="x3dom/x3dom.js"></script>
    </body>

    </html>
    ```

3.  添加一个 3D 内容。首先，我们需要一个 X3DOM 元素，该元素描述了将在其中显示场景的 X3DOM 上下文。
    在 <body> 标签内，添加以下代码：

    ```
    <x3d width='800px' height='400px'>
        <scene>
            <shape>
                <box></box>
            </shape>
        </scene>
    </x3d>
    ```

4.  更改材质颜色。
    现在有了一个充满白色的新区域，它是 X3DOM 的 3D 上下文。它的宽度和高度与 x3d 标签中定义的相应属性相匹配。
    但是，添加的框不可见（或很难看到浅灰色边框）。这是由于没有向盒子分配任何材料，使用了默认的白色材料，由于页面的背景也是白色，因此该框不可见。
    要更改材质颜色，需要在 shape 节点中添加一个 appearance 子节点。然后在这个子节点中再定义一个 material 节点。
    它的 diffuseColor 属性，可定义简单的材料，并使用单一颜色表示形状的整个表面。

    ```
    <shape>
        <appearance>
            <material diffuseColor='1 0 0'></material>
        </appearance>
        <box></box>
    </shape>
    ```

5.  打开或刷新 index.html 文件，查看效果。
    通过按住鼠标左键并四处移动鼠标从各个方面查看。
    按住鼠标右键或者通过鼠标滚轮来放大和缩小。

6.  向场景中添加另外两个对象，一个蓝色球体和一个绿色圆锥体。
    除了sphere 和 cone 节点外，还需要将球体和圆锥体移到场景中相应的位置。
    和其他一些与图形相关的标准（例如 OpenGL ）中使用的坐标系一样，X3DOM 使用 transform 节点的 translation 属性来定义坐标。

    ```
    <shape>
        <appearance>
            <material diffuseColor='1 0 0'></material>
        </appearance>
        <box></box>
    </shape>

    <transform translation='-3 0 0'>
        <shape>
            <appearance>
                <material diffuseColor='0 1 0'></material>
            </appearance>
            <cone></cone>
        </shape>
    </transform>

    <transform translation='3 0 0'>
        <shape>
            <appearance>
                <material diffuseColor='0 0 1'></material>
            </appearance>
            <sphere></sphere>
        </shape>
    </transform>
    ```

## 五，动画

创建一个 timesensor ，它将开始并循环播放动画。属性 cycleInterval 以秒为单位指定动画的持续时间。循环属性的值设置为 true 。PositionInterpolator 用来定义关键帧。key 属性定义 keyFrames 的时间，而 keyValue 定义帧在坐标（x，y，z）中的位置。

在例中，需要两条路线。第一条路线将 positionInterpolator 绑定到 timeSensor，第二条路线将球体绑定到 positionInterpolator。

```
<timesensor id="wAnimate" DEF="time" cycleInterval="2" loop="true">
</timesensor>
<positioninterpolator DEF="move" key="0 0.3 1" keyValue="0 -3 0  0 3 0  0 -3 0">
</positioninterpolator>
<route fromNode="time" fromField="fraction_changed" toNode="move" toField="set_fraction">
</route>
<route fromNode="move" fromField="value_changed" toNode="ball" toField="translation">
</route>
```

## 六，中级进阶

1.  开发 DOM 操作引擎库，本例取名为：wqMV.js，存放在 wqMV 文件夹下。
    其功能类似于 jQuery API ，主要是 HTML 文档的 DOM 遍历和操作，以及事件处理。
    使用 ImageTexture 标签来渲染，例如，利用松鼠来渲染正方体。

    ```
    <shape>
        <appearance>
            <ImageTexture url="img/squirrel.jpg"> </ImageTexture>
        </appearance>
        <box></box>
    </shape>
    ```

    （1）q 模块：quick ，基于 DOM 操作及事件处理。

    ```
    q('idname') 获取 id 为 idname 的网页元素节点；
    q('idname').h 获取或者设置 id 为 idname 网页元素的 innerHTML ；
    q('.class') 获取 className 为 class 的所有节点；
    q('@LI') 获取元素标签为 li 的所有节点；
    ```
    （2）m 模块：Model ，基于文档的排版及校验、日期等操作。

    ```
    m.ut() 获取当前日期；
    ```

2.  创建页面的层叠样式表（ CSS ）文件，本例取名为：wqMV.css，存放在 wqMV 文件夹下。
其功能是配合 wqMV 引擎，对网页中元素位置的排版进行精确控制，对网页对象和模型样式提供编辑。

3.  创建页面主控程序文件，本例取名为：index.js，存放在 js 文件夹下。

4.  修改 index.html 内容如下：

    ```
    <!DOCTYPE html>
    <html lang="zh-cmn-Hans">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <!-- 引入 X3DOM 框架 CSS 文件 -->
        <link rel="stylesheet" type="text/css" href="x3dom/x3dom.css">
        <!-- 引入 wqMV 框架 CSS 文件 -->
        <link rel="stylesheet" type="text/css" href="wqMV/wqMV.css">
        <title>Web 3D</title>
    </head>

    <body>
        <section class="df dc d1 dy p5">
            <div class="df p5 vc Mm">
                <h1>Hello, Web 3D !</h1>
                <p class="p5">This is my first html page with some 3d objects.</p>
            </div>

            <!-- 基础开发 -->
            <div class="df dc m50 Mm">
                <div class="bb p51"><span>基础开发</span></div>
                <div class="d1 p51">
                    <x3d width="100%" height='400px'>
                    <!-- 这里是基础开发模块中的内容 -->
                    </x3d>
                </div>
            </div>
        </section>

        <!-- 引入 X3DOM 框架 JS 文件 -->
        <script type="text/JavaScript" src="x3dom/x3dom.js"></script>
        <!-- 引入 wqMV 框架 JS 文件 -->
        <script type="text/JavaScript" src="wqMV/wqMV.js"></script>
        <!-- 引入 主控 JS 文件 -->
        <script type="text/JavaScript" src="js/index.js" defer></script>
    </body>

    </html>
    ```

## 七，高级渲染

1.  使用图片渲染。
    使用 PNG、JPG 对静态纹理数据进行编码。JPG 的内存配置文件较低，但压缩方式有损，并且不支持alpha通道。PNG压缩是无损的，可以处理Alpha。
    使用 imagetexture 节点进行渲染，例如使用松鼠图片渲染一个正方体。

    ```
    <shape>
        <appearance>
            <imagetexture url="img/squirrel.jpg"></imagetexture>
        </appearance>
        <box></box>
    </shape>
    ```

2.  使用视频渲染。
    解决方案是将视频内容编码为 MP4 和 OGV 电影，并在 movietexture 节点中提供其来源。
    由于目前流行浏览器禁止自动播放视频，所以可能视频无法播放。如果想看到自动播放效果，请使用谷歌浏览器 49 版本。
    例如使用兔子影片渲染正方体。

    ```
    <shape>
        <appearance>
            <movietexture url="img/bunny.ogv"></movietexture>
        </appearance>
        <box size="3,3,3">
    </shape>
    ```

3.  声音。
    可以使用 WAV、MP3 和 OGG 作为声源。在 audioclip 节点中提供其来源。
    由于目前流行浏览器禁止自动播放声音，所以可能听不见声音。如果想听到效果，请使用谷歌浏览器 49 版本。
    例如加载声音片段。

    ```
    <sound>
        <audioclip loop="true" enabled="true" url="img/sound.mp3"></audioclip>
    </sound>
    ```

## 八，实物模拟

1.  x3d 格式。
    X3D 是一种专为万维网而设计的三维图像标记语言。全称可扩展三维（语言），是由 Web3D 联盟设计的，是 VRML 标准的最新的升级版本。
    X3D 基于 XML 格式开发，所以可以直接使用 XML DOM 文档树、XML Schema 校验等技术和相关的 XML 编辑工具。目前 X3D 已经是通过 ISO 认证的国际标准。
    可使用 Maya、Blender、3DsMax 或者 World of Warcraft 等软件来建立 X3D 类型的 3D 模型文件。

2.  网站添加 x3d 格式 MIME 类型。
    修改网站根目录下的 Web.config 文件，添加如下内容：

    ```
    <system.webServer>
        <staticContent>
            <mimeMap fileExtension=".x3d" mimeType="model/x3d+xml" />
        </staticContent>
    </system.webServer>
    ```

3.  加载 x3d 模型文件。
    使用 inline 节点加载外部 x3d 文件。这些文件可能包含简单的对象，较复杂的对象甚至整个场景，而且仍然可以操纵其中的所有部分。

    ```
    <inline url="x3d/deer.x3d" render="true"></inline>
    ```

4.  调整视野。
    一个场景可以包含任意数量的视点，但只能激活一个视点。要激活视点，只需将 set_bind 参数设置为 true，摄像机将在视图之间自动动画。

    ```
    <viewpoint id="wBest" position="-1.94639 1.79771 -2.89271"
        orientation="0.03886 0.99185 0.12133 3.75685" description="camera" set_bind="true">
    </viewpoint>
    ```

5.  光源渲染。
    如果想让场景显得更明亮，可以设置定向灯，点光源和聚光灯。

    白色的定向灯：

    ```
    <directionallight id="wDirectional" direction="0 -1 0" on="true" intensity="2.0"
        shadowintensity="0.0" color="1,1,1" shadowmapsize="1024" znear="-1" zfar="-1"
        shadowcascades="1" shadowsplitfactor="1" shadowsplitoffset="0.1">
    </directionallight>
    ```

    蓝色的射灯：

    ```
    <spotlight id="wSpot" on="true" beamwidth="0.9" color="0 0 1" cutoffangle="0.78"
    location="0 0 12" radius="22" intensity="1" shadowmapsize="1024" znear="-1" zfar="-1"
    direction="0,0,-1" attenuation="1,0,0" shadowcascades="1" shadowsplitfactor="1"
    shadowsplitoffset="0.1"></spotlight>
    ```

## 九，数据库

本例为了演示方便，没有采用数据库读取 3d 模型的方式。当网站有大量的 3d 模型，应该采用将模型文件以二进制方式存入数据库的方式，便于管理和发布。
