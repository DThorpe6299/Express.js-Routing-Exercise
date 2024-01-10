const express = require('express')
const ExpressError = require('./expressError')
const app = express();
app.use(express.json());
let nums;

function mode(sortedNums){
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
    console.log(modes)
    return modes
}

function mean(nums){
    let sum = 0;
        for(let i=0; i<nums.length; i++){
            sum+= nums[i];
        }
        console.log(sum)
        let mean = sum/nums.length;
        console.log(mean)
        return mean;
}

function median(nums){
    if(nums.length%2===0){
        let sortedNums = nums.sort((a,b)=>(a-b));
        let lowerMid = (sortedNums.length/2 -1)
        let upperMid = (sortedNums.length/2)
        let median = (sortedNums[lowerMid] + sortedNums[upperMid])/2;
        console.log(median)
        return median
    }
    else{
        let middlePoint=Math.floor(nums.length/2)
        let sortedNums = nums.sort((a,b)=>(a-b));
        let median = sortedNums[middlePoint];
        return median
    }
}

app.get('/mean', (req, res, next)=>{
    try{
        if(!req.query || !req.query.nums || req.query.nums === '') throw new ExpressError("Numbers are required") 
        let reqArr = req.query.nums.split(',')
        for(let i=0; i<reqArr.length; i++){
            if(isNaN(reqArr[i])) throw new ExpressError(`${reqArr[i]} is not a number`)
        }
        nums = reqArr.map(Number);
        
        return res.json({response:{operation: 'mean', value:mean(nums)}});
    } catch(e){
        return next({ status: 400, message: e.message });
    }
});

app.get('/median', (req,res, next)=>{
    try{
        if(!req.query || !req.query.nums || req.query.nums === '') throw new ExpressError("Numbers are required")
        let reqArr = req.query.nums.split(',')
        for(let i=0; i<reqArr.length; i++){
            if(isNaN(reqArr[i])) throw new ExpressError(`${reqArr[i]} is not a number`)
        }
        nums = reqArr.map(Number);
        return res.json({ response: { operation: 'median', value: median(nums) } });
        }catch(e){
            return next({ status: 400, message: e.message });
        }
})

app.get('/mode', (req, res, next)=>{
    try{   
        if(!req.query || !req.query.nums || req.query.nums === '') throw new ExpressError("Numbers are required") 
        let reqArr = req.query.nums.split(',')
        for(let i=0; i<reqArr.length; i++){
            if(isNaN(reqArr[i])) throw new ExpressError(`${reqArr[i]} is not a number`)
        }
        nums = reqArr.map(Number);
        let sortedNums = nums.sort((a,b)=>(a-b));
        


        return res.json({ response: { operation: 'mode', value: mode(sortedNums) } });
    } catch(e){
        return next({ status: 400, message: e.message });
    }
});


app.use(function(e, req, res, next){
    let status = e.status || 500;
    let msg = e.message;

    return res.status(status).json({
        error: {msg, status}
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = {mode, mean, median};