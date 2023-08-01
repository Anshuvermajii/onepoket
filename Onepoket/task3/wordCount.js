const fs = require('fs');
const readline = require('readline');

const filename = 'data.txt';

// Function to create the file if it doesn't exist
function createFileIfNotExists(callback) {
  // Check if the file exists
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file does not exist, create a new one
      console.log('File "data.txt" does not exist. Creating a new one...');
      fs.writeFile(filename, '', (err) => {
        if (err) {
          console.error(`Error creating file: ${err}`);
          return;
        }
        // Callback after creating the file
        callback();
      });
    } else {
      // If the file already exists, proceed with the callback
      callback();
    }
  });
}

// Function to prompt the user to enter some text
function promptText(callback) {
  // Create a readline interface to get user input from the console
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask the user to enter text
  rl.question('Enter some text (press Ctrl + C to finish):\n', (text) => {
    // Read the existing file content before appending new text
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
      } else {
        // Calculate the new word count based on the newly entered text
        const newWordCount = countWords(text);
        // Append the entered text to the file, adding a space before appending if the file already contains text
        fs.appendFile(filename, `${text} `, (err) => {
          if (err) {
            console.error(`Error writing to file: ${err}`);
          }
          // Close the readline interface after appending text and proceed with the callback
          rl.close();
          callback(newWordCount);
        });
      }
    });
  });
}

// Function to count the total number of words in the given text
function countWords(text) {
  // Split the text by whitespace (spaces, tabs, newlines) to get individual words
  const words = text.trim().split(/\s+/);
  // Return the total number of words in the text
  return words.length;
}

// Function to count and print both old and new word count
function countAndPrintWords(text, newWordCount) {
  // Split the text by whitespace (spaces, tabs, newlines) to get individual words
  const words = text.trim().split(/\s+/);
  // Get the total word count from the text
  const wordCount = words.length;
  // Calculate the old word count by subtracting the new word count from the total word count
  const oldWordCount = wordCount - newWordCount;
  // Print the old and new word counts
  console.log(`Old word count: ${oldWordCount}`);
  console.log(`New word count: ${newWordCount}`);
  console.log(`Total old + new words: ${wordCount}`);
}

// Initial function call to check and create the file if it doesn't exist
createFileIfNotExists(() => {
  // Prompt the user to enter some text and then read the file
  promptText((newWordCount) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
      } else {
        // Count and print the old and new word counts in the entered text
        countAndPrintWords(data, newWordCount);
        // Prompt the user to clear the file content
        promptClearFile();
      }
    });
  });
});

//
