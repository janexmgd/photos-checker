import { readdir } from 'fs/promises';
import inquirer from 'inquirer';
import path from 'path';

const directory = path.join(process.cwd(), 'photos');

async function main() {
  try {
    const questions = await inquirer.prompt([
      {
        name: 'length',
        message: 'How many numbers do you want?',
        type: 'input',
      },
      {
        name: 'addsLength',
        message: 'How many additional numbers do you want?',
        type: 'input',
      },
    ]);

    const { length, addsLength } = questions;
    const files = await readdir(directory);
    const addsFiles = [];
    const filesNumber = files.map((file) => {
      const regex = /_(B\d+)/;
      if (file.match(regex)) {
        addsFiles.push(file);
        return undefined; // Use undefined for files that match the regex
      }
      return parseInt(file.split('_')[2]);
    });
    const addsFilesNumber = addsFiles.map((file) => {
      return parseInt(file.split('_')[2]);
    });

    const mustNumberAvailable = Array.from(
      { length: parseInt(length) },
      (_, i) => i + 1
    );
    const addsMustNumberAvailable = Array.from(
      { length: parseInt(addsLength) },
      (_, i) => i + 1
    );

    const numberNotFound = mustNumberAvailable.filter(
      (nomor) => !filesNumber.includes(nomor)
    );
    const addsNumberNotFound = addsMustNumberAvailable.filter(
      (nomor) => !addsFilesNumber.includes(nomor)
    );

    if (numberNotFound.length > 0) {
      console.log(
        `Not found number at base : ${numberNotFound.length} number \n`
      );
      numberNotFound.forEach((e) => {
        console.log(e);
      });
    } else {
      console.log('All Number at base is available');
    }
    console.log('-----------------------------');
    // console.log('Not Found Adds Numbers:  \n', addNumberNotFound);
    if (addsNumberNotFound.length > 0) {
      console.log(
        `Not found number at adds : ${addsNumberNotFound.length} number \n`
      );
      addsNumberNotFound.forEach((e) => {
        console.log(e);
      });
    } else {
      console.log('All Number at adds is available');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
