const {mean, median, mode} = require('./node-stats')

describe('GET /mean', () => {
    test('should return mean value', async () => {
        const res = await request.get('/mean?nums=1,2,3');
        expect(res.status).to.equal(200);
        expect(res.body.response.operation).toEqual('mean');
        expect(res.body.response.value).toEqual(2);
    });

    test('should handle empty input and respond with 400', async () => {
        const res = await request.get('/mean');
        expect(res.status).to.equal(400);
        expect(res.body.error.msg).toEqual('Numbers are required');
    });

    test('should handle empty input and respond with 400', async () => {
        const res = await request.get('/mean?nums=1,foo,3,4');
        expect(res.status).toEqual(400);
        expect(res.body.error.msg).toEqual('foo is not a number');
    });

});

describe('median function', () => {
    test('return median of odd numbered set of numbers', async () => {
        const res = await request.get('/median?nums=1,2,3');
        expect(res.status).toEqual(200);
        expect(res.body.response.operation).toEqual('median');
        expect(res.body.response.value).toEqual(2);
    });
    test('return median of even numbered set of numbers', async() => {
        const res = await request.get('/median?nums=1,2,3,4');
        expect(res.status).toEqual(200);
        expect(res.body.response.operation).toEqual('median');
        expect(res.body.response.value).toEqual(2.5);
    });
    test('should handle empty input and respond with 400', async () => {
        const res = await request.get('/median');
        expect(res.status).toEqual(400);
        expect(res.body.error.msg).toEqual('Numbers are required');
    });

    test('should handle empty input and respond with 400', async () => {
        const res = await request.get('/median?nums=1,foo,3,4');
        expect(res.status).to.equal(400);
        expect(res.body.error.msg).toEqual('foo is not a number');
    });
});

describe('mode function', () => {
    test('return mode', async() => {
        const res = await request.get('/mode?nums=1,2,2,3,4');
        expect(res.status).toEqual(200);
        expect(res.body.response.operation).toEqual('mode');
        expect(res.body.response.value).toEqual(2);
    });
    test('return multiple modes', async() => {
        const res = await request.get('/mode?nums=1,2,2,3,3,4');
        expect(res.status).toEqual(200);
        expect(res.body.response.operation).toEqual('mode');
        expect(res.body.response.value).toEqual(2,3);
    });
    test('should handle empty input and respond with 400', async () => {
        const res = await request.get('/mode');
        expect(res.status).toEqual(400);
        expect(res.body.error.msg).toEqual('Numbers are required');
    });

    test('should handle empty input and respond with 400', async () => {
        const res = await request.get('/mode?nums=1,foo,3,4');
        expect(res.status).to.equal(400);
        expect(res.body.error.msg).toEqual('foo is not a number');
    });
});

