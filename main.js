// ==========================================
// 1. БАЗОВІ ДАНІ ТА ЛОКАЛІЗАЦІЯ
// ==========================================
const i18n = {
    uk: { m1: "Головна", m2: "Каталог", m4: "Контакти", m_order: "Замовити", m_atelier: "Замовити ексклюзив", cart_title: "Кошик", cart_subtotal: "Підсумок:", cart_checkout: "Оформити замовлення", cart_empty: "Ваш кошик порожній", in_stock: "В наявності", out_stock: "Немає в наявності", pre_order: "Під замовлення", login: "Увійти", register: "Зареєструватися", login_mob_title: "КАБІНЕТ", theme_mob: "Змінити тему" },
    en: { m1: "Home", m2: "Catalog", m4: "Contacts", m_order: "Order", m_atelier: "Order Exclusive", cart_title: "Cart", cart_subtotal: "Subtotal:", cart_checkout: "Checkout", cart_empty: "Your cart is empty", in_stock: "In stock", out_stock: "Out of stock", pre_order: "Pre-order", login: "Log in", register: "Register", login_mob_title: "PROFILE", theme_mob: "Change Theme" },
    ru: { m1: "Главная", m2: "Каталог", m4: "Контакты", m_order: "Заказать", m_atelier: "Заказать эксклюзив", cart_title: "Корзина", cart_subtotal: "Итого:", cart_checkout: "Оформить заказ", cart_empty: "Ваша корзина пуста", in_stock: "В наличии", out_stock: "Нет в наличии", pre_order: "Под заказ", login: "Войти", register: "Регистрация", login_mob_title: "КАБИНЕТ", theme_mob: "Сменить тему" }
};
const flags = { uk: "ua", en: "gb", ru: "ru" };

const sunSVG = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonSVG = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
const formatterPrice = new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 });

