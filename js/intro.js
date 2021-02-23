;(function($){
   
    var intro = {
        init:function(){
            var that = this;

                that.navFn();
                that.mainSlideFn();
                that.noticeFn();
                that.galleryFn();
                that.bannerFn();
                that.famliysiteFn();
        },
        navFn:function(){
            // 아코디언 메뉴
            // 메인메뉴 nav (선택자(selector): .main-btn)에  
            // 버튼 이벤트 리스너 마우스 오버(mouseenter)시 
            // 해당 메뉴에 클래스 추가(addClass('on'))하기 전 추가된 모든 클래스(removeClass(''on))삭제
            //클래스 추가(addClass('on'))하여 스타일을 설정함

            // 해당 서브메뉴(선택자(selector): .sub)에 
            // 클래스 추가(addClass('on'))하기 전 추가된 모든 클래스(removeClass(''on))삭제
            // 클래스 추가(addClass('on'))하여 스타일이 설정되도록 함

            //
            var $mainBtn = $('#nav .main-btn');
            var $sub = $('#nav .sub');
            var $navUl = $('#nav > ul'); //이 영역을 떠나면 모든 메뉴 닫힘

                //메인버튼 이벤트 리스너(핸들러)
                $mainBtn.on({
                    mouseenter:function(){
                        $mainBtn.removeClass('on');//모든 메인메뉴버튼
                        $(this).addClass('on');
                        $sub.removeClass('on');//모든 서브메뉴버튼
                        $(this).next().addClass('on');
                    }
                });

                //메인 메뉴와 서브메뉴 영역을 떠나면 메뉴 닫힘
                $navUl.on({
                    mouseleave:function(){
                        $mainBtn.removeClass('on');
                        $sub.removeClass('on');
                    }
                })
        },

        mainSlideFn:function(){
            //슬라이드 이미지 4개 좌우 추가 2개 = 총 6개 (3 0 1 2 3 0)
            //선택자 : 애니메이션 대상    .slide-wrap
            //선택자 : 이전 슬라이드 버튼 .prev-btn
            //선택자 : 다음 슬라이드 버튼 .next-btn
            //변수 : 카운트 변수 cnt = 0;

            var $slideWrap = $('#section1 .slide-wrap');
            var $prevBtn = $('#section1 .prev-btn');
            var $nextBtn = $('#section1 .next-btn');
            var cnt = 0;

                //1. 메인 슬라이드 함수
                function mainSlideFn(){
                    $slideWrap.stop().animate({left:-800*cnt},600,function(){
                        if(cnt>3) cnt=0;
                        if(cnt<0) cnt=3;    
                        $slideWrap.stop().animate({left:-800*cnt},0); // 순간이동 롤링 포인트

                    });
                }

                //2. 다음 슬라이드 카운트 함수
                function nextSlideCountFn(){
                    cnt++;
                    mainSlideFn(); //메인 함수 호출
                }

                //2-1. 이전 슬라이드 카운트 함수
                function prevSlideCountFn(){
                    cnt--;
                    mainSlideFn(); //메인 함수 호출
                }

                //3. 다음 슬라이드 버튼 클릭 이벤트
                $nextBtn.on({
                    click: function(){
                        //연속해서 클릭하면 버블링 발생
                        //디버깅 : 애니메이션이 동작이 안될 때 클릭하도록
                        //         제어문 설정(if 조건문)
                        //not(부정) != !==
                        //애니메이션이 안될 때를 ( !$slideWrap.is(':animated')
                        if( !$slideWrap.is(':animated')){
                            nextSlideCountFn();
                        }
                        
                    }
                });
                //3-1. 이전 슬라이드 버튼 클릭 이벤트
                $prevBtn.on({
                    click: function(){
                        if( !$slideWrap.is(':animated') ){
                            prevSlideCountFn();
                        }
                    }
                }); 
        },

        noticeFn:function(){
            //공지사항 버튼 .notice-btn 클릭하면 모달창#modal 띄운다
            //모달창 #modal 띄우고
            //클릭한 버튼(공지사항 버튼 .notice-btn)텍스트가 텍스트(a태그에 있는 텍스트)가
            //모달창 .notice-text(h1)에 해당 텍스트가 출력된다.
            
            var $modal = $('#modal');
            var $noticeBtn = $('#section2 .notice-btn');
            var $noticeText = $('#modal .notice-text');
            var $content = $('#modal .content');

                //모달창 열기 show() fadeIn() slideDown()
                $noticeBtn.on({
                    click:function(event){
                        event.preventDefault();
                        var txt = $(this).text();//클릭한 버튼의 텍스트 가져오기
                        var tit = $(this).attr('title');//클릭한 버튼의 타이틀(tit) 속성(attribute(attr)=property) 가져오기
                    
                        $modal.show(); //보여라 (display:none >> block 으로 바뀌게됨)
                        $noticeText.text(tit);
                    }
                });

                //모달창 닫기 hide() fadeOut() slideUp()
                //#modal을 클릭하면 창 닫기
                //단, $noticeText(h1) 텍스트 위치 박스는 클릭시 닫기 이벤트 수행안함

                $modal.on({
                    click:function(event){
                        event.preventDefault();
                        $(this).hide();
                    }
                });

                $content.on({
                    click:function(event){
                        event.stopPropagation();  //자손요소에서 클릭시 조상영역위치의 이벤트가 수행되는걸 차단
                    
                    }
                });

        },

        galleryFn:function(){
            //갤러리 이미지 버튼(.gallery-btn)을 클릭(이벤트 리스너)하면
            //갤러리 모달창(#madalGallery)이 열린다.(fadein())=show
            //그리고 해당이미지가 모달창에 나타난다.
            //부모영역의 이벤트 전달 차단 event.stopPropagation();
            //그리고 모달창 이미지를 클릭하면 다음 이미지가 나타난다. 부드럽게 페이드인(fadein(1000))
            //모달창 닫기는 이미지를 제외한 영역 클릭시 닫히게함(fadeOut(1000)부드럽게 닫히게)
            
            var $modalGallery = $('#modalGallery');
            var $galleryBtn = $('#section2 .gallery-btn');
            var $content= $('#modalGallery .content-gallery');
            var n = 0; //버튼 누르기 전 초기 값 each() idx값 저장하기 위해 사용하는 변수
            var a = ['url(./img/blog-post-img5.jpg)','url(./img/blog-post-img6.jpg)',
            'url(./img/blog-post-img7.jpg)','url(./img/blog-post-img4.jpg)'];

            var len = a.length-1;//배열의 총 갯수(길이) 4개[0,1,2,3] len(4)-1=3(마지막 배열 인덱스번호)
               // console.log('이미지배열 갯수',len); //4
            //배경이미지 번호가 순서대로 안되어있는 경우는 배열을 이용해서
            //배열(array=arr)의 순서를 이용한 알고리즘
            //객체선언은{} 객체배열은[]

            var arr = []; //1차원 배열 선언 리터럴 방식
            //var 배열이름 = [배열인자(수)값,배열인자(수)값,배열인자(수)값,배열인자(수)값,]; 
            var arr = [10, 20, 3, 78, 30]; //1차원 배열 선언 리터럴 방식 값도 지정 가능
                //console.log(arr);
                //배열 4번째 값 출력
                //console.log(arr[0]); //배열 인덱스 번호 0 1 2 3 4... 

            //1.클릭할 버튼 배열처리, 모달창 띄우고, 클릭한 이미지 변환
            $galleryBtn.each(function(idx){
                $(this).on({//매개변수 idx는 each()안에서만 사용 가능
                    click:function(){
                        n=idx; //현재 이미지 인덱스 번호
                        $modalGallery.stop().fadeIn(600);
                        contentFn(); 
                    }
                });


            });
            //1-1 공통함수 모달창에서 이미지 클릭 시 같이 사용하는 함수
            function contentFn(){
                $content.css({'background-image': a[n]}).stop().fadeOut(0).fadeIn(300);
                
                }

            //2.모달창 닫기 : 모달창 자신을 클릭하면 닫기
            $modalGallery.on({
                click:function(){
                    $modalGallery.stop().fadeOut(300);
                }
            });

            //3.모달창 이미지 클릭 다음 이미지 변환
            //이미지 클릭시 전체 닫기 차단(조상영역으로 전파차단).stopPropagstion()
            $content.on({
                click:function(e){
                    e.stopPropagation(); //차단확인
                    n ++; //다음 이미지 인덱스 번호
                    if(n>len) n=0 //마지막 이미지 번호 초과시 처음으로 초기화
                    contentFn(); //클릭한 인덱스 번호    
                }
            });
        },


        bannerFn:function(){
            
        },
        famliysiteFn:function(){
            var $family = $('#footer #family');

            $family.on({
                change:function(){
                    var x = $(this).val();
                    location.href = x;
                }
            });
        },
    };







    intro.init();

})(jQuery);

