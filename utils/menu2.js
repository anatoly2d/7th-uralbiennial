document.addEventListener('DOMContentLoaded', function() {
      const header = document.querySelector('.header');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      const navList = document.querySelector('.nav-list');
      const body = document.body;
      const navItems = document.querySelectorAll('.nav-list li');
      
      // Проверяем, внутренняя ли это страница
      const isInnerPage = body.classList.contains('inner-page');
      
      // Управление мобильным меню
      mobileToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navList.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Анимация пунктов меню
        if (!isExpanded) {
          navItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
          });
        } else {
          navItems.forEach(item => {
            item.style.transitionDelay = '0s';
          });
        }
      });
      
      // Закрытие меню при клике на ссылку
      document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.classList.remove('active');
          navList.classList.remove('active');
          body.classList.remove('menu-open');
        });
      });
      
      // Для главной страницы - добавляем обработчик скролла
      if (!isInnerPage) {
        body.classList.add('main-page');
        
        let lastScrollY = 0;
        let ticking = false;
        
        function updateHeader() {
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        }
        
        function handleScroll() {
          lastScrollY = window.scrollY;
          if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
          }
        }
        
        // Дебаунс для скролла
        function debounce(func, delay = 100) {
          let timeout;
          return function() {
            clearTimeout(timeout);
            timeout = setTimeout(func, delay);
          };
        }
        
        window.addEventListener('scroll', debounce(handleScroll));
      }
      
      // Фикс для Safari
      document.addEventListener('touchmove', function(e) {
        if (body.classList.contains('menu-open')) {
          e.preventDefault();
        }
      }, { passive: false });
    });