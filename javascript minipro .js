//event bubbling: it happens when we create different event liste for nested elements
/*let div = document.querySelector("div");
let ul = document.querySelector("ul");
let lis = document.querySelectorAll("li");
div.addEventListener("click", function () {
  console.log("div was clicked");
});
ul.addEventListener("click", function (event) {
  event.stopImmediatePropagation(); //to stop the desired change or in this it stops the bubling
  console.log("ul was clicked");
});
for (li of lis) {
  li.addEventListener("click", function () {
    event.stopImmediatePropagation();
    console.log("li was clicked");
  });
}*/

//building todo with DOM
/*let inp = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let lis = document.querySelectorAll("li");
btn.addEventListener("click", function () {
  let item = document.createElement("li");
  let delBtn = document.createElement("button");
  item.innerText = inp.value;
  delBtn.innerText = "delete";
  delBtn.classList.add("delete");
  item.appendChild(delBtn);
  ul.appendChild(item);
  inp.value = "";
});
let delBtns = document.querySelectorAll(".delete");
for (del of delBtns) {
  del.addEventListener("click", function () {
    let par = this.parentElement;
    console.log(par);
    par.remove(); //this delete only works for existing elements not for new elements.....for deleting see next part
  });
}*/

//event delegation: in this instead of child we add event listener to the parent elemetn beacuse due to event bubbling for every child it affects its parent
/*let inp = document.querySelector("input");
let btn = document.querySelector("button");
let lis = document.querySelectorAll("li");
btn.addEventListener("click", function () {
  let item = document.createElement("li");
  let delBtn = document.createElement("button");
  item.innerText = inp.value;
  delBtn.innerText = "delete";
  delBtn.classList.add("delete");
  item.appendChild(delBtn);
  ul.appendChild(item);
  inp.value = "";
});
let ul = document.querySelector("ul");
ul.addEventListener("click", function (event) {
  console.log(event.target.nodeName); //tells who clicked that button
  if (event.target.nodeName == "BUTTON") {
    let listItem = event.target.parentElement;
    listItem.remove();
    //console.log(`${listItem.innerText}`);
    //console.dir(event.target.parentElement);
  }
});*/

//SIMON GAME
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
// starter();
let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];

// function starter() {
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    if (started == true) {
      for (btn of allBtns) {
        btn.addEventListener("click", btnPress);
      }
    }
    levelUp();
  }
});
// }

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  //random button choose
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  //   console.log(randIdx);
  //   console.log(randColor);
  //   console.log(randBtn);
  gameSeq.push(randColor);
  //console.log(gameSeq);
  gameFlash(randBtn);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score Was <b> ${level}</b> <br>Press Any Key To Start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
    finish();
  }
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function finish() {
  if (started == false) {
    for (btn of allBtns) {
      btn.removeEventListener("click", btnPress);
    }
  }
  // } else {
  //   starter();
  // }
}
