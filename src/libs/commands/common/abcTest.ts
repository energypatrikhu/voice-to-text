import cmd from '../../commandHandler';
import { printText } from '../../pressKeys';

cmd.registerCommand(async () => {
	let nums = '0 1 2 3 4 5 6 7 8 9';
	let hunAbcUpper = 'A Á B C Cs D Dz Dzs E É F G Gy H I Í J K L Ly M N Ny O Ó Ö Ő P Q R S Sz T Ty U Ú Ü Ű V W X Y Z Zs';
	let hunAbcLower = hunAbcUpper.toLowerCase();

	await printText([nums, hunAbcUpper, hunAbcLower].join(' '));
}, ['both', '123ABC teszt', '!123abc', '123abc', 'Kiírja a számokat 1-től 9-ig és a magyar ABC betüit.']);
