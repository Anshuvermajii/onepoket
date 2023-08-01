
//run file cmd  is node sumOfArray.js
const readline = require('readline');

function sumOfArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number') {
      throw new Error('Array should contain only integers.');
    }
    sum += arr[i];
  }

  return sum;
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to read user input as an array of integers
function readArrayInput() {
  rl.question('Enter space-separated integers (e.g., 1 2 3): ', (input) => {
    try {
      const inputArray = input.split(' ').map(Number);
      const result = sumOfArray(inputArray);
      console.log('Sum:', result);
      rl.close();
    } catch (error) {
      console.error('Error:', error.message);
      rl.close();
    }
  });
}

// Call the function to read user input
readArrayInput();
