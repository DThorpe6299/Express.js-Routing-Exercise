const express = require('express')
const ExpressError = require('./expressError')
const app = express();
app.use(express.json());
let nums;

app.get('/mean', function mean(req, res, next){
    try{
        if(!req.query || !req.query.nums || req.query.nums === '') throw new ExpressError("Numbers are required") 
        let reqArr = req.query.nums.split(',')
        for(let i=0; i<reqArr.length; i++){
            if(isNaN(reqArr[i])) throw new ExpressError(`${reqArr[i]} is not a number`)
        }
        nums = reqArr.map(Number);
        let sum = 0;
        for(let i=0; i<nums.length; i++){
            sum+= nums[i];
        }
        console.log(sum)
        let mean = sum/nums.length;
        console.log(mean)
        return res.json({response:{operation: 'mean', value: mean}});
    } catch(e){
        return next({ status: 400, msg: e.message });
    }
});

app.get('/median', function median(req,res, next){
    try{
        if(!req.query || !req.query.nums || req.query.nums === '') throw new ExpressError("Numbers are required")
        let reqArr = req.query.nums.split(',')
        for(let i=0; i<reqArr.length; i++){
            if(isNaN(reqArr[i])) throw new ExpressError(`${reqArr[i]} is not a number`)
        }
        nums = reqArr.map(Number);
        if(nums.length%2===0){
            let sortedNums = nums.sort((a,b)=>(a-b));
            let lowerMid = (sortedNums.length/2 -1)
            let upperMid = (sortedNums.length/2)
            let median = (sortedNums[lowerMid] + sortedNums[upperMid])/2;
            return res.json({response:{operation: 'median', value: median}})
        }
        else{
            let middlePoint=Math.floor(nums.length/2)
            let sortedNums = nums.sort((a,b)=>(a-b));
            let median = sortedNums[middlePoint];
            return res.json({response:{operation: 'median', value: median}})
        }
        }catch(e){
            return next({ status: 400, msg: e.message });
        }
})

app.get('/mode', function mode(req,res, next){
    try{   
        if(!req.query || !req.query.nums || req.query.nums === '') throw new ExpressError("Numbers are required") 
        let reqArr = req.query.nums.split(',')
        for(let i=0; i<reqArr.length; i++){
            if(isNaN(reqArr[i])) throw new ExpressError(`${reqArr[i]} is not a number`)
        }
        nums = reqArr.map(Number);
        let sortedNums = nums.sort((a,b)=>(a-b));
        let modeObj = {}
        for(let num of sortedNums){
            if(!modeObj[num]){
                modeObj[num] = 1;
            }else{
                modeObj[num]++;
            }
        }
        let modeArr = Object.values(modeObj).sort((a, b) => b - a);
        let highestCount = modeArr[0];
        let modes = Object.keys(modeObj).filter(key => modeObj[key] === highestCount);


        return res.json({ response: { operation: 'mode', value: modes } });
    } catch(e){
        return next({ status: 400, msg: e.message });
    }
    });


app.use(function(e, req, res, next){
    let status = e.status || 500;
    let msg = e.msg;

    return res.status(status).json({
        error: {msg, status}
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = {mean, median, mode};