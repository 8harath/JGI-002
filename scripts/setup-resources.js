var fs = require('fs');
var path = require('path');
var subjects = [
    { id: 101, semesterId: 1 },
    { id: 102, semesterId: 1 },
    { id: 103, semesterId: 1 },
    { id: 104, semesterId: 1 },
    { id: 105, semesterId: 1 },
    { id: 106, semesterId: 1 },
    { id: 107, semesterId: 1 },
    { id: 108, semesterId: 1 },
    { id: 201, semesterId: 2 },
    { id: 202, semesterId: 2 },
    { id: 203, semesterId: 2 },
    { id: 204, semesterId: 2 },
    { id: 205, semesterId: 2 },
    { id: 206, semesterId: 2 },
    { id: 207, semesterId: 2 },
    { id: 208, semesterId: 2 },
    { id: 209, semesterId: 2 },
    { id: 301, semesterId: 3 },
    { id: 302, semesterId: 3 },
    { id: 303, semesterId: 3 },
    { id: 304, semesterId: 3 },
    { id: 305, semesterId: 3 },
    { id: 306, semesterId: 3 },
    { id: 307, semesterId: 3 },
    { id: 308, semesterId: 3 },
    { id: 401, semesterId: 4 },
    { id: 402, semesterId: 4 },
    { id: 403, semesterId: 4 },
    { id: 404, semesterId: 4 },
    { id: 405, semesterId: 4 },
    { id: 406, semesterId: 4 },
    { id: 407, semesterId: 4 },
];
var PUBLIC_PATH = path.join(process.cwd(), 'public', 'semesters');
// Create base directories
function createDirectoryStructure() {
    // Create semesters directory
    if (!fs.existsSync(PUBLIC_PATH)) {
        fs.mkdirSync(PUBLIC_PATH, { recursive: true });
    }
    // Create directories for each subject
    subjects.forEach(function (subject) {
        var subjectPath = path.join(PUBLIC_PATH, subject.semesterId.toString(), subject.id.toString());
        // Create subject directory
        if (!fs.existsSync(subjectPath)) {
            fs.mkdirSync(subjectPath, { recursive: true });
        }
        // Create resource directories
        var directories = [
            'tlep',
            'notes',
            'presentations',
            'activity-1',
            'activity-2',
            'papers'
        ];
        directories.forEach(function (dir) {
            var dirPath = path.join(subjectPath, dir);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
        });
        // Create module directories for notes and presentations
        var moduleDirs = ['notes', 'presentations'];
        moduleDirs.forEach(function (dir) {
            for (var i = 1; i <= 5; i++) {
                var modulePath = path.join(subjectPath, dir, "module-".concat(i));
                if (!fs.existsSync(modulePath)) {
                    fs.mkdirSync(modulePath);
                }
            }
        });
    });
}
// Create placeholder files
function createPlaceholderFiles() {
    subjects.forEach(function (subject) {
        var subjectPath = path.join(PUBLIC_PATH, subject.semesterId.toString(), subject.id.toString());
        // TLEP
        var tlepPath = path.join(subjectPath, 'tlep', 'tlep.pdf');
        if (!fs.existsSync(tlepPath)) {
            fs.writeFileSync(tlepPath, '');
        }
        // Notes
        for (var i = 1; i <= 5; i++) {
            var notesPath = path.join(subjectPath, 'notes', "module-".concat(i), 'notes.pdf');
            if (!fs.existsSync(notesPath)) {
                fs.writeFileSync(notesPath, '');
            }
        }
        // Presentations
        for (var i = 1; i <= 5; i++) {
            var pptPath = path.join(subjectPath, 'presentations', "module-".concat(i), 'slides.pptx');
            if (!fs.existsSync(pptPath)) {
                fs.writeFileSync(pptPath, '');
            }
        }
        // Activities
        var activity1Path = path.join(subjectPath, 'activity-1');
        if (!fs.existsSync(path.join(activity1Path, 'code.zip'))) {
            fs.writeFileSync(path.join(activity1Path, 'code.zip'), '');
        }
        if (!fs.existsSync(path.join(activity1Path, 'documentation.pdf'))) {
            fs.writeFileSync(path.join(activity1Path, 'documentation.pdf'), '');
        }
        var activity2Path = path.join(subjectPath, 'activity-2');
        if (!fs.existsSync(path.join(activity2Path, 'code.zip'))) {
            fs.writeFileSync(path.join(activity2Path, 'code.zip'), '');
        }
        if (!fs.existsSync(path.join(activity2Path, 'certification.pdf'))) {
            fs.writeFileSync(path.join(activity2Path, 'certification.pdf'), '');
        }
        // Papers
        var papersPath = path.join(subjectPath, 'papers', '2023.pdf');
        if (!fs.existsSync(papersPath)) {
            fs.writeFileSync(papersPath, '');
        }
    });
}
// Run the setup
createDirectoryStructure();
createPlaceholderFiles();
console.log('Resource directory structure created successfully!');