//자바스크립트
//패밀리사이트 점프메뉴

function goFamily(z){
    location.href = z;

}




//goUrl()링크
//BOM

function goUrl(z){

    //alert(z); //전달인자 > 매개변수 확인

    /*switch(매개변수비교할대상){ 

        case 조건1:
            //명령 수행할 내용
            break;

        case 조건2:
            //명령 수행할 내용
            break;
        
        default:
            //명령 수행할 내용
    }*/

    switch(z){
        case 'noticeMore':
            location.href = 'https://www.bok.or.kr/museum/pgm/master/list.do?progrmSeCd=03&menuNo=700124';
            break; //강제 탈출

        // main1
        case 'main1':
            location.href = './main1.html'
            break; 

        case 'main1-1':
            location.href = './main1-1.html'
            break; 

        case 'main1-2':
            location.href = './main1-2.html'
            break; 

        case 'main1-3':
            location.href = './main1-3.html'
            break; 

        case 'main1-4':
            location.href = './main1-4.html'
            break;

        // main2
        case 'main2':
            location.href = './main2.html'
            break; 

        case 'main2-1':
            location.href = './main2-1.html'
            break; 

        case 'main2-2':
            location.href = './main2-2.html'
            break; 

        case 'main2-3':
            location.href = './main2-3.html'
            break; 

        case 'main2-4':
            location.href = './main2-4.html'
            break;

        // main3
        case 'main3':
            location.href = './main3.html'
            break; 

        case 'main3-1':
            location.href = './main3-1.html'
            break; 

        case 'main3-2':
            location.href = './main3-2.html'
            break; 

        case 'main3-3':
            location.href = './main3-3.html'
            break; 

        case 'main3-4':
            location.href = './main3-4.html'
            break;

        // main4
        case 'main4':
            location.href = './main4.html'
            break; 

        case 'main4-1':
            location.href = './main4-1.html'
            break; 

        case 'main4-2':
            location.href = './main4-2.html'
            break; 

        case 'main4-3':
            location.href = './main4-3.html'
            break; 

        case 'main4-4':
            location.href = './main4-4.html'
            break;


        default:
            alert('url 전달인자가 잘못되었습니다.확인하세요.');
        //여기서는 break안걸어도됨(끝나는부분이라서). 해도 상관은 없음.
    }


    /*//공지사항 더보기
    if( z == 'noticeMore'){
        //location.href = 'https://www.bok.or.kr/museum/pgm/master/list.do?progrmSeCd=03&menuNo=700124';
        window.open('https://www.bok.or.kr/museum/pgm/master/list.do?progrmSeCd=03&menuNo=700124');
    }   

    //main1
    else if (z == 'main1'){
        //location.href = './main1.html' :현재창 열기_self
        window.open('./main1.html');   //:새 창 열기_blank
    }
    else if (z == 'main1-1'){
        location.href = './main1-1.html'
    }
    else if (z == 'main1-2'){
        location.href = './main1-2.html'
    }
    else if (z == 'main1-3'){
        location.href = './main1-3.html'
    }
    else if (z == 'main1-4'){
        location.href = './main1-4.html'
    }

    //main2
    else if (z == 'main2'){
        location.href = './main2.html'
    }
    else if (z == 'main2-1'){
        location.href = './main2-1.html'
    }
    else if (z == 'main2-2'){
        location.href = './main2-2.html'
    }
    else if (z == 'main2-3'){
        location.href = './main2-3.html'
    }
    else if (z == 'main2-4'){
        location.href = './main2-4.html'
    }
    // main3
    else if (z == 'main3'){
        location.href = './main3.html'
    }
    else if (z == 'main3-1'){
        location.href = './main3-1.html'
    }
    else if (z == 'main3-2'){
        location.href = './main3-2.html'
    }
    else if (z == 'main3-3'){
        location.href = './main3-3.html'
    }
    else if (z == 'main3-4'){
        location.href = './main3-4.html'
    }
    // main4
    else if (z == 'main4'){
        location.href = './main4.html'
    }
    else if (z == 'main4-1'){
        location.href = './main4-1.html'
    }
    else if (z == 'main4-2'){
        location.href = './main4-2.html'
    }
    else if (z == 'main4-3'){
        location.href = './main4-3.html'
    }
    else if (z == 'main4-4'){
        location.href = './main4-4.html'
    }


    //else : 그 밖에(그 외에) 모든 것.다른조건
    else{
        alert('url 전달인자가 잘못되었습니다.확인하세요.');
        return false; //버튼 클릭을 취소 .되돌릴 값이 없다.클릭한 것이 잘못된 값일 때 취소시켜라
    
    }*/

}