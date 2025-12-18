const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const form = document.getElementById('bookingForm');

// Открытие модалки записи
function openModal(trainerName) {
    document.getElementById('trainerNameDisp').innerText = trainerName;
    document.getElementById('trainerInput').value = trainerName;
    
    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex'); // Для Tailwind flex-центра
    document.body.style.overflow = 'hidden';
}

// Закрытие модалки записи
function closeModal() {
    bookingModal.classList.add('hidden');
    bookingModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Закрытие окна успеха
function closeSuccessModal() {
    successModal.classList.add('hidden');
    successModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Обработка отправки
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const timeValue = document.getElementById('lessonTime').value;
        
        // Превращаем дату в красивый вид
        const date = new Date(timeValue);
        const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        const formattedDate = date.toLocaleDateString('ru-RU', options);

        // Прячем старое, показываем новое
        closeModal();
        
        document.getElementById('resName').innerText = name;
        document.getElementById('resTime').innerText = formattedDate;
        
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        
        this.reset();
    });
}

// Закрытие кликом по фону
window.onclick = function(e) {
    if (e.target == bookingModal) closeModal();
    if (e.target == successModal) closeSuccessModal();
}