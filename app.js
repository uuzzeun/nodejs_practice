const express = require('express')
const app = express()
const port = 3000 // 서버 포트 번호

app.get('/', (req, res) => {
    res.send('hello world')
})
  
app.get('/about', (req, res) => {
    res.send('about')
})

// app.listen() 함수를 사용해서 서버를 실행합니다.
app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`)
})

app.use(express.json({
    limit : '50mb' //최대 50메가
}));    //클라이언트 요청 body를 json으로 파싱 처리

app.get('/customer', function(req, res) {
    res.send('get 요청에 대한 응답');
})

app.post('/customer', function(req, res) {
    console.log(req.body.param)
    res.send(req.body.param);
});

const express = require('express');
// 클라이언트에서 http 요청 메소드 get 방식으로 host:port를 호출했을 때
app.get('/root', function (req, res) {
    res.send('root');   // 클라이언트에 root 문자열 전송
});

// 문자열 패턴을 기반으로 하는 라우트 경로
// get 방식으로, 'host:port/acd' or 'host:port/abcd'를 호출했을 때
// b?는 문자 b가 0개 혹은 1개 있다는 것을 의미
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd');
})

// 다른 문자열 패턴 기반
// 'b+'는 b가 1개 이상
// 'ab*cd'는 문자 ab와 문자 cd 사이에 문자가 없거나 혹은 어떤 문자도 올 수 있다
// '(cd)?'는 문자 'cd'가 0번 혹은 1번 있을 수 있음을 의미


// 정규식 기반으로 하는 라우트 경로
app.get(/a/, function (req, res) {
    res.send('/a/');
});

// 'insert'로 시작하는 경우
app.get(/^insert/, function (req, res) {
    res.send('/^insert/');
});



/* 
route handler 
*/
app.get('/contact', function (req, res) {
    res.send('contact')
});

// 2개 이상의 콜백 함수를 실행하기
app.get('/example', function (req, res, next) {
    console.log('첫 번째 콜백 함수');
    next(); // 다음 콜백 함수 호출
}, function (req, res) {
    res.send('두 번째 콜백 함수');  // 클라이언트로 응답
});

// 콜백 함수 배열로 라우트를 처리하기
const ex0 = function (req, res, next) {
    console.log('첫 번째 콜백 함수')
    next(); 
}

const ex1 = function (req, res, next) {
    console.log('두 번째 콜백 함수')
    next(); 
}

const ex2 = function (req, res) {
    res.send('세 번째 콜백 함수');
}

app.get('/examples', [ex0, ex1, ex2]);


/*
 response method
*/
// 모듈식 라우터 - 하나의 라우트 경로로 각 라우트 메소드 처리
app.route('/customer')
    .get(function (req, res) {
        res.send('고객 정보 조회');
    })
    .post(function (req, res) {
        res.send('신규 고객 추가');
    })
    .put(function (req, res) {
        res.send('고객 정보 수정');
    })
    .delete(function (req, res) {
        res.send('고객 정보 삭제');
    });


