var _a, _b;
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    var profilePictureInput = formData.get('profile-picture');
    var profilePicturePromise = profilePictureInput ? readImageFile(profilePictureInput) : Promise.resolve(null);
    profilePicturePromise.then(function (profilePictureData) {
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            education: formData.get('education'),
            workExperience: formData.get('work-experience'),
            skills: formData.get('skills'),
            backgroundColor: formData.get('bg-color') || 'transparent',
            textColor: formData.get('text-color') || 'white',
            fontFamily: formData.get('font-family') || 'Arial, sans-serif',
            profilePicture: profilePictureData
        };
        generateResume(resumeData);
    });
});
function readImageFile(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () { return resolve(reader.result); };
        reader.onerror = function (error) { return reject(error); };
        reader.readAsDataURL(file);
    });
}
function generateResume(data) {
    var resumeSection = document.getElementById('resume');
    if (resumeSection) {
        resumeSection.style.backgroundColor = data.backgroundColor;
        resumeSection.style.fontFamily = data.fontFamily;
        resumeSection.innerHTML = "\n      ".concat(data.profilePicture ? "<img src=\"".concat(data.profilePicture, "\" alt=\"Profile Picture\" class=\"profile-picture\">") : '', "\n      <h1 style=\"color: gold;\">").concat(data.name, "</h1>\n      <p style=\"color: ").concat(data.textColor, ";\">Email: ").concat(data.email, "</p>\n      <h2 style=\"color: gold;\">Education</h2>\n      <p style=\"color: ").concat(data.textColor, ";\">").concat(data.education, "</p>\n      <h2 style=\"color: gold;\">Work Experience</h2>\n      <p style=\"color: ").concat(data.textColor, ";\">").concat(data.workExperience, "</p>\n      <h2 style=\"color: gold;\">Skills</h2>\n      <p style=\"color: ").concat(data.textColor, ";\">").concat(data.skills, "</p>\n    ");
    }
    else {
        console.error('Resume section not found');
    }
}
(_b = document.getElementById('download-resume')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var _a, _b, _c, _d, _e;
    var resumeSection = document.getElementById('resume');
    if (resumeSection) {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        // Adding basic content to the PDF
        doc.setFontSize(16);
        doc.text('Dynamic Resume', 10, 10);
        doc.setFontSize(12);
        doc.text("Name: ".concat(((_a = resumeSection.querySelector('h1')) === null || _a === void 0 ? void 0 : _a.textContent) || ''), 10, 20);
        doc.text("Email: ".concat(((_b = resumeSection.querySelector('p')) === null || _b === void 0 ? void 0 : _b.textContent) || ''), 10, 30);
        doc.text("Education: ".concat(((_c = resumeSection.querySelectorAll('p')[1]) === null || _c === void 0 ? void 0 : _c.textContent) || ''), 10, 40);
        doc.text("Work Experience: ".concat(((_d = resumeSection.querySelectorAll('p')[2]) === null || _d === void 0 ? void 0 : _d.textContent) || ''), 10, 50);
        doc.text("Skills: ".concat(((_e = resumeSection.querySelectorAll('p')[3]) === null || _e === void 0 ? void 0 : _e.textContent) || ''), 10, 60);
        doc.save('resume.pdf');
    }
    else {
        console.error('Resume section not found');
    }
});
