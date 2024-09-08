document.getElementById('resume-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const profilePictureInput = formData.get('profile-picture') as File | null;
  const profilePicturePromise = profilePictureInput ? readImageFile(profilePictureInput) : Promise.resolve(null);

  profilePicturePromise.then((profilePictureData) => {
    const resumeData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      education: formData.get('education') as string,
      workExperience: formData.get('work-experience') as string,
      skills: formData.get('skills') as string,
      backgroundColor: (formData.get('bg-color') as string) || 'transparent',
      textColor: (formData.get('text-color') as string) || 'white',
      fontFamily: (formData.get('font-family') as string) || 'Arial, sans-serif',
      profilePicture: profilePictureData
    };

    generateResume(resumeData);
  });
});

function readImageFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function generateResume(data: any): void {
  const resumeSection = document.getElementById('resume') as HTMLElement;

  if (resumeSection) {
    resumeSection.style.backgroundColor = data.backgroundColor;
    resumeSection.style.fontFamily = data.fontFamily;

    resumeSection.innerHTML = `
      ${data.profilePicture ? `<img src="${data.profilePicture}" alt="Profile Picture" class="profile-picture">` : ''}
      <h1 style="color: gold;">${data.name}</h1>
      <p style="color: ${data.textColor};">Email: ${data.email}</p>
      <h2 style="color: gold;">Education</h2>
      <p style="color: ${data.textColor};">${data.education}</p>
      <h2 style="color: gold;">Work Experience</h2>
      <p style="color: ${data.textColor};">${data.workExperience}</p>
      <h2 style="color: gold;">Skills</h2>
      <p style="color: ${data.textColor};">${data.skills}</p>
    `;
  } else {
    console.error('Resume section not found');
  }
}

document.getElementById('download-resume')?.addEventListener('click', () => {
  const resumeSection = document.getElementById('resume') as HTMLElement;

  if (resumeSection) {
    const { jsPDF } = (window as any).jspdf;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Dynamic Resume', 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${resumeSection.querySelector('h1')?.textContent || ''}`, 10, 20);
    doc.text(`Email: ${resumeSection.querySelector('p')?.textContent || ''}`, 10, 30);
    doc.text(`Education: ${resumeSection.querySelectorAll('p')[1]?.textContent || ''}`, 10, 40);
    doc.text(`Work Experience: ${resumeSection.querySelectorAll('p')[2]?.textContent || ''}`, 10, 50);
    doc.text(`Skills: ${resumeSection.querySelectorAll('p')[3]?.textContent || ''}`, 10, 60);

    doc.save('resume.pdf');
  } else {
    console.error('Resume section not found');
  }
});
