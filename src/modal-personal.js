const personalInfoButton = document.querySelector('.personal-info-button');
const modal = document.querySelector('.modal-personal');

personalInfoButton.onclick = () => {
  if (modal.style.visibility === 'visible') {
    modal.style.visibility = 'hidden';
    personalInfoButton.style.background = '#FFF9F5';
    document.body.style.background = '#FFF9F5';
  } else {
    modal.style.visibility = 'visible';
    document.body.style.background = '#AEAEAE4D';
  }
};
