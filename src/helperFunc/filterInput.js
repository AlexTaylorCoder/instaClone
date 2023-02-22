const allowedChar = /[^\w\b]|_/;
const allowedCharUser = /[^\w\b.$%&-]/;
const allowedCharPass = /[^\w\b.`~!@#$%^&*()_+=-?*]/;

function filterInput(input,id) {
    //Create account validations 
    if (id === "password") {
      return allowedCharPass.test(input) || input.length > 30;
    } else if (id === "username") {
      return allowedCharUser.test(input) || input.length > 30;
    } else if(id === "picture") {
      return false
    }
    
    else {
      return false || input.length > 300;
    }
}

export default filterInput