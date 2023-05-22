const questionMaxCnt = 6;

//가위바위보 사진 배열화 한 것을 RSP로 선언
const RSP = [
  { src: "img/rock.jpg", value: "0", class: "choice", id: "ques" },
  { src: "img/scissor.jpg", value: "1", class: "choice", id: "ques" },
  { src: "img/paper.jpg", value: "2", class: "choice", id: "ques" },
];

//보기는 몇개 생성할거야
const objCount = 3;
//어디에다가 추가할거냐 난 여기에 추가할거야
let choiceArea = document.getElementById("choiceArea");

for (let i = 0; i < objCount; i++) {
  // HTML에 라벨 추가한다
  let objLabel = document.createElement("label");
  objLabel.setAttribute("for", "choice" + (i + 1));
  objLabel.className = "choiceOne";

  //HTML에 input 추가한다
  let objInput = document.createElement("input");
  objInput.setAttribute("id", "choice" + (i + 1));
  objInput.setAttribute("type", "radio");
  objInput.setAttribute("name", "aaa");

  choiceArea.appendChild(objLabel);
  objLabel.appendChild(objInput);
}

//문제에서 랜덤 사진 출력 함수 만들기
function setQuestion() {
  const objRSP = RSP[Math.floor(Math.random() * RSP.length)];
  //html에 img 요소 추가
  const objIMG = document.createElement("img");
  objIMG.src = objRSP.src;
  objIMG.value = objRSP.value;
  //setAttribute() 메소드는 지정된 요소의 속성 값을 설정합니다.
  objIMG.setAttribute("value", objRSP.value);
  objIMG.setAttribute("id", objRSP.id);

  // img태그가 들어갈 위치 지정
  const pushImg1 = document.getElementById("question");
  //qushImg1의 자식에 createE를 추가한다.
  pushImg1.appendChild(objIMG);

  // 이미지에 밸류 추가된 것 확인
  let quesID = document.getElementById("ques");
  let queationID = quesID.getAttribute("value");
  console.log("문제의 밸류 : " + queationID);

  // 선택박스에 랜덤으로 사진 출력하기
  // 배열 만들기
  const objCountArr = [];
  const objCountArrN = [];
  let objRandom = RSP[Math.floor(Math.random() * RSP.length)];
  objCountArr.push(objRandom);
  console.log("0번째 들어간 인자의 밸류 : " + objCountArr[0].value);
  for (let i = 0; i < RSP.length; i++) {
    //true 인 것들만 새 배열로 들어와야됨
    if (RSP[i].value !== objCountArr[0].value) {
      objCountArrN.push(RSP[i]);
    }
  }
  for (let i = 0; i < objCountArrN.length; i++) {
    objCountArr.push(objCountArrN[i]);
  }
  console.log(objCountArr);

  let objChoiceOne = document.getElementsByClassName("choiceOne");
  for (let i = 0; i < objChoiceOne.length; i++) {
    const objQuesIMG = document.createElement("img");
    const objInput = document.getElementsByName("aaa");
    //for문안에 i를 선언해 choiceOne 0번째에 objCountArr에 0번째 사진이 들어가게끔 했다.
    objChoiceOne[i] = objCountArr[i];
    //생성한 img 엘리먼트에 objCountArr에 있는 사진과 밸류들이 들어가게끔 해주는 거
    objQuesIMG.src = objCountArr[i].src;
    objQuesIMG.value = objCountArr[i].value;
    objQuesIMG.setAttribute("value", objCountArr[i].value);
    objChoiceOne[i].appendChild(objQuesIMG);
    //Input에도 이미지와 같은 value 값을 주기 위해
    objInput[i].setAttribute("value", objCountArr[i].value);
  }
}