// ==========================================
// 2. ГЕНЕРАТОР ДЕМО-ДАНИХ (ЗАПОВНЕННЯ САЙТУ)
// ==========================================
if (!localStorage.getItem('bv_demo_installed_v1')) {
    const demoCats = [
        { id: 'rings', name: 'Каблучки', subcategories: [{id: 'engagement', name: 'Для заручин'}, {id: 'wedding', name: 'Обручки'}, {id: 'diamonds', name: 'З діамантами'}] },
        { id: 'earrings', name: 'Сережки', subcategories: [{id: 'studs', name: 'Пусети'}, {id: 'long', name: 'Довгі підвіски'}] },
        { id: 'chains', name: 'Ланцюжки', subcategories: [{id: 'womens', name: 'Жіночі'}, {id: 'mens', name: 'Чоловічі масивні'}] },
        { id: 'bracelets', name: 'Браслети', subcategories: [{id: 'hard', name: 'Жорсткі'}, {id: 'chain', name: 'Ланцюжкові'}] },
        { id: 'crosses', name: 'Хрестики', subcategories: [{id: 'classic', name: 'Класичні'}, {id: 'decorative', name: 'Декоративні'}] }
    ];

    const demoProducts = [
        // Каблучки
        { id: 'p1', name: 'Каблучка "Вічність" з діамантом', variant: 'Біле золото 585', category: 'rings', subcategory: 'engagement', price: 45000, discount: '', status: 'in-stock', badge: 'exclusive', featured: true, img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800' },
        { id: 'p2', name: 'Обручка класична 4мм', variant: 'Жовте золото 585', category: 'rings', subcategory: 'wedding', price: 12500, discount: 9500, status: 'in-stock', badge: 'sale', featured: true, img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800' },
        { id: 'p3', name: 'Каблучка-доріжка', variant: 'Рожеве золото 585', category: 'rings', subcategory: 'diamonds', price: 28000, discount: '', status: 'pre-order', badge: 'new', featured: false, img: 'https://images.unsplash.com/photo-1603561591411-071c4f75393c?q=80&w=800' },
        // Сережки
        { id: 'p4', name: 'Пусети з сапфірами', variant: 'Біле золото 585', category: 'earrings', subcategory: 'studs', price: 18000, discount: '', status: 'in-stock', badge: 'none', featured: true, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800' },
        { id: 'p5', name: 'Довгі сережки-протяжки', variant: 'Жовте золото 585', category: 'earrings', subcategory: 'long', price: 15400, discount: 13000, status: 'in-stock', badge: 'sale', featured: true, img: 'https://plus.unsplash.com/premium_photo-1681276170683-706111aee6cb?q=80&w=800' },
        // Ланцюжки
        { id: 'p6', name: 'Ланцюжок "Сінгапур"', variant: 'Червоне золото 585', category: 'chains', subcategory: 'womens', price: 8500, discount: '', status: 'in-stock', badge: 'none', featured: true, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800' },
        { id: 'p7', name: 'Масивний Бісмарк 65см', variant: 'Жовте золото 585', category: 'chains', subcategory: 'mens', price: 55000, discount: '', status: 'out-stock', badge: 'exclusive', featured: true, img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800' },
        // Браслети
        { id: 'p8', name: 'Жорсткий браслет Cartier Style', variant: 'Жовте золото 585', category: 'bracelets', subcategory: 'hard', price: 32000, discount: '', status: 'pre-order', badge: 'new', featured: true, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800' },
        // Хрестики
        { id: 'p9', name: 'Хрестик з емаллю', variant: 'Комбіноване золото', category: 'crosses', subcategory: 'decorative', price: 9200, discount: 8000, status: 'in-stock', badge: 'sale', featured: true, img: 'https://images.unsplash.com/photo-1597561847167-73d8463e2612?q=80&w=800' }
    ];

    const demoCollage = {
        template: 'grid-6',
        items: [
            { catId: 'rings', title: 'Каблучки', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800' },
            { catId: 'earrings', title: 'Сережки', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800' },
            { catId: 'bracelets', title: 'Браслети', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800' },
            { catId: 'chains', title: 'Ланцюжки', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800' },
            { catId: 'wedding', title: 'Обручки', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800' },
            { catId: 'crosses', title: 'Хрестики', img: 'https://energyprom.kz/wp-content/uploads/2023/10/nvidia_share_n7tt9hyzpa-min.png' }
        ]
    };

    const demoSettings = {
        heroBg: 'https://energyprom.kz/wp-content/uploads/2023/10/nvidia_share_n7tt9hyzpa-min.png',
        phone: '+38 063 45 40 901', tgLink: 'https://t.me/bv_jewelry_izmail', instLink: 'https://instagram.com/bv_jewelry',
        addr1: 'м. Ізмаїл, вул. Торгова, 68', map1: 'https://share.google/R7G0tiXeqXrx98Uhi',
        addr2: 'м. Ізмаїл, вул. Покровська, 57', map2: 'https://share.google/4fE0MoAJwCdCr4igT'
    };

    localStorage.setItem('bv_categories_tree', JSON.stringify(demoCats));
    localStorage.setItem('bv_products', JSON.stringify(demoProducts));
    localStorage.setItem('bv_collage_config', JSON.stringify(demoCollage));
    localStorage.setItem('bv_settings', JSON.stringify(demoSettings));
    localStorage.setItem('bv_demo_installed_v1', 'true');
}

// Завантажуємо дані з пам'яті
let categoriesTree = JSON.parse(localStorage.getItem('bv_categories_tree')) || [];
let products = JSON.parse(localStorage.getItem('bv_products')) || [];

// Автоматичні іконки для категорій
function getCategoryIconSVG(catId) {
    const id = catId.toLowerCase();
    if (id.includes('ring')) return `<circle cx="12" cy="15" r="5"/><path d="M12 10l-2-3h4l-2 3z"/>`; // Каблучка
    if (id.includes('earring')) return `<circle cx="12" cy="16" r="3"/><path d="M12 4v9"/><path d="M9 4h6"/>`; // Сережка
    if (id.includes('chain') || id.includes('neck')) return `<circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M11 12h2"/>`; // Ланцюжок
    if (id.includes('bracelet')) return `<ellipse cx="12" cy="12" rx="7" ry="3"/><path d="M5 12v2c0 2 3 3 7 3s7-1 7-3v-2"/>`; // Браслет
    if (id.includes('cross')) return `<path d="M12 4v16"/><path d="M8 9h8"/>`; // Хрестик
    return `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/>`; // Стандартна іконка
}

// ==========================================
// 3. ГЛОБАЛЬНІ ФУНКЦІЇ ІНТЕРФЕЙСУ
// ==========================================
window.toggleMenu = function() {
    const burger = document.getElementById('burger');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    if(burger) burger.classList.toggle('open');
    if(sideMenu) sideMenu.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
    document.body.style.overflow = (sideMenu && sideMenu.classList.contains('active')) ? 'hidden' : 'auto';
};

window.toggleAccordion = function(listId, arrowId) {
    const list = document.getElementById(listId);
    const arrow = document.getElementById(arrowId);
    if (!list) return;

    const isOpening = !list.classList.contains('open');

    if (isOpening) {
        const isTopLevel = list.classList.contains('mob-accordion-list');
        const openLists = isTopLevel ? document.querySelectorAll('.mob-accordion-list.open') : list.closest('.mob-accordion-list').querySelectorAll('.mob-nested-list.open');

        openLists.forEach(openList => {
            if (openList !== list) {
                openList.classList.remove('open');
                const title = openList.previousElementSibling;
                if (title && title.getAttribute('onclick')) {
                    const match = title.getAttribute('onclick').match(/'([^']+)',\s*'([^']+)'/);
                    if (match && match[2]) {
                        const oldArrow = document.getElementById(match[2]);
                        if (oldArrow) oldArrow.style.transform = 'rotate(0deg)';
                    }
                }
            }
        });
    }

    list.classList.toggle('open');
    if (arrow) arrow.style.transform = list.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
};

window.toggleTheme = function() {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('bv_theme', newTheme);
    const icon = document.getElementById('themeIcon');
    if(icon) icon.innerHTML = newTheme === 'light' ? sunSVG : moonSVG;
};

window.changeLang = function(lang) {
    const currentFlag = document.getElementById('currentFlag');
    const currentLangLabel = document.getElementById('currentLangLabel');
    const currentFlagMob = document.getElementById('currentFlagMob');
    const currentLangLabelMob = document.getElementById('currentLangLabelMob');

    if(currentFlag) currentFlag.src = `https://flagcdn.com/${flags[lang]}.svg`;
    if(currentLangLabel) currentLangLabel.innerText = lang.toUpperCase();
    if(currentFlagMob) currentFlagMob.src = `https://flagcdn.com/${flags[lang]}.svg`;
    if(currentLangLabelMob) currentLangLabelMob.innerText = lang.toUpperCase();
    
    document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = i18n[lang][el.dataset.i18n] || el.innerHTML);
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = i18n[lang][el.dataset.i18nPlaceholder] || el.placeholder);
    localStorage.setItem('bv_lang', lang);
    
    window.renderCart();
    
    const mobLangList = document.getElementById('mobLangList');
    if(mobLangList && mobLangList.classList.contains('open')) window.toggleAccordion('mobLangList', 'mobLangArrow');
};

// ==========================================
// 4. РОБОТА КОШИКА
// ==========================================
let cart = JSON.parse(localStorage.getItem('bv_cart')) || [];

window.addToCart = function(id, title, variant, price, img) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) existingItem.qty += 1;
    else cart.push({ id, title, variant, price, img, qty: 1 });
    window.renderCart();
    if (!document.getElementById('cartDrawer').classList.contains('active')) window.toggleCart();
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    window.renderCart();
};

window.toggleCart = function() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    const isOpening = !drawer.classList.contains('active');

    if (isOpening) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        const sideMenu = document.getElementById('sideMenu');
        if (!sideMenu || !sideMenu.classList.contains('active')) {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }
};

window.renderCart = function() {
    localStorage.setItem('bv_cart', JSON.stringify(cart));
    const cartBody = document.getElementById('cartBody');
    const cartBadges = document.querySelectorAll('.cart-badge');
    const subtotalVal = document.querySelector('.cart-subtotal-val');
    let total = 0, totalQty = 0;
    
    if(!cartBody) return;
    cartBody.innerHTML = '';

    if (cart.length === 0) {
        const lang = localStorage.getItem('bv_lang') || 'uk';
        cartBody.innerHTML = `<div class="cart-empty-msg">${i18n[lang].cart_empty}</div>`;
        if(subtotalVal) subtotalVal.innerText = formatterPrice.format(0);
        cartBadges.forEach(b => b.innerText = '0');
        return;
    }

    cart.forEach(item => {
        total += item.price * item.qty;
        totalQty += item.qty;
        cartBody.insertAdjacentHTML('beforeend', `
            <div class="cart-item">
                <img src="${item.img}" class="cart-item-img">
                <div class="cart-item-info">
                    <span class="cart-item-title">${item.title}</span>
                    <span class="cart-item-variant">${item.variant}</span>
                    <span class="cart-item-price">${formatterPrice.format(item.price)} <span style="font-size:10px; color:gray; font-weight:normal;">x${item.qty}</span></span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        `);
    });
    if(subtotalVal) subtotalVal.innerText = formatterPrice.format(total);
    cartBadges.forEach(b => b.innerText = totalQty);
};

// ==========================================
// 5. ДИНАМІЧНА ГЕНЕРАЦІЯ МЕНЮ ТА КОЛАЖУ
// ==========================================
function generateMenus() {
    const megaCol1 = document.querySelector('.mega-col-1');
    const megaMenu = document.querySelector('.mega-menu');
    const sideMenu = document.getElementById('sideMenu');
    
    // --- МЕГА-МЕНЮ (ДЛЯ ПК) ---
    if(megaCol1) {
        megaCol1.innerHTML = '';
        if(megaMenu) megaMenu.querySelectorAll('.mega-col-2').forEach(col => col.remove());
        const megaCol3 = document.querySelector('.mega-col-3');

        categoriesTree.forEach((cat, index) => {
            const isActive = index === 0 ? 'active' : ''; 
            const svgIcon = getCategoryIconSVG(cat.id);
            
            megaCol1.innerHTML += `<div class="mega-cat-item ${isActive}" data-target="mc-${cat.id}"><svg class="mega-cat-icon" viewBox="0 0 24 24">${svgIcon}</svg><span>${cat.name}</span></div>`;

            let subLinksHtml = '';
            if (cat.subcategories && cat.subcategories.length > 0) {
                cat.subcategories.forEach(sub => {
                    subLinksHtml += `<a href="catalog.html#${sub.id}" class="sub-cat-link">${sub.name}</a>`;
                });
            }
            subLinksHtml += `<a href="catalog.html#${cat.id}" class="view-all-link mt-auto pt-4">Усі товари →</a>`;

            if(megaMenu && megaCol3) {
                const newCol2 = document.createElement('div');
                newCol2.className = `mega-col-2 ${isActive}`;
                newCol2.id = `mc-${cat.id}`;
                newCol2.innerHTML = subLinksHtml;
                megaMenu.insertBefore(newCol2, megaCol3);
            }
        });

        megaCol1.innerHTML += `<a href="exclusive.html" class="mega-atelier-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7-7-7M5 12h14"/></svg><span data-i18n="m_atelier">Замовити ексклюзив</span></a>`;
        
        // Ховер для товарів
        document.querySelectorAll('.mega-cat-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                document.querySelectorAll('.mega-cat-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.mega-col-2').forEach(p => p.classList.remove('active'));
                item.classList.add('active');
                
                const targetId = item.getAttribute('data-target').replace('mc-', '');
                const targetCol = document.getElementById('mc-' + targetId);
                if(targetCol) targetCol.classList.add('active');
                
                if(megaCol3) {
                    const featured = products.filter(p => p.category === targetId && p.featured === true).slice(0, 2);
                    
                    if (featured.length === 0) {
                        megaCol3.innerHTML = `<div class="text-gray-500 text-sm text-center opacity-50 p-10 border border-dashed border-white/10 rounded-xl">Тут будуть показані популярні товари цієї категорії</div>`;
                    } else if (featured.length === 1) {
                        const f = featured[0];
                        megaCol3.innerHTML = `
                            <a href="catalog.html#${f.category}" class="preview-card">
                                <div class="preview-img-wrap"><img src="${f.img}"></div>
                                <div class="preview-info">
                                    <span class="preview-title mt-2">${f.name}</span>
                                    <span class="price-current">${formatterPrice.format(f.price)}</span>
                                </div>
                            </a>
                        `;
                    } else {
                        const f1 = featured[0]; const f2 = featured[1];
                        megaCol3.innerHTML = `
                            <a href="catalog.html#${f1.category}" class="preview-card" style="perspective: 1000px;">
                                <div class="preview-img-wrap" style="transform-style: preserve-3d; transition: transform 0.6s;">
                                    <img src="${f1.img}" class="absolute inset-0 w-full h-full object-cover z-10" style="backface-visibility: hidden;">
                                    <img src="${f2.img}" class="absolute inset-0 w-full h-full object-cover" style="transform: rotateY(180deg); backface-visibility: hidden;">
                                </div>
                                <div class="preview-info">
                                    <span class="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mt-2">Популярне</span>
                                    <span class="preview-title">${f1.name} / ${f2.name}</span>
                                </div>
                            </a>
                        `;
                        const card = megaCol3.querySelector('.preview-card');
                        const wrap = card.querySelector('.preview-img-wrap');
                        card.onmouseenter = () => wrap.style.transform = 'rotateY(180deg)';
                        card.onmouseleave = () => wrap.style.transform = 'rotateY(0deg)';
                    }
                }
            });
        });

        const firstCat = document.querySelector('.mega-cat-item');
        if(firstCat) firstCat.dispatchEvent(new Event('mouseenter'));
    }

    // --- МЕНЮ ДЛЯ МОБІЛЬНИХ ---
    if(sideMenu) {
        let mobCatHtml = '';
        categoriesTree.forEach(cat => {
            let mobSubLinksHtml = '';
            if (cat.subcategories && cat.subcategories.length > 0) {
                cat.subcategories.forEach(sub => {
                    mobSubLinksHtml += `<a href="catalog.html#${sub.id}" class="sub-cat-link" onclick="window.toggleMenu()">${sub.name}</a>`;
                });
            }
            mobSubLinksHtml += `<a href="catalog.html#${cat.id}" class="sub-cat-link mt-2" style="color: var(--gold-muted); font-weight: 500;" onclick="window.toggleMenu()">Усі товари →</a>`;

            mobCatHtml += `
                <div class="mob-nested-wrap">
                    <div class="mob-nested-title" onclick="window.toggleAccordion('mob-sub-${cat.id}', 'mob-arrow-${cat.id}')">
                        <div class="flex items-center gap-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="opacity-70">${getCategoryIconSVG(cat.id)}</svg> <span>${cat.name}</span></div>
                        <svg id="mob-arrow-${cat.id}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    <div class="mob-nested-list" id="mob-sub-${cat.id}">
                        <div class="mob-sub-links">${mobSubLinksHtml}</div>
                    </div>
                </div>
            `;
        });

        sideMenu.innerHTML = `
            <div style="position: relative; margin-bottom: 10px;">
                <input type="text" class="search-input mob-search-input" data-i18n-placeholder="search_ph" placeholder="Пошук..." style="width: 100%; font-size: 15px; padding: 12px 30px 12px 0; border-bottom-color: var(--gold-muted);">
                <svg class="search-icon" viewBox="0 0 24 24" style="bottom: 15px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>

            <a href="index.html" data-i18n="m1" class="mob-menu-title" onclick="window.toggleMenu()">Головна</a>
            <a href="exclusive.html" class="mob-atelier-link" onclick="window.toggleMenu()">
                <span data-i18n="m_atelier">Замовити ексклюзив</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>

            <div>
                <div class="mob-menu-title" onclick="window.toggleAccordion('mobCatList', 'mobCatArrow')">
                    <span data-i18n="m2">Каталог</span>
                    <svg id="mobCatArrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" stroke-width="2" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg>
                </div>
                <div class="mob-accordion-list" id="mobCatList" style="gap: 0; padding-left: 0;">
                    ${mobCatHtml}
                </div>
            </div>

            <a href="#footer" data-i18n="m4" class="mob-menu-title" onclick="window.toggleMenu()">Контакти</a>
            <div class="menu-divider"></div>

            <div class="mobile-settings-group">
                <div>
                    <div class="mob-menu-title" onclick="window.toggleAccordion('mobLangList', 'mobLangArrow')" style="font-size: 15px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="https://flagcdn.com/ua.svg" class="flag" id="currentFlagMob">
                            <span>МОВА:</span> <span id="currentLangLabelMob" style="font-weight: 600; color: var(--text-main);">UA</span>
                        </div>
                        <svg id="mobLangArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" stroke-width="2" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    <div class="mob-accordion-list" id="mobLangList" style="margin-top: 10px;">
                        <div class="dropdown-item" onclick="window.changeLang('uk')"><img src="https://flagcdn.com/ua.svg" class="flag"> UA</div>
                        <div class="dropdown-item" onclick="window.changeLang('en')"><img src="https://flagcdn.com/gb.svg" class="flag"> EN</div>
                        <div class="dropdown-item" onclick="window.changeLang('ru')"><img src="https://flagcdn.com/ru.svg" class="flag"> RU</div>
                    </div>
                </div>

                <div id="themeToggleMob" class="mobile-theme-toggle" onclick="window.toggleTheme()" style="font-size: 15px;">
                    <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    <span data-i18n="theme_mob">Змінити тему</span>
                </div>

                <div>
                    <div class="mob-menu-title" onclick="window.toggleAccordion('mobUserList', 'mobUserArrow')" style="font-size: 15px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.5;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span data-i18n="login_mob_title">КАБІНЕТ</span>
                        </div>
                        <svg id="mobUserArrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-muted)" stroke-width="2" class="transition-transform duration-300"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                    <div class="mob-accordion-list" id="mobUserList" style="margin-top: 10px;">
                        <a href="#login" class="dropdown-item" data-i18n="login" onclick="window.toggleMenu()">Увійти</a>
                        <div class="border-t border-[var(--border)] my-2"></div>
                        <a href="admin.html" class="dropdown-item" style="color: var(--gold-muted); opacity: 1; padding: 10px 20px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            Адмін-панель
                        </a>
                    </div>
                </div>
            </div>
        `;
        const savedLang = localStorage.getItem('bv_lang') || 'uk';
        document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = i18n[savedLang][el.dataset.i18n] || el.innerHTML);
    }
}

// ІНЕРЦІЙНИЙ СКРОЛ (Marquee)
window.initMarquee = function() {
    const track = document.getElementById('marqueeTrack');
    const wrapper = document.querySelector('.marquee-wrapper');
    if (!track || !wrapper) return;

    let items = categoriesTree.map(c => c.name);
    if(products.some(p => p.badge === 'new')) items.push('Новинки');
    if(products.some(p => p.badge === 'exclusive')) items.push('Ексклюзив');
    if(products.some(p => p.badge === 'sale')) items.push('Sale');
    if(items.length === 0) items = ['BV Jewelry', 'Atelier', 'Exclusive'];

    const repeated = [...items, ...items, ...items, ...items, ...items, ...items];
    track.innerHTML = repeated.map(text => `<span class="marquee-item">${text}</span>`).join('');

    let currentX = 0, velocity = 0, isDragging = false, prevX = 0;

    function applyPhysics() {
        if (!isDragging) {
            currentX += velocity;
            velocity *= 0.95; 
            if (Math.abs(velocity) < 0.1) currentX -= 0.5; 
        }
        if (currentX <= -track.scrollWidth / 2) currentX = 0;
        if (currentX > 0) currentX = -track.scrollWidth / 2;
        
        track.style.transform = `translateX(${currentX}px)`;
        requestAnimationFrame(applyPhysics);
    }

    const onStart = (x) => { isDragging = true; prevX = x; velocity = 0; };
    const onMove = (x) => { if (isDragging) { const delta = x - prevX; currentX += delta; velocity = delta; prevX = x; } };
    const onEnd = () => { isDragging = false; };

    wrapper.addEventListener('mousedown', e => onStart(e.clientX));
    window.addEventListener('mousemove', e => onMove(e.clientX));
    window.addEventListener('mouseup', onEnd);
    wrapper.addEventListener('mouseleave', onEnd);
    
    wrapper.addEventListener('touchstart', e => onStart(e.touches[0].clientX), {passive:true});
    window.addEventListener('touchmove', e => onMove(e.touches[0].clientX), {passive:true});
    window.addEventListener('touchend', onEnd);

    applyPhysics();
};

// КОЛАЖ НА ГОЛОВНІЙ
window.renderHomeCollage = function() {
    const collage = document.getElementById('art-collage');
    if (!collage) return;
    
    const config = JSON.parse(localStorage.getItem('bv_collage_config')) || { template: 'grid-6', items: [] };
    collage.innerHTML = '';
    collage.className = 'art-collage ' + config.template;
    
    const itemsToRender = config.items;

    itemsToRender.forEach((item, index) => {
        let gClass = 't-earrings'; 
        if(config.template === 'grid-6') {
            const classes = ['t-rings', 't-earrings', 't-bracelets', 't-neck', 't-wedding', 't-crosses'];
            gClass = classes[index % classes.length];
        } else if (config.template === 'grid-4') {
            gClass = 't-rings';
        }
        
        collage.innerHTML += `
            <div class="collage-tile ${gClass}" onclick="location.href='catalog.html#${item.catId}'">
                <img src="${item.img}" alt="${item.title}">
                <div class="collage-label">${item.title}</div>
            </div>
        `;
    });
    
    const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.collage-tile').forEach(el => observer.observe(el));
};

function applyAdminSettings() {
    const settings = JSON.parse(localStorage.getItem('bv_settings'));
    if (settings) {
        const heroBg = document.querySelector('.hero-img-bg');
        if (heroBg && settings.heroBg) heroBg.style.backgroundImage = `url('${settings.heroBg}')`;
        
        if (settings.phone) {
            document.querySelectorAll('.header-phone-link, .phone-num').forEach(link => { if(link) link.href = `tel:${settings.phone.replace(/\s+/g, '')}`; });
            document.querySelectorAll('.header-phone-text, .phone-num span').forEach(span => { if(span) span.innerText = settings.phone; });
        }
        if(settings.tgLink) document.querySelectorAll('.tg-link').forEach(link => link.href = settings.tgLink);
        if(settings.instLink) document.querySelectorAll('.inst-link').forEach(link => link.href = settings.instLink);
        if(settings.map1) { const link = document.querySelector('.addr-link-1'); if(link) link.href = settings.map1; }
        if(settings.addr1) { const txt = document.querySelector('.addr-text-1'); if(txt) txt.innerText = settings.addr1; }
        if(settings.map2) { const link = document.querySelector('.addr-link-2'); if(link) link.href = settings.map2; }
        if(settings.addr2) { const txt = document.querySelector('.addr-text-2'); if(txt) txt.innerText = settings.addr2; }
    }
}

// ==========================================
// 6. ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ
// ==========================================
window.onload = () => { 
    if(typeof generateMenus === 'function') generateMenus();
    if(typeof initMarquee === 'function') initMarquee();
    if(typeof renderHomeCollage === 'function') renderHomeCollage();
    
    const savedLang = localStorage.getItem('bv_lang') || 'uk';
    window.changeLang(savedLang);

    const savedTheme = localStorage.getItem('bv_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('themeIcon');
    if(icon) icon.innerHTML = savedTheme === 'light' ? sunSVG : moonSVG;

    const yearEl = document.getElementById('currentYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    if(typeof window.renderCart === 'function') window.renderCart(); 
    if(typeof applyAdminSettings === 'function') applyAdminSettings(); 

    const burgerBtn = document.getElementById('burger');
    if(burgerBtn) {
        burgerBtn.onclick = function(e) {
            e.stopPropagation();
            window.toggleMenu();
        };
    }
};

window.onscroll = () => {
    const header = document.getElementById('header');
    if(header) header.classList.toggle('scrolled', window.pageYOffset > 50);
};

if(document.getElementById('overlay')) document.getElementById('overlay').onclick = window.toggleMenu;
if(document.getElementById('cartOverlay')) document.getElementById('cartOverlay').onclick = window.toggleCart;
