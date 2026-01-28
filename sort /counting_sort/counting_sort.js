function countingSort(arr){
    let n = arr.length;
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let count = Array(max - min + 1).fill(0);
    for(let i = 0; i < n; ++i){
          count[arr[i] - min] ++;
    }
    let sort = [];
    for(let i = 0; i < max + 1; ++i){
        while(count[i] > 0){
            sort.push(i + min);
            count[i]--;
        }
    }
    console.log(sort)
    

}

let arr = [5,2,2,4,8,7,6,1,9,3,9];
countingSort(arr);
