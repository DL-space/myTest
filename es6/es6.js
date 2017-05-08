/**
 * Created by DL on 2017/5/5.
 */
function add(...values) {
    let sum = 0;

    for (var val of values) {
        sum += val;
    }
    console.log(sum);
    return sum;
}
add(2,2,4);