# 简易电子相册实现

![预览图](https://s1.ax1x.com/2020/06/03/tUYmef.png)

## 布局实现逻辑

使用全屏录播图加缩略图列表实现电子相册，为了实现全屏轮播图，因此设定所在container的宽高为100vw和100vh（相对浏览器的宽高），设定了container为绝对布局，整体布局可以分为三个区域（全屏轮播图，控制按钮，缩略图列表）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.bootcss.com/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <title>电子相册</title>
</head>

<body>
    <div class="container">
        <!-- 全屏轮播图 -->
        <div class="slider">
            <div class="slide currentSlide">
            </div>
            <div class="slide">
            </div>
            <div class="slide">
            </div>
            <div class="slide">
            </div>
            <div class="slide">
            </div>
            <div class="slide">
            </div>
        </div>
        <!-- 控制按钮 -->
        <div class="buttons">
            <button id="prev"><i class="fas fa-arrow-left"></i></button>
            <button id="next"><i class="fas fa-arrow-right"></i></button>
        </div>
        <!-- 缩略图 -->
        <div class="miniPic">
            <ul>
              <li data-index="0" class="picture currentPicture"></li>
              <li data-index="1" class="picture"></li>
              <li data-index="2" class="picture"></li>
              <li data-index="3" class="picture"></li>
              <li data-index="4" class="picture"></li>
              <li data-index="5" class="picture"></li>
            </ul>
        </div>
        <script src="main.js"></script>
</body>

</html>
```

## 样式实现逻辑

### 轮播图及缩略图列表实现

全屏轮播图的过渡使用了透明度淡入淡出的动画

```css
slide {
  /* 设置全屏轮播图 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  /* 设置透明度变换为淡入淡出 */
  transition: opacity 0.4s ease-in-out;
}

.slide.currentSlide {
  /* 当前选中的透明度为百分之百 */
  opacity: 1;
}

.miniPic {
  position: absolute;
  bottom: 5vh;
  width: 100vw;
  height: 20vh;
  background-color: rgba(51, 51, 51, 0.4);
}

/* 设置缩略图预览 */

.miniPic ul {
  display: flex;
  bottom:2.5vh;
}

.miniPic ul li {
  height: 15vh;
  flex: 1;
  margin: 25px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.picture.currentPicture {
  /* 当前选中的透明度为百分之五十 */
  opacity: 0.5;
}

```

实现原理为当前展示的轮播图添加激活class（currentSlide）改变样式

缩略图列表对应图片展示时添加激活class（currentPicture）改变样式

缩略图列表中图片使用flex布局以自适应浏览器宽高

### 基本样式初始化

```css
/* 清除默认属性 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #333;
  color: #fff;
  line-height: 1.6;
}


ul,
li {
  list-style: none;
}


/* 设置容器轮播图初始化 */

.slider {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.container {
  width: 100vw;
  height: 100vh;
}
```

### 轮播图图片设置

使用css的background属性将图片展示逻辑与页面布局分离

```css
/* 设置轮播图背景 */

.slide:nth-child(1){
  background: url("img/slide1.jpeg") no-repeat center center/cover;
}

.slide:nth-child(2) {
  background: url("img/slide2.jpg") no-repeat center center/cover;
}

.slide:nth-child(3) {
  background: url("img/slide3.jpg") no-repeat center center/cover;
}

.slide:nth-child(4) {
  background: url("img/slide4.jpg") no-repeat center center/cover;
}

.slide:nth-child(5) {
  background: url("img/slide5.jpg") no-repeat center center/cover;
}

.slide:nth-child(6) {
  background: url("img/slide6.jpg") no-repeat center center/cover;
}

/* 设置缩略图背景 */
.picture:nth-child(1){
  background: url("img/slide1.jpeg")no-repeat center center/cover;
}

.picture:nth-child(2) {
  background: url("img/slide2.jpg") no-repeat center center/cover;
}

.picture:nth-child(3) {
  background: url("img/slide3.jpg") no-repeat center center/cover;
}

.picture:nth-child(4) {
  background: url("img/slide4.jpg") no-repeat center center/cover;
}

.picture:nth-child(5) {
  background: url("img/slide5.jpg") no-repeat center center/cover;
}

.picture:nth-child(6) {
  background: url("img/slide6.jpg") no-repeat center center/cover;
}

.picture.currentPicture {
  /* 当前选中的透明度为百分之五十 */
  opacity: 0.5;
}
```

### 按钮样式

```css
/* 设置按钮样式 */

.buttons button#prev {
  position: absolute;
  top: 40%;
  left: 15px;
}

.buttons button#next {
  position: absolute;
  top: 40%;
  right: 15px;
}

.buttons button {
  border: 2px solid #fff;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  padding: 13px 15px;
  border-radius: 50%;
  outline: none;
}

.buttons button:hover {
  background-color: #fff;
  color: #333;
}

```

## 切换逻辑及实现

### 基础变量初始化

```js
const slides = document.querySelectorAll(".slide");
const pictures = document.querySelectorAll(".picture");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true; //自动翻页
const intervalTime = 5000; //设置跳转间隔时间
var index = 0;

let slideInterval;
```

### 跳转下一个的实现

```js
const nextSlide = function () {
  //获取当前class
  const currentSlide = document.querySelector(".currentSlide");
  const currentPicture = document.querySelector(".currentPicture");
  if (currentSlide.nextElementSibling) {
    //添加激活class到下一个
    currentSlide.nextElementSibling.classList.add("currentSlide");
  } else {
    //添加激活class到第一个
    slides[0].classList.add("currentSlide");
  }

  if (currentPicture.nextElementSibling) {
    //添加激活class到下一个
    currentPicture.nextElementSibling.classList.add("currentPicture");
  } else {
    //添加激活class到第一个
    pictures[0].classList.add("currentPicture");
  }
  //清除当前激活class
  setTimeout(() => currentSlide.classList.remove("currentSlide"));
  setTimeout(() => currentPicture.classList.remove("currentPicture"));
};
```

当前激活的元素后存在下一个元素，则为下一个元素添加激活class，否则为第一个添加激活class，操作结束后清除当前激活class

### 跳转上一个的实现

```js
const prevSlide = function () {
  //获取当前class
  const currentSlide = document.querySelector(".currentSlide");
  const currentPicture = document.querySelector(".currentPicture");
  if (currentSlide.previousElementSibling) {
    //添加激活class到上一个
    currentSlide.previousElementSibling.classList.add("currentSlide");
  } else {
    //添加激活class到最后一个
    slides[slides.length - 1].classList.add("currentSlide");
  }
  if (currentPicture.previousElementSibling) {
    //添加激活class到上一个
    currentPicture.previousElementSibling.classList.add("currentPicture");
  } else {
    //添加激活class到最后一个
    pictures[pictures.length - 1].classList.add("currentPicture");
  }
  //清除当前激活class
  setTimeout(() => currentSlide.classList.remove("currentSlide"));
  setTimeout(() => currentPicture.classList.remove("currentPicture"));
};
```

当前激活的元素后存在上一个元素，则为上一个元素添加激活class，否则为最后一个添加激活class，操作结束后清除当前激活class

### 自动轮播实现

```js
const autoSlide = function () {
  if (auto) {
    // 清除当前定时器
    clearInterval(slideInterval);
    // 切换到下一图
    slideInterval = setInterval(nextSlide, intervalTime);
  }
};
```

计时器归零后跳转到下一个

### 跳转到指定图片

```js
const goIndex = function () {
  //获取当前class
  const currentSlide = document.querySelector(".currentSlide");
  const currentPicture = document.querySelector(".currentPicture");
  // 清除当前定时器
  clearInterval(slideInterval);
  // 如果没有激活class点击后激活
  if (
    slides[index].className !== "slide currentSlide" &&
    pictures[index].className !== "picture currentPicture"
  ) {
    slides[index].className = "slide currentSlide";
    pictures[index].className = "picture currentPicture";
    //清除当前激活class
    setTimeout(() => currentSlide.classList.remove("currentSlide"));
    setTimeout(() => currentPicture.classList.remove("currentPicture"));
  }
};
```

获取页面上的index值跳转到指定图片，如果选中图未处于激活状态则添加激活class，操作结束后清除当前激活class

### 页面监听

监听控制按钮

```js
//按钮监听事件
next.addEventListener("click", function () {
  nextSlide();
  autoSlide();
});

prev.addEventListener("click", function () {
  prevSlide();
  autoSlide();
});
```

监听缩略图点击

```js
// 遍历监听缩略图点击事件获取HTML中索引
const listenTo = function () {
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener("click", function () {
      var pictureIndex = this.getAttribute("data-index");
      index = pictureIndex;
      // 跳转到指定图片
      goIndex();
      autoSlide();
    });
  }
};
```

页面加载是调用函数

```js
// 设置页面加载时自动跳转
window.onload = function () {
  autoSlide();
  listenTo();
};
```

