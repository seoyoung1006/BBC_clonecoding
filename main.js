(() => {

    const actions = {
        birdFlies(key) {
            if (key){
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key) {
            if (key){
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(${window.innerWidth}px), ${-window.innerHeight * 0.7}px`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

    const stepElems = document.querySelectorAll('.step'); //말풍선
    const graphicElems = document.querySelectorAll('.graphic-item'); //그림
    let currentItem = graphicElems[0]; //현재 활성화된(visible클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => { //io 라는 변수를 통해서 observe관찰 시킴
        ioIndex = entries[0].target.dataset.index * 1; //index는 숫자로 바꾸기(문자열->숫자: * 1)
    });

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);//모든 stepElems가 관찰 대상으로 등록 된다
        //stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i; //html속성으로 data-index준거랑 같음
        graphicElems[i].dataset.index = i;
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible'); //currentItem에 visible붙은 애가 활성화 되어있으면 remove하시요
        if (action) {
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;


        //for (let i = 0; i < stepElems.length; i++){
        for (let i =  ioIndex - 1; i < ioIndex + 2; i++){  // 현재 실행중인 observer의 전꺼랑 다음꺼만 검사를 해주는 것
            step = stepElems[i];
            if(!step) continue; //step에 값이 없다면 그냥 밑에꺼 하세여
            boundingRect = step.getBoundingClientRect();
             //말풍선 위치를 찍는당
    
            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {
                    inactivate();
                    currentItem = graphicElems[step.dataset.index];
                    activate(currentItem.dataset.action);
                }
        }
    });

    window.addEventListener('load' , () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();

}) ();