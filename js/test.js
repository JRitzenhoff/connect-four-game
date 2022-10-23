let test = document.getElementById('counter');
console.log(test);


test.animate([
    {left: '29.2%',top: '22%'},
    {Left: '29.2%',top: '32%'},
    {left: '29.2%',top: '41.5%'},
    {Left: '29.2%',top: '51.5%'},
    {left: '29.2%',top: '61.2%'},
    {Left: '29.2%',top: '71%'}, 
    {Left: '29.2%',top: '71%'}, 

],{
    duration:2000,
    iterations: 1,
    fill:'forwards'
})