function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}

function insertImage() {
    document.getElementById('imageInput').click();
}

function uploadImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = `<img src="${event.target.result}" alt="Image">`;
        document.execCommand('insertHTML', false, img);
    };
    reader.readAsDataURL(file);
}

function insertTable() {
    const rows = prompt('Enter number of rows', 2);
    const cols = prompt('Enter number of columns', 2);
    let table = '<table border="1">';
    for (let i = 0; i < rows; i++) {
        table += '<tr>';
        for (let j = 0; j < cols; j++) {
            table += '<td>&nbsp;</td>';
        }
        table += '</tr>';
    }
    table += '</table>';
    document.execCommand('insertHTML', false, table);
}

function printDocument() {
    const content = document.getElementById('editor').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function saveFile() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.html';
    a.click();
}

function loadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('editor').innerHTML = event.target.result;
    };
    reader.readAsText(file);
}

function findReplace() {
    const findText = prompt('Find text:', '');
    const replaceText = prompt('Replace with:', '');
    if (findText && replaceText !== null) {
        const content = document.getElementById('editor').innerHTML;
        const newContent = content.replace(new RegExp(findText, 'g'), replaceText);
        document.getElementById('editor').innerHTML = newContent;
    }
}

function toggleFullScreen() {
    const editor = document.getElementById('editor');
    if (!document.fullscreenElement) {
        editor.requestFullscreen().catch(err => alert(`Error attempting to enable full-screen mode: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function updateWordCount() {
    const text = document.getElementById('editor').innerText;
    const wordCount = text.trim().split(/\s+/).length;
    document.getElementById('wordCount').innerText = wordCount;
}

function downloadContent() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('editor').addEventListener('input', updateWordCount);
document.getElementById('editor').addEventListener('contextmenu', function (e) {
    e.preventDefault();
    const contextMenu = document.createElement('div');
    contextMenu.className = 'context-menu';
    contextMenu.innerHTML = `
        <button onclick="execCmd('bold')">Bold</button>
        <button onclick="execCmd('italic')">Italic</button>
        <button onclick="execCmd('underline')">Underline</button>
    `;
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    document.body.appendChild(contextMenu);
    contextMenu.focus();
    contextMenu.onblur = function() {
        contextMenu.remove();
    };
    contextMenu.focus();
});

document.addEventListener('click', function() {
    const contextMenu = document.querySelector('.context-menu');
    if (contextMenu) {
        contextMenu.remove();
    }
});

document.addEventListener('DOMContentLoaded', updateWordCount);
