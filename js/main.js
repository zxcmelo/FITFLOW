// Переменные для модальных окон
const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const form = document.getElementById('bookingForm');

// ФУНКЦИИ ЗАПИСИ
function openModal(trainerName) {
    if (document.getElementById('trainerNameDisp')) {
        document.getElementById('trainerNameDisp').innerText = trainerName;
        document.getElementById('trainerInput').value = trainerName;
    }
    
    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex'); 
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    bookingModal.classList.add('hidden');
    bookingModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function closeSuccessModal() {
    successModal.classList.add('hidden');
    successModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// ОБРАБОТКА ФОРМЫ
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const timeValue = document.getElementById('lessonTime').value;
        
        const date = new Date(timeValue);
        const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        const formattedDate = date.toLocaleDateString('ru-RU', options);

        closeModal();
        
        if (document.getElementById('resName')) {
            document.getElementById('resName').innerText = name;
            document.getElementById('resTime').innerText = formattedDate;
        }
        
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        
        this.reset();
    });
}

// --- НОВАЯ ЛОГИКА COOKIE ---

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const closeBtn = document.getElementById('close-cookie-hint');

    // Если баннера на текущей странице нет (например, страница тренера без него), выходим
    if (!cookieBanner) return;

    // Проверяем в памяти браузера, принимал ли пользователь куки раньше
    const isAccepted = localStorage.getItem('fitflow_cookies_accepted');

    if (!isAccepted) {
        // Показываем баннер через 2 секунды после захода
        setTimeout(() => {
            cookieBanner.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
            cookieBanner.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
        }, 2000);
    }

    // При нажатии "Принять" — запоминаем и прячем
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('fitflow_cookies_accepted', 'true');
            hideBanner();
        });
    }

    // При нажатии "Позже" — просто прячем
    if (closeBtn) {
        closeBtn.addEventListener('click', hideBanner);
    }

    function hideBanner() {
        cookieBanner.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        cookieBanner.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }
});