import fs from 'fs';
import { Directory } from './Directory'

let test: string = 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

console.log(partOne(test, 100000));
console.log(partTwo(test, 70000000, 30000000));

fs.readFile('./src/Day7/input.txt', 'utf8', (err: any, data: any) => {
    if (err) 
      throw err;
    else
    {
        console.log(partOne(data, 100000));
        console.log(partTwo(data, 70000000, 30000000));
    }
  
});

function partOne(text: string, sizeLimit: number): number {
    let dir = buildFileTree(text);
    return dir.getSumOfChildrenUnderSize(sizeLimit);
}

function buildFileTree(text: string): Directory {
    let currentDir = new Directory('/');
    let toplevelDir = currentDir; // maintain a reference to this in case of '$ cd /'
    let lines: string[] = text.split('\n');
    for (let i = 1; i < lines.length; i++) {
        let line: string = lines[i].trim();
        let components: string[] = line.split(' ');
        if (isNumeric(components[0])) { // fileSize
            currentDir.addSize(parseInt(components[0]));
        }
        else if (components[0] === '$' && components[1] === 'cd')
        {
            let dir = components[2];
            if (dir === '/') {
                currentDir = toplevelDir;
                continue;
            }
            if (dir === '..') {
                currentDir = currentDir.parent!;
                continue;
            }
            let nextDir = new Directory(dir, currentDir);
            currentDir.children.push(nextDir);
            currentDir = nextDir;
            continue;
        }
    }
    return toplevelDir;
}

function isNumeric(str: string) {
    return !isNaN(parseFloat(str)) 
}

function partTwo(text: string, totalSpace: number, neededSpace: number): number {
    let dir = buildFileTree(text);
    let freeSpace = totalSpace - dir.size;
    let spaceToFree = neededSpace - freeSpace;
    return dir.getDirClosestToSize(spaceToFree);
}