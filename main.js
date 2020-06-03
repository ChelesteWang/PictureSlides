const slides = document.querySelectorAll(".slide");
const pictures = document.querySelectorAll(".picture");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = true; //自动翻页
const intervalTime = 5000; //设置跳转间隔时间
var index = 0;

let slideInterval;

// 跳转下一个
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

// 跳转上一个
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


const autoSlide = function () {
  if (auto) {
    // 清除当前定时器
    clearInterval(slideInterval);
    // 切换到下一图
    slideInterval = setInterval(nextSlide, intervalTime);
  }
};

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

//按钮监听事件
next.addEventListener("click", function () {
  nextSlide();
  autoSlide();
});

prev.addEventListener("click", function () {
  prevSlide();
  autoSlide();
});

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

// 设置页面加载时自动跳转
window.onload = function () {
  autoSlide();
  listenTo();
};
