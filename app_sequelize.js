const express = require('express');
const sequelize = require('./models').sequelize;
const app = express();

sequelize.sync(); // Sequelize 객체의 sync() 함수를 호출해서 모델에 정의한 테이블이 없을 때 생성해줍니다.

const {customers} = require('./models'); // customers 테이블에 대한 sequelize 모델

app.use(express.json({
    limit: '50mb' //최대 50메가
}));    // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(3000, () => {
    // 3000번 포트로 웹 서버 실행
    console.log('server started. port 3000')
})

// 고객 정보 조회 라우터
app.get('/api/custoemrs', async (req, res) => {
    const customersData = await customers.findAll(); // customers 테이블의 모든 데이터 조회
    console.log(customersData);
    res.send(customersData);
})
/**
 * findAll(), findAll(조건)
 * findByPk(pk) : pk로 데이터 조회 (ex) customers.findByPk(1)
 * findOne(조건) : 조건을 만족하는 데이터 중 첫 번째 데이터 조회 (ex) customers.findOne({where: {name: 'john doe'}})
 */


// 고객 정보 추가 라우터
app.post('/api/customer/insert', async (req, res) => {
    const {name, email, phone, address} = req.body.params;
    const result = await customers.create({name:name, email:email, phone: phone, address:address})
    res.send(resut);
});

// 고객 정보 수정 라우터
// 클라이언트가 서버 호출 시 body에 json 형식으로 params라는 키로 배열을 전송
// (ex) {params: [{phone: '010-1234-1234'}, 5]}
app.put('/api/customer/update', async (req, res) => {
    const result = await customers.update(req.body.params[0], {
        where: {id: req.body.params[1]}
    });
    res.send(result);
})

// 데이터 삭제
app.delete('/api/customer/delete/:id', async (res, req) => {
    const {id} = req.params; // 라우터 경로의 :id에 매핑되는 값 
    const result = await customers.destroy({
        where: {id: id}
    });
    res.send(resut); 
})