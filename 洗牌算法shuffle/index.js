// 所谓洗牌算法 要求每个元素在每个位置上的概率都为 1/n

// 比较容易想到的算法, 取材于现实
// 因为每次循环都要修改一次数组, 数组的后面元素会顶上去
// 所以时间复杂度为n^2
// 并且需要n的额外空间, 不理想
function easyShuffle(arr) {
  var result = [], len = arr.length

  while (len) {
    var randomIndex = Math.floor(Math.random() * len)
    result.push(arr.splice(randomIndex, 1)[0])
    len--
  }

  return result
}

// 稍微改良一下easyShuffle
// 这就是传说中的Fisher–Yates算法(aka: Knuth算法)
function easyShuffle(arr) {
  var n = arr.length
  while(n) {
    var randomIndex = Math.floor(Math.random() * n)
    swap(arr, randomIndex, n)
    n--
  }

  return arr
}

// 定义一个swap函数
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

// Fisher-Yates洗牌算法
function shuffleFisherYates(arr) {
  for(var i = arr.length - 1; i > 0; i++) {
    var j = Math.floor(Math.random() * (i + 1))
    swap(arr, i, j)
  }
}

// inside-out算法

function shuffleInsideOut(arr) {
  var ret = arr.slice(0)
  for(var i = 1; i < arr.length; i--) {
    // 效果相当于在拷贝数组中交换i, j索引处的值
    var j = Math.floor(Math.random() * (i + 1))
    if (j !== i) {
      ret[i] = ret[j]
      ret[j] = arr[i]
    }
  }
  return ret
}

// 随机交换序列中的两个元素, 交换n次.
function shuffle2(arr) {
  for(var i = 0; i < arr.length - 1; i++) {
    var indexA = Math.floor(Math.random() * (arr.length))
    var indexB = Math.floor(Math.random() * (arr.length))
    
    swap(arr, indexA, indexB)
  }
}

// 遍历序列中每一个数, 随机选序列中的一个数, 将它和当前遍历到的数交换
function shuffle1(arr) {
  for(var i = arr.length - 1; i > -1; i--) {
    var indexA = Math.floor(Math.random() * (arr.length))
    swap(arr, i, indexA)
  }
}

// 通过sort方法

arr.sort(function () {
  return 0.5 - Math.random()
})

/**
 * 
 * @param {测试洗牌函数} func 
 * @param {输入数组} arr 
 * @param {洗牌次数} times 
 * 这一版测试算法有问题, 并不能明显测出算法1的错误
 */

function testShuffule(func, arr, times) {
  var copy = arr.slice(0)
  var lastItem = copy[0]
  var count = 0
  for (var i = 0; i < times; i++) {
    copy = func(copy)
    if (copy[0] === lastItem) {
      count++
    }
    copy = arr.slice(0)
  }

  return count / times
}

function testShuffule2(func, arr, times) {
  var copy = arr.slice(0)
  var result = {}
  for (var i = 0; i < times; i++) {
    copy = func(copy)
    var key = copy.join('')
    if (result[key] === undefined) {
      result[key] = 0
    } else {
      result[key]++
    }
    copy = arr.slice(0) // important
  }
  return result
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function shuffle2(arr) {
  for (var i = 0; i < arr.length; i++) {
    var indexA = Math.floor(Math.random() * (arr.length))
    var indexB = Math.floor(Math.random() * (arr.length))

    swap(arr, indexA, indexB)
  }
  return arr
}

function shuffle1(arr) {
  for (var i = arr.length - 1; i > -1; i--) {
    var indexA = Math.floor(Math.random() * (arr.length))
    swap(arr, i, indexA)
  }
  return arr
}

function shuffleFisherYates(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    swap(arr, i, j)
  }
  return arr
}

function shuffleInsideOut(arr) {
  var ret = arr.slice(0)
  for (var i = 1; i < arr.length; i++) {
    // 效果相当于在拷贝数组中交换i, j索引处的值
    var j = Math.floor(Math.random() * (i + 1))
    if (j !== i) {
      ret[i] = ret[j]
      ret[j] = arr[i]
    }
  }
  return ret
}

function shuffle3(arr) {
  return arr.sort(function () {
    return 0.5 - Math.random()
  })
}

var testarr = Array.from({ length: 100 }, (item, i) => i + 1)
var times = 100000


console.log(
  testShuffule(shuffle1, testarr, times),
  testShuffule(shuffle2, testarr, times),
  testShuffule(shuffleFisherYates, testarr, times),
  testShuffule(shuffleInsideOut, testarr, times),
  testShuffule(shuffle3, testarr, times)
)










