import '../styles/style.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';

import '../styles/style.scss';

import logo from '../images/logo.png';
document.querySelector('.navbar-brand img').src = logo;

import macronImg from '../images/macron.jpg';
import hollandeImg from '../images/hollande.jpg';
import sarkozyImg from '../images/sarkozy.jpg';
import chiracImg from '../images/chirac.jpg';
import mitterrandImg from '../images/mitterrand.jpg';
document.querySelector('img[alt="Emmanuel Macron"]').src = macronImg;
document.querySelector('img[alt="François Hollande"]').src = hollandeImg;
document.querySelector('img[alt="Nicolas Sarkozy"]').src = sarkozyImg;
document.querySelector('img[alt="Jacques Chirac"]').src = chiracImg;
document.querySelector('img[alt="François Mitterrand"]').src = mitterrandImg;


import { Toast } from 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.querySelector('#loadBtn');
  const toastEl = document.querySelector('#myToast');

  const toast = new Toast(toastEl, {
    delay: 4000, // 4 секунды
  });

  loadBtn.addEventListener('click', () => {
    toast.show();
  });
});

import { Modal, Popover } from 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.president-card'));
  const modalElement = document.getElementById('infoModal');
  const modal = new Modal(modalElement);
  const modalDescription = document.getElementById('modalDescription');

  // --- Тексты с popover для каждого президента ---
  const descriptions = {
    macron: `Эммануэль Макрон проводит политику
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Экономические реформы"
        data-bs-trigger="hover focus"
        data-bs-content="Пакет изменений в налоговой и трудовой системах для стимулирования бизнеса.">
        реформ
      </span>
      и активно продвигает
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Европейская интеграция"
        data-bs-trigger="hover focus"
        data-bs-content="Укрепление роли Франции в Европейском Союзе и развитие совместных инициатив.">
        интеграцию Европы
      </span>.`,
    
    hollande: `Франсуа Олланд сосредоточил внимание на
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Социальная политика"
        data-bs-trigger="hover focus"
        data-bs-content="Меры по поддержке безработных и повышению минимальной заработной платы.">
        социальной политике
      </span>
      и введении
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Налоги для богатых"
        data-bs-trigger="hover focus"
        data-bs-content="Временное повышение налогов для состоятельных граждан.">
        налогов для богатых
      </span>.`,
    
    sarkozy: `Николя Саркози проводил
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Пенсионная реформа"
        data-bs-trigger="hover focus"
        data-bs-content="Увеличение пенсионного возраста с 60 до 62 лет.">
        пенсионную реформу
      </span>
      и вел активную
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Внешняя политика"
        data-bs-trigger="hover focus"
        data-bs-content="Активное участие Франции в международных переговорах и военных миссиях.">
        внешнюю политику
      </span>.`,
    
    chirac: `Жак Ширак выступил против
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Война в Ираке"
        data-bs-trigger="hover focus"
        data-bs-content="Франция отказалась поддержать военную операцию США в 2003 году.">
        войны в Ираке
      </span>
      и поддерживал
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Сельское хозяйство"
        data-bs-trigger="hover focus"
        data-bs-content="Активно отстаивал интересы фермеров и развивал аграрные субсидии.">
        фермеров
      </span>.`,
    
    mitterrand: `Франсуа Миттеран провел масштабную
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Национализация"
        data-bs-trigger="hover focus"
        data-bs-content="Переход крупных предприятий и банков в собственность государства.">
        национализацию
      </span>
      и продвигал
      <span class="text-primary fw-semibold" data-bs-toggle="popover" title="Социальные реформы"
        data-bs-trigger="hover focus"
        data-bs-content="Увеличение социальных гарантий и развитие образования.">
        социальные реформы
      </span>.`
  };

  // --- Упорядоченные ID президентов ---
  const presidentOrder = ['macron', 'hollande', 'sarkozy', 'chirac', 'mitterrand'];
  let currentPresidentIndex = 0;

  // --- При клике по карточке ---
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const key = card.dataset.president;
      currentPresidentIndex = presidentOrder.indexOf(key);
      showPresidentInfo(key);
    });
  });

  // --- Функция показа президента ---
  function showPresidentInfo(key) {
    modalDescription.innerHTML = descriptions[key] || 'Информация отсутствует.';
    modal.show();

    // Инициализация popover внутри модалки
    setTimeout(() => {
      const popovers = document.querySelectorAll('[data-bs-toggle="popover"]');
      popovers.forEach(el => new Popover(el));
    }, 200);
  }

  // --- Переключение стрелками влево / вправо ---
  document.addEventListener('keydown', (e) => {
    // Проверяем, открыта ли модалка
    if (!document.body.classList.contains('modal-open')) return;

    if (e.key === 'ArrowRight') {
      // Следующий президент
      currentPresidentIndex = (currentPresidentIndex + 1) % presidentOrder.length;
      showPresidentInfo(presidentOrder[currentPresidentIndex]);
    }

    if (e.key === 'ArrowLeft') {
      // Предыдущий президент
      currentPresidentIndex = (currentPresidentIndex - 1 + presidentOrder.length) % presidentOrder.length;
      showPresidentInfo(presidentOrder[currentPresidentIndex]);
    }
  });

  // --- Исправление бага с блокировкой прокрутки ---
  modalElement.addEventListener('hidden.bs.modal', () => {
    document.body.classList.remove('modal-open');
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  });
});


