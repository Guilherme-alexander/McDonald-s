document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU MOBILE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu ul');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (navToggle) {
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // ===== HEADER SCROLL =====
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== FORMULÁRIO =====
    const form = document.getElementById('orderForm');
    const messageDiv = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = this.querySelector('input[name="nome"]')?.value?.trim();
            const endereco = this.querySelector('input[name="endereco"]')?.value?.trim();
            const telefone = this.querySelector('input[name="telefone"]')?.value?.trim();

            if (!nome || !endereco || !telefone) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            const submitBtn = this.querySelector('.btn-submit-form');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showMessage('Pedido enviado com sucesso! 🎉 Em breve entraremos em contato.', 'success');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                submitBtn.style.background = 'linear-gradient(135deg, #2eb113, #44d30b)';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }

    function showMessage(text, type) {
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.className = 'form-message ' + type;
            messageDiv.style.display = 'block';

            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 6000);
        }
    }

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.flex-mosaico, .info-card, .map-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ===== MÁSCARA PARA TELEFONE =====
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            let formatted = '';
            if (value.length > 0) {
                if (value.length <= 2) {
                    formatted = `(${value}`;
                } else if (value.length <= 6) {
                    formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            this.value = formatted;
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== PARALLAX =====
    const bgSection = document.querySelector('.bg');
    if (bgSection) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.pageYOffset;
            if (scrollPos < 800 && window.innerWidth > 768) {
                bgSection.style.backgroundPositionY = (scrollPos * 0.3) + 'px';
            }
        });
    }

    console.log('🍔 McDonald\'s - Site modernizado com sucesso!');
});