const { text } = require('express')
const {mean, median, mode} = require('./node-stats')

describe('mean function', function(){
    test('should return mean', () => {
        let avg = mean(1,2,3)
        expect(avg).toEqual(2)
    })
    test('return mean with negative numbers', ()=>{
        let avg = mean(-10,-20,-30)
        expect(avg).toEqual(-20)
    })
})

describe('mode function', function(){
    test('should return mode', () => {
        let modeVal = mode(1,2,2,3)
        expect(modeVal).toEqual(2)
    })
    test('return multiple modes', ()=>{
        let modeVal = mode(1,2,2,3,4,4)
        expect(modeVal).toEqual([2,4])
    })
})

describe('median function', function(){
    test('should return median with odd-numbered set', () => {
        let med = median(1,2,3)
        expect(med).toEqual(2)
    })
    test('return median with even-numbered set', ()=>{
        let med = median(1,2,3,4)
        expect(med).toEqual(2.5)
    })
})