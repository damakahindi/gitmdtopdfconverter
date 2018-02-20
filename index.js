// TODO: let the file in the root directory be teh first one
// TODO: Add output files
const fs = require('fs');
// const path = require('path');
const recursive = require('recursive-readdir');
// const PDFDocument = require('pdfkit');
const markdownpdf = require('markdown-pdf');
// const walk = require('walk');

// const doc = new PDFDocument();

// doc.pipe(fs.createWriteStream('output.pdf'));
// doc.fontSize(15);
// Get input from terminal the file path
function checkIfDirectory(fileDirectory) {
  if (fs.lstatSync(fileDirectory).isDirectory()) {
    return true;
  }
  return false;
}

// function getFiles(dir, files_) {
//   files_ = files_ || [];
//   const files = fs.readdirSync(dir);
//   console.log('got here');
//   for (const i in files) {
//     const name = `${dir}/${files[i]}`;
//     if (fs.statSync(name).isDirectory()) {
//       getFiles(name, files_);
//     } else {
//       files_.push(name);
//     }
//   }
//   return files_;
// }

// function fileList(dir) {
//   return fs.readdirSync(dir).reduce((list, file) => {
//     const name = path.join(dir, file);

//     const isDir = checkIfDirectory(name);
//     return list.concat(isDir ? fileList(name) : [name]);
//   }, []);
// }


if (!process.argv[2]) {
  console.log('***********************************************************************************************\n');
  console.log("you need an arguement try node index.js 'help'");
  console.log('-----------------------------------------------------');
} else if (process.argv[2] == 'help') {
  console.log('***********************************************************************************************\n');
  console.log('1. You can one file in this directory to pdf file');
  console.log('-----------------------------------------------------');
  console.log('Example');
  console.log('-------------');
  console.log("node './index.js'");
  console.log('-----------------------------------------------------\n');
  console.log('2.You convert multipe files to pdf in a specific directory');
  console.log('-----------------------------------------------------');
  console.log('Example');
  console.log('-------------');
  console.log("node './convert'\n");
  console.log('***********************************************************************************************');
} else {
  const fileDirectory = process.argv[2];
  // Check if its a directory or file
  try {
    if (checkIfDirectory(fileDirectory)) {
      // const listofFiles = fileList(fileDirectory);
      recursive(fileDirectory, (err, files) => {
        markdownpdf().concat.from(files).to('./output.pdf', () => {
          console.log("Created'./output.pdf'");
        });
      });
      // const walker = walk.walk(fileDirectory, { followLinks: false });

      // walker.on('file', (root, stat, next) => {
      //   // Add this file to the list of files
      //   files.push(`${root}/${stat.name}`);
      //   next();
      // });


      // walker.on('end', () => {
      //   console.log(files);
      // });
      // fs.readdir(fileDirectory, (err, items) => {
      //   console.log(items);

      //   for (let i = 0; i < items.length; i++) {
      //     console.log(items[i]);
      //   }
      // });
      // If its a directory check if there are any files there
      // Read the files and concat them together starting with the file  in the root directory then the inner files
    } else {
      markdownpdf().from(fileDirectory).to('./output.pdf', () => {
        console.log('Done');
      });
    }
    // Convert those files to pdf
  } catch (e) {
    console.log('Please input a file or directory');
  }
}