//바위 : 0
//가위 : 1
//보 : 2
function goNext() {
  const objInput = document.getElementsByName("aaa");
  const thisNum = document.getElementById("thisNum");
  let currentNum = parseInt(thisNum.innerText);
  let currentQues = document.getElementById("ques");
  //1씩증가
  currentNum++;
  //toString 메소드는 객체가 가지고 있는 정보나 값들을 문자열로 만들어 리턴하는 메소드
  thisNum.innerText = currentNum.toString();
  for (let i = 0; i < objInput.length; i++) {
    if (objInput[i].checked) {
      //비겼을 때
      if (objInput[i].value === currentQues.value) {
        const sameNum = document.getElementById("sameNum");
        let currentSameNum = parseInt(sameNum.innerText);
        currentSameNum++;
        sameNum.innerText = currentSameNum.toString();
        showNextQuestion();
        clearCheck();
      } else if (objInput[i].value !== currentQues.value) {
        const result = objInput[i].value - currentQues.value;
        // 바위 일 때 경우의 수
        if (objInput[i].value == 0) {
          // 바위 일 때 패배
          if (result === -2) {
            const defeatNum = document.getElementById("defeatNum");
            let currentDefeatNum = parseInt(defeatNum.innerText);
            currentDefeatNum++;
            defeatNum.innerText = currentDefeatNum.toString();
            showNextQuestion();
            clearCheck();
            // 바위 일 때 승리
          } else if (result === -1) {
            const winNum = document.getElementById("winNum");
            let currentWinNum = parseInt(winNum.innerText);
            currentWinNum++;
            winNum.innerText = currentWinNum.toString();
            showNextQuestion();
            clearCheck();
          }
          //가위 일 때 경우의 수
        } else if (objInput[i].value == 1) {
          //가위 일 때 패배
          if (result === 1) {
            const defeatNum = document.getElementById("defeatNum");
            let currentDefeatNum = parseInt(defeatNum.innerText);
            currentDefeatNum++;
            defeatNum.innerText = currentDefeatNum.toString();
            showNextQuestion();
            clearCheck();
            // 가위 일 때 승리
          } else if (result === -1) {
            const winNum = document.getElementById("winNum");
            let currentWinNum = parseInt(winNum.innerText);
            currentWinNum++;
            winNum.innerText = currentWinNum.toString();
            showNextQuestion();
            clearCheck();
          }
          //보 일 때 경우의 수
        } else {
          //보 일 때 패배
          if (result === 1) {
            const defeatNum = document.getElementById("defeatNum");
            let currentDefeatNum = parseInt(defeatNum.innerText);
            currentDefeatNum++;
            defeatNum.innerText = currentDefeatNum.toString();
            showNextQuestion();
            clearCheck();
          }
          // 보 일 때 승리
          else if (result === 2) {
            const winNum = document.getElementById("winNum");
            let currentWinNum = parseInt(winNum.innerText);
            currentWinNum++;
            winNum.innerText = currentWinNum.toString();
            showNextQuestion();
            clearCheck();
          }
        }
      }
    }
  }
  if (currentNum > questionMaxCnt) {
    let nuber = document.querySelector("#number");
    let nextBtn = document.querySelector("#nextBtn");
    let reBtn = document.querySelector("#reBtn");
    nextBtn.style.display = "none";
    nuber.style.display = "none";
    reBtn.style.backgroundColor = "red";
  }
}

function showNextQuestion() {
  //새로운 문제 출력
  const objNewRSP = RSP[Math.floor(Math.random() * RSP.length)];
  //html에 img 요소 추가
  let newQuestion = document.querySelector("#ques");
  console.log(newQuestion);
  newQuestion.src = objNewRSP.src;
  newQuestion.value = objNewRSP.value;
  //setAttribute() 메소드는 지정된 요소의 속성 값을 설정합니다.
  newQuestion.setAttribute("value", objNewRSP.value);

  //새로운 보기 출력
  const objNewCountArr = [];
  const objCountArrN = [];
  let objNewRandom = RSP[Math.floor(Math.random() * RSP.length)];
  objNewCountArr.push(objNewRandom);
  console.log("0번째 들어간 인자의 밸류 : " + objNewCountArr[0].value);
  for (let i = 0; i < RSP.length; i++) {
    //true 인 것들만 새 배열로 들어와야됨
    if (RSP[i].value !== objNewCountArr[0].value) {
      objCountArrN.push(RSP[i]);
    }
  }
  for (let i = 0; i < objCountArrN.length; i++) {
    objNewCountArr.push(objCountArrN[i]);
  }
  console.log(objNewCountArr);

  let objChoiceOne = document.querySelectorAll(".choiceOne img");
  for (let i = 0; i < objChoiceOne.length; i++) {
    const objInput = document.getElementsByName("aaa");
    objChoiceOne[i].src = objNewCountArr[i].src;
    objChoiceOne[i].value = objNewCountArr[i].value;
    objChoiceOne[i].setAttribute("value", objNewCountArr[i].value);
    objInput[i].setAttribute("value", objNewCountArr[i].value);
  }
}
function clearCheck() {
  const clearCheck = document.getElementsByName("aaa");
  for (let i = 0; i < clearCheck.length; i++) {
    clearCheck[i].checked = false;
  }
}

function reloadBtn() {
  location.reload();
}

setQuestion();
goNext();
