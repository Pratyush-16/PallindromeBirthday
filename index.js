 const bdayInput = document.querySelector("#birthday-date");
const chckBtn = document.querySelector(".clickme");
 const outputAns = document.querySelector(".output")

// function checkBday(){
//     console.log("clicked");
//     outputAns.innerText = "i am clicked"
// }
chckBtn.addEventListener('click', clickHandler); 

function clickHandler(){
    
        var bdayStr = bdayInput.value
        if(bdayStr !== '') {
            var listOfDate = bdayStr.split('-')
            var date = {
                day: Number(listOfDate[2]),
                month:Number(listOfDate[1]),
                year:Number(listOfDate[0])
            }
            var isPalindrome = checkPalindromeForAllDateFormats(date)
            if(isPalindrome) {
                outputAns.innerText = "Yes, Your birthday is Palindrome "
            }else{
                var [ctr , nextDate] = getNextPallindromeDate(date)
                outputAns.innerText = `You missed by ${ctr} days and your nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} ` 
    
            }
           
        } else{
            outputAns.innerText = "Please Enter your birthday date"
        }
    }


var date ={
    day: 15,
    month: 8,
    year: 2021
};

function reverseString(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse() ;
    var reverseStr = reverseListOfChars.join(''); 
    return reverseStr;
}
//console.log(reverseString('pratyush'));

function isPalindrome(str){
    var reverse = reverseString(str);
    return str === reverse;
}

// console.log(isPallindrome('242'));
// console.log(isPallindrome('lol'));
// console.log(isPallindrome('racecar'));
// console.log(isPallindrome('ababf'));

function convertDateToString(date){ 
    var dateStr = {day:'', month:'', year:''};

    if(date.day < 10) {
        dateStr.day ='0'+ date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    if(date.month < 10){
        dateStr.month = '0'+ date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

//console.log(convertDateToString(date));


function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

//console.log(getAllDateFormats(date));

function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
  
    for(var i=0; i < listOfPalindromes.length; i++){
      if(isPalindrome(listOfPalindromes[i])){
        flag = true;
        break;
      }
    } 
  
    return flag;
  }


function isLeapYear(year){
    if(year % 400 ===0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day +1;  //increasing the day
    var month = date.month;
    var year = date.year;

    var daysInMonth =  [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        //check for leap year
        if(isLeapYear(year)){
            if(day >29){
                day =1;
                month++;
            }
        }else{
            if(day >28){
                day =1;
                month++;
            }
        }
    }
    else{
        //checking if the day exceeds the max day in month
        if(day >daysInMonth[month-1]){
            day =1;
            month ++;
        }
    }

    if( month > 12){
        month =1;
        year++;
    }
    return {
        day:day,
        month:month,
        year:year
    };
}

function getNextPallindromeDate(date){
    var ctr =0;
    var nextDate = getNextDate(date);
    
    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);

        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

  //console.log(getNextPallindromeDate(date)); 