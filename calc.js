let a = '' // первое число
let b = '' // второе число
let sign = '' // знак операции
let finish = false

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'] // для понимания, что нажимю
const action = ['-', '+', 'x', '/'] // обозначение операций

// экран
const out = document.querySelector('.calc-screen p')


// функция очищения
function clearAll () {
  a = ''
  b = ''
  sign = ''
  finish = false
  out.textContent = 0
}

// оживляем кнопку ac
document.querySelector('.ac').onclick = clearAll

// нажатие на кнопку
document.querySelector('.buttons').onclick = (event) => {
  // нажата не кнопка
  if(!event.target.classList.contains('btn'))
  return
  // нажата кнопка ас
  if(event.target.classList.contains('ac'))
  return

  out.textContent = ''
  // получаю нажатую кнопку
  const key = event.target.textContent

  // усли нажата клавиша 0-9 или .
  if(digit.includes(key)) {
    // наполнение переменной а
    if(b === '' && sign === '') {
      a += key
      out.textContent = a;
    } else if (a!== '' && b!== '' && finish) {
      b = key
      finish = false
      out.textContent = b;
    } else {
      b += key
      out.textContent = b;
      console.log(a, b, sign)
      return
    }
  }

  // если нажата клавиша + - / *
  if(action.includes(key)) {
    sign = key
    out.textContent = sign
    console.table(a, b, sign)
    return
  }

  // если нажата клавиша % (процент)
  if (key === '%') {
    if (a !== '' && b === '' && sign === '') {
    a = (+a) / 100; // вычисляем процент от числа a
    out.textContent = a;
    console.table(a, b, sign);
    }
    return;
  }

  // если нажата клавиша +/-
  if (key === '+/-') {
    if (b === '') {
      a = (+a) * -1; // меняем знак числа a
      out.textContent = a;
      console.table(a, b, sign);
    } else {
      b = (+b) * -1; // меняем знак числа b
      out.textContent = b;
      console.table(a, b, sign);
    }
    return;
  }

  // нажата клавиша =
  if(key === '=') {
    if (b === '') b = a
    switch (sign) {
      case "+":
        a = (+a) + (+b)
        break

      case "-":
        a = a - b
        break

      case "x":
        a = a * b
        break

      case "/":
        if(b === '0') {
          out.textContent = 'Ошибка'
          a = ''
          b = ''
          sign = ''
          return
        }
        a = a / b
        break

    }
    finish = true
    out.textContent = a
    console.table(a, b, sign)
  }
}