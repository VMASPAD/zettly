import { platform } from '@tauri-apps/plugin-os';
import { readDir, BaseDirectory, mkdir, writeTextFile, stat, readTextFile, create, remove } from '@tauri-apps/plugin-fs';
import { dataDir, downloadDir } from '@tauri-apps/api/path';

function isWindows() {
    const currentPlatform = platform();
    return currentPlatform
}
async function rootPath() {
const root = await dataDir() + '\\zettly';
return root;
}
export async function getRoot() {
    if (isWindows()) {
        const entries = await readDir('zettly', { baseDir: BaseDirectory.Data });
        try {
            await readDir('zettly', { baseDir: BaseDirectory.Data }); 
        } catch (error) {
            console.error('Directory does not exist, creating now:', error);
            await mkdir('zettly', { baseDir: BaseDirectory.Data });
        }
    } else {
        try {
            await readDir('zettly', { baseDir: BaseDirectory.Data });
            console.log('Directory exists');
        } catch (error) {
            console.error('Directory does not exist, creating now:', error);
            await mkdir('zettly', { baseDir: BaseDirectory.Data });
        }
    }
}
export async function checkDir() {
    await getRoot()
    if (isWindows()) {
        try {
            await readDir('zettly', { baseDir: BaseDirectory.Data }); 
        } catch (error) {
            console.error('Directory does not exist, creating now:', error);
            await mkdir('zettly', { baseDir: BaseDirectory.Data });
        }
    } else {
        try {
            await readDir('zettly', { baseDir: BaseDirectory.Data });
            console.log('Directory exists');
        } catch (error) {
            console.error('Directory does not exist, creating now:', error);
            await mkdir('zettly', { baseDir: BaseDirectory.Data });
        }
    }
}

export async function getArchives() {
    await checkDir();
    if (isWindows()) {
        const entries = await readDir('zettly', { baseDir: BaseDirectory.Data }); 
        return entries;
    } else {
        const entries = await readDir('zettly', { baseDir: BaseDirectory.Data });
        return entries;
    }
}

export async function saveArchive(name: string, content: string) {
    await checkDir();
    const filePath = await rootPath() + `\\${name}.zet`;
    try {
        await writeTextFile(filePath, content, { baseDir: BaseDirectory.Data });
    } catch (error) {
        console.error('Error saving archive:', error);
    }
}

export async function readArchive(name: string) {
    await checkDir();
    const filePath = await rootPath() + `\\${name}.zet`;
    try {
        const content = await readTextFile(filePath, { baseDir: BaseDirectory.Data });
        return [name, content];
    } catch (error) {
        console.error('Error reading archive:', error);
    }
}

export async function createArchives(name: string, content?: string) {
    try {
        const filePath = await rootPath() + `\\${name}.zet`;
        const file = await create(filePath, { baseDir: BaseDirectory.Data });
        await file.write(new TextEncoder().encode(content === undefined ? `{"time":0,"blocks":[],"version":"2.31.0-rc.7"}` : content));
        await file.close();
    } catch (error) {
        console.error('Error creating archive:', error);
    }
}

export async function deleteArchive(name: string) {
    try {
        const filePath = await rootPath() + `\\${name}.zet`;
        await remove(filePath, { baseDir: BaseDirectory.Data });
    } catch (error) {
        console.error('Error deleting archive:', error);
    }
}

export async function parseToMD(data: object) {
    const blocks = data;
    let markdown = '';
    console.log(data)
    for (const block of blocks['blocks']) {
        if (block.type === 'paragraph') {
            const text = block.data.text || '';
            markdown += text + '\n\n';
        } else if (block.type === 'header' || block.type === 'SimpleTitle') {
            const text = block.data.text || '';
            const level = block.data.level || 1;
            markdown += '#'.repeat(level) + ' ' + text + '\n\n';
        } else if (block.type === 'list') {
            const style = block.data.style || 'unordered';
            let counter = 1;
            for (const item of block.data.items) {
                const content = item.content || '';
                if (style === 'ordered') {
                    markdown += `${counter}. ${content}\n`;
                    counter++;
                } else if (style === 'checklist') {
                    const checked = item.meta?.checked ? 'x' : ' ';
                    markdown += `- [${checked}] ${content}\n`;
                } else {
                    markdown += `- ${content}\n`;
                }
            }
            markdown += '\n';
        } else if (block.type === 'SimpleQuote') {
            const text = block.data.text || '';
            markdown += `> ${text}\n\n`;
        } else if (block.type === 'SimpleSeparator') {
            markdown += '---\n\n';
        } else if (block.type === 'SimpleImage') {
            const src = block.data.src || '';
            const alt = block.data.text || 'Image';
            markdown += `![${alt}](${src})\n\n`;
        } else if (block.type === 'SimpleVideo') {
            const src = block.data.src || '';
            markdown += `[![Video](${src})](${src})\n\n`;
        } else if (block.type === 'SimpleCode') {
            const code = block.data.text || '';
            const language = block.data.language || '';
            markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
        } else if (block.type === 'Table') {
            const content = block.data.content || [];
            if (content.length > 0) {
                // Generate table markdown
                for (let i = 0; i < content.length; i++) {
                    const row = content[i];
                    markdown += '| ' + row.join(' | ') + ' |\n';
                    if (i === 0) {
                        // Generate separator row with same number of columns as the first row
                        const separators = row.map(() => '---');
                        markdown += '| ' + separators.join(' | ') + ' |\n';
                    }
                }
                markdown += '\n';
            }
        } else if (block.type === 'image') {
            const caption = block.data.caption || '';
            const url = block.data.file?.url || '';
            markdown += `![${caption}](${url})\n\n`;
        } else if (block.type === 'code') {
            const language = block.data.language || '';
            const code = block.data.code || '';
            markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
        }
    }
    console.log('Markdown generated:', markdown);
    return markdown;
}

export async function exportToArchive(name: string, data: object, typeArchive: string) {
    await checkDir();
    const filePath = await downloadDir() + `\\${name}.${typeArchive}`;
    try {
        const markdown = await parseToMD(data);
        await writeTextFile(filePath, markdown, { baseDir: BaseDirectory.Download });
        console.log('Exported to archive:', filePath);
        return filePath;
    } catch (error) {
        console.error('Error exporting to archive:', error);
        return "Error exporting to archive: " + error;
    }
}
