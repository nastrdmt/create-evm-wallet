import Web3 from 'web3';
import readline from 'readline-sync';
import chalk from 'chalk';
import fs from 'fs';

export const parseFile = (file) => {
    const data = fs.readFileSync(file, "utf-8");
    const array = (data.replace(/[^a-zA-Z0-9\n]/g,'')).split('\n');
    return array;
}

const createWallet = async(quantity) => {
    const w3 = new Web3();
    for(let i = 0; i < quantity; i++) {
        const wallets = parseFile('private.txt');
        const wallet = w3.eth.accounts.create();
        if (wallets[0].length == 64) {
            fs.writeFileSync("address.txt", `\n${wallet.address}`, { flag: 'a+' });
            fs.writeFileSync("private.txt", `\n${(wallet.privateKey).slice(2, wallet.privateKey.length)}`, { flag: 'a+' });
        } else if (wallets.length > 1) {
            fs.writeFileSync("address.txt", `\n${wallet.address}`, { flag: 'a+' });
            fs.writeFileSync("private.txt", `\n${(wallet.privateKey).slice(2, wallet.privateKey.length)}`, { flag: 'a+' });
        } else if (i == wallets.length - 1) {
            fs.writeFileSync("address.txt", `${wallet.address}`, { flag: 'a+' });
            fs.writeFileSync("private.txt", `${(wallet.privateKey).slice(2, wallet.privateKey.length)}`, { flag: 'a+' });
        } else {
            fs.writeFileSync("address.txt", `${wallet.address}\n`, { flag: 'a+' });
            fs.writeFileSync("private.txt", `${(wallet.privateKey).slice(2, wallet.privateKey.length)}\n`, { flag: 'a+' });
        }
    }
    console.log(chalk.yellow('File ready!'));
}

const status = readline.question(chalk.cyan('Enter the quantity how much you need to create: '));
if (Number(status) > 0 || Number(status) < 100) {
    await createWallet(Number(status));
} else {
    console.log(chalk.red('Error: need a number'));
}