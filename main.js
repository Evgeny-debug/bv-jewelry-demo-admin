// ==========================================
// 1. API ФАСАД (Готовий до переходу на бекенд)
// ==========================================
const API = {
    get: (key, def) => {
        try {
            const d = localStorage.getItem(key);
            return d ? JSON.parse(d) : def;
        } catch (e) { return def; }
    },
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val))
};

// ==========================================
// 2. БАЗОВІ ДАНІ ТА ЛОКАЛІЗАЦІЯ
// ==========================================
const i18n = {
    uk: { m1: "Головна", m2: "Каталог", m4: "Контакти", m_order: "Замовити", m_atelier: "Замовити ексклюзив", cart_title: "Кошик", cart_subtotal: "Підсумок:", cart_checkout: "Оформити замовлення", cart_empty: "Ваш кошик порожній", in_stock: "В наявності", out_stock: "Немає", pre_order: "Під замовлення", login: "Увійти", register: "Зареєструватися", login_mob_title: "КАБІНЕТ", theme_mob: "Змінити тему", fav_title: "Улюблене", fav_empty: "Список порожній", btn_buy: "Купити", similar: "Також рекомендуємо", desc_title: "Опис виробу", search_ph: "Пошук..." },
    en: { m1: "Home", m2: "Catalog", m4: "Contacts", m_order: "Order", m_atelier: "Order Exclusive", cart_title: "Cart", cart_subtotal: "Subtotal:", cart_checkout: "Checkout", cart_empty: "Your cart is empty", in_stock: "In stock", out_stock: "N/A", pre_order: "Pre-order", login: "Log in", register: "Register", login_mob_title: "PROFILE", theme_mob: "Change Theme", fav_title: "Favorites", fav_empty: "List is empty", btn_buy: "Buy", similar: "You might also like", desc_title: "Description", search_ph: "Search..." },
    ru: { m1: "Главная", m2: "Каталог", m4: "Контакты", m_order: "Заказать", m_atelier: "Заказать эксклюзив", cart_title: "Корзина", cart_subtotal: "Итого:", cart_checkout: "Оформить заказ", cart_empty: "Ваша корзина пуста", in_stock: "В наличии", out_stock: "Нет", pre_order: "Под заказ", login: "Войти", register: "Регистрация", login_mob_title: "КАБИНЕТ", theme_mob: "Сменить тему", fav_title: "Избранное", fav_empty: "Список пуст", btn_buy: "Купить", similar: "Также рекомендуем", desc_title: "Описание изделия", search_ph: "Поиск..." }
};
const flags = { uk: "ua", en: "gb", ru: "ru" };

const sunSVG = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
const moonSVG = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
const formatterPrice = new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH', maximumFractionDigits: 0 });

// ==========================================
// 3. ГЕНЕРАТОР ДЕМО-ДАНИХ
// ==========================================
if (!API.get('bv_demo_installed_v2')) {
    const demoCats = [
        { id: 'rings', name: 'Каблучки', subcategories: [{id: 'engagement', name: 'Для заручин'}, {id: 'wedding', name: 'Обручки'}] },
        { id: 'earrings', name: 'Сережки', subcategories: [{id: 'studs', name: 'Пусети'}] },
        { id: 'chains', name: 'Ланцюжки', subcategories: [] },
        { id: 'bracelets', name: 'Браслети', subcategories: [] },
        { id: 'crosses', name: 'Хрестики', subcategories: [] }
    ];

    const demoImages = [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800',
        'https://images.unsplash.com/photo-1603561591411-071c4f75393c?q=80&w=800',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800'
    ];

    const demoProducts = [];
    const metals = ['Біле золото 585', 'Жовте золото 585', 'Червоне золото 585', 'Срібло 925'];
    
    for (let i = 1; i <= 50; i++) {
        const catObj = demoCats[i % demoCats.length];
        const isSale = i % 7 === 0;
        const price = Math.round((Math.random() * 45000 + 3000) / 100) * 100;
        
        demoProducts.push({
            id: `p${i}`,
            name: `${catObj.name} преміум #${i}`,
            variant: metals[i % metals.length],
            category: catObj.id,
            subcategory: catObj.subcategories.length > 0 ? catObj.subcategories[0].id : '',
            price: isSale ? Math.round(price * 0.8) : price, 
            discount: isSale ? price : '', 
            status: i % 12 === 0 ? 'out-stock' : (i % 9 === 0 ? 'pre-order' : 'in-stock'),
            badge: i % 6 === 0 ? 'new' : (isSale ? 'sale' : (i % 8 === 0 ? 'exclusive' : 'none')),
            isSpecial: i <= 8, 
            isWeekly: i > 8 && i <= 16, 
            featured: i % 5 === 0, 
            img: demoImages[i % demoImages.length],
            desc: "Вишуканий ювелірний виріб ручної роботи. Ідеально підкреслить ваш стиль та індивідуальність. Виконано з найвищою увагою до деталей та використанням преміальних матеріалів."
        });
    }

    const demoCollage = {
        template: 'grid-6',
        items: [
            { catId: 'rings', title: 'Каблучки', img: demoImages[0] },
            { catId: 'earrings', title: 'Сережки', img: demoImages[3] },
            { catId: 'bracelets', title: 'Браслети', img: demoImages[5] },
            { catId: 'chains', title: 'Ланцюжки', img: demoImages[4] },
            { catId: 'rings', title: 'Обручки', img: demoImages[1] },
            { catId: 'crosses', title: 'Ексклюзив', img: demoImages[2] }
        ]
    };

    const demoSettings = {
        heroBg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920',
        phone: '+38 063 45 40 901', tgLink: 'https://t.me/bv_jewelry_izmail', instLink: 'https://instagram.com/bv_jewelry',
        addr1: 'м. Ізмаїл, вул. Торгова, 68', map1: 'https://share.google/R7G0tiXeqXrx98Uhi',
        addr2: 'м. Ізмаїл, вул. Покровська, 57', map2: 'https://share.google/4fE0MoAJwCdCr4igT'
    };

    API.set('bv_categories_tree', demoCats);
    API.set('bv_products', demoProducts);
    API.set('bv_collage_config', demoCollage);
    API.set('bv_settings', demoSettings);
    API.set('bv_demo_installed_v2', true); 
}

let categoriesTree = API.get('bv_categories_tree', []);
let products = API.get('bv_products', []);

function getCategoryIconSVG(catId) {
    const id = catId.toLowerCase();
    if (id.includes('ring')) return `<circle cx="12" cy="15" r="5"/><path d="M12 10l-2-3h4l-2 3z"/>`; 
    if (id.includes('earring')) return `<circle cx="12" cy="16" r="3"/><path d="M12 4v9"/><path d="M9 4h6"/>`; 
    if (id.includes('chain') || id.includes('neck')) return `<circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M11 12h2"/>`; 
    if (id.includes('bracelet')) return `<ellipse cx="12" cy="12" rx="7" ry="3"/><path d="M5 12v2c0 2 3 3 7 3s7-1 7-3v-2"/>`; 
    if (id.includes('cross')) return `<path d="M12 4v16"/><path d="M8 9h8"/>`; 
    return `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/>`; 
}

// ==========================================
// 3.1 ГЕНЕРАТОР ТЕСТОВИХ ТОВАРІВ (+1000 шт)
// ==========================================
// Цей блок додає масив товарів для перевірки кнопки "Показати ще" та стрілки "Наверх"
if (products.length > 0 && products.length < 500) {
    const categories = ['rings', 'earrings', 'chains', 'bracelets', 'crosses'];
    const metals = ['Біле золото 585', 'Червоне золото 585', 'Срібло 925'];
    
    for (let i = 1; i <= 1000; i++) {
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        const randomMat = metals[Math.floor(Math.random() * metals.length)];
        const price = Math.floor(Math.random() * 40000) + 2000;
        
        products.push({
            id: `test_${i}`,
            name: `Ювелірний виріб #${i}`,
            variant: randomMat,
            category: randomCat,
            subcategory: '',
            price: price,
            discount: '', 
            status: 'in-stock',
            badge: i % 50 === 0 ? 'new' : 'none',
            img: `https://placehold.co/600x600/1a1a1a/c5a059?text=Product+${i}`,
            desc: "Тестовий товар для перевірки пагінації каталогу по 100 одиниць."
        });
    }
    // Оновлюємо API, щоб дані збереглися
    API.set('bv_products', products);
    console.log("Додано 1000 тестових товарів для перевірки пагінації.");
}

// ==========================================
// ТАКОЖ: Оновлюємо функцію changeLang у секції 4
// Додаємо виклик renderBatch для каталогу
// ==========================================
const originalChangeLang = window.changeLang;
window.changeLang = function(lang) {
    // Викликаємо оригінальну логіку
    if (typeof originalChangeLang === 'function') {
        // Якщо функція вже була визначена вище, вона виконається
    }
    
    // Специфічне оновлення для нашого каталогу з пагінацією
    if (typeof window.renderCatalogBatch === 'function') {
        // Ми не робимо reset:true, щоб користувач не втратив позицію скролу, 
        // просто перемальовуємо поточну пачку з новою мовою
        window.renderCatalogBatch(); 
    }
};

// ==========================================
// 4. ГЛОБАЛЬНІ ФУНКЦІЇ ІНТЕРФЕЙСУ
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
    API.set('bv_theme', newTheme);
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
    API.set('bv_lang', lang);
    
    window.renderCart();
    window.renderFavDrawer();
    
    // Перерендер товарів для оновлення перекладу статусів/кнопок
    if(document.getElementById('specialGrid') && typeof renderHomeSections === 'function') renderHomeSections();
    if(document.getElementById('productGrid') && typeof renderCatalogBatch === 'function') renderCatalogBatch(); 
    if(document.getElementById('productContainer') && typeof renderProductPage === 'function') renderProductPage();
    
    const mobLangList = document.getElementById('mobLangList');
    if(mobLangList && mobLangList.classList.contains('open')) window.toggleAccordion('mobLangList', 'mobLangArrow');
};

// ==========================================
// 5. КОШИК ТА УЛЮБЛЕНЕ (Drawers)
// ==========================================
window.toggleCart = function() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (!drawer || !overlay) return;

    if (!drawer.classList.contains('active')) {
        drawer.classList.add('active'); overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('active'); overlay.classList.remove('active');
        if (!document.getElementById('sideMenu')?.classList.contains('active')) document.body.style.overflow = '';
    }
};

window.addToCart = function(id, title, variant, price, img) {
    let cart = API.get('bv_cart', []);
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, title, variant, price, img, qty: 1 });
    API.set('bv_cart', cart);
    window.renderCart();
    if (!document.getElementById('cartDrawer').classList.contains('active')) window.toggleCart();
};

window.removeFromCart = function(id) {
    let cart = API.get('bv_cart', []);
    cart = cart.filter(item => item.id !== id);
    API.set('bv_cart', cart);
    window.renderCart();
};

window.renderCart = function() {
    let cart = API.get('bv_cart', []);
    const cartBody = document.getElementById('cartBody');
    const cartBadges = document.querySelectorAll('.cart-badge:not(.fav-badge)');
    const subtotalVal = document.querySelector('.cart-subtotal-val');
    let total = 0, totalQty = 0;
    
    if(!cartBody) return;
    cartBody.innerHTML = '';

    if (cart.length === 0) {
        const lang = API.get('bv_lang', 'uk');
        cartBody.innerHTML = `<div class="cart-empty-msg text-center text-[var(--text-muted)] mt-10">${i18n[lang].cart_empty}</div>`;
        if(subtotalVal) subtotalVal.innerText = formatterPrice.format(0);
        cartBadges.forEach(b => b.innerText = '0');
        return;
    }

    cart.forEach(item => {
        total += item.price * item.qty;
        totalQty += item.qty;
        cartBody.insertAdjacentHTML('beforeend', `
            <div class="cart-item flex gap-4 p-3 bg-white/5 border border-white/10 rounded-xl mb-3">
                <img src="${item.img}" class="w-20 h-20 object-cover rounded-lg border border-white/10">
                <div class="flex-grow flex flex-col justify-center">
                    <span class="text-sm font-semibold uppercase tracking-wide leading-tight">${item.title}</span>
                    <span class="text-xs text-[var(--text-muted)] mt-1">${item.variant}</span>
                    <span class="text-sm font-bold text-[var(--gold-muted)] mt-2">${formatterPrice.format(item.price)} <span class="text-[10px] text-gray-400 font-normal">x${item.qty}</span></span>
                </div>
                <button class="text-[var(--text-muted)] hover:text-red-500 transition p-2" onclick="removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        `);
    });
    if(subtotalVal) subtotalVal.innerText = formatterPrice.format(total);
    cartBadges.forEach(b => b.innerText = totalQty);
};

window.toggleFavDrawer = function() {
    const drawer = document.getElementById('favDrawer');
    const overlay = document.getElementById('favOverlay');
    if (!drawer) return;

    if (!drawer.classList.contains('active')) {
        window.renderFavDrawer();
        drawer.classList.add('active'); 
        if(overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('active'); 
        if(overlay) overlay.classList.remove('active');
        if (!document.getElementById('sideMenu')?.classList.contains('active')) document.body.style.overflow = '';
    }
};

window.toggleFav = function(id) {
    let favs = API.get('bv_favs', []);
    const idx = favs.indexOf(id);
    if(idx > -1) favs.splice(idx, 1); else favs.push(id);
    API.set('bv_favs', favs);
    
    // Оновлюємо іконки всюди, де є ця кнопка
    document.querySelectorAll(`.fav-btn-inline[data-id="${id}"]`).forEach(btn => {
        if(favs.includes(id)) {
            btn.classList.add('text-red-500');
            btn.classList.remove('text-gray-400', 'text-gray-500', 'border-white/20');
            if(btn.id === 'pd-fav-btn') btn.classList.add('border-red-500'); // Для сторінки товару
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
        } else {
            btn.classList.remove('text-red-500', 'border-red-500');
            btn.classList.add('text-gray-400');
            if(btn.id === 'pd-fav-btn') btn.classList.add('border-white/20');
            btn.querySelector('svg').setAttribute('fill', 'none');
        }
    });
    
    window.renderFavDrawer();
};

window.renderFavDrawer = function() {
    let favsIds = API.get('bv_favs', []);
    const allProducts = API.get('bv_products', []);
    const favBody = document.getElementById('favBody');
    const favBadges = document.querySelectorAll('.fav-badge');
    
    favBadges.forEach(b => b.innerText = favsIds.length);
    if(!favBody) return;

    if (favsIds.length === 0) {
        const lang = API.get('bv_lang', 'uk');
        favBody.innerHTML = `<div class="text-center text-[var(--text-muted)] mt-10" data-i18n="fav_empty">${i18n[lang].fav_empty || "Список порожній"}</div>`;
        return;
    }

    const favProducts = allProducts.filter(p => favsIds.includes(p.id));
    
    favBody.innerHTML = favProducts.map(prod => `
        <div class="cart-item flex gap-4 p-3 bg-white/5 border border-white/10 rounded-xl mb-3 relative pr-10 hover:bg-white/10 transition">
            <img src="${prod.img}" class="w-16 h-16 object-cover rounded-lg border border-white/10 cursor-pointer" onclick="location.href='product.html?id=${prod.id}'">
            <div class="flex-grow flex flex-col justify-center cursor-pointer" onclick="location.href='product.html?id=${prod.id}'">
                <span class="text-xs font-semibold uppercase tracking-wide line-clamp-1">${prod.name}</span>
                <span class="text-[10px] text-[var(--text-muted)] mt-1">${prod.variant}</span>
                <span class="text-sm font-bold text-[var(--gold-muted)] mt-1">${formatterPrice.format(prod.discount || prod.price)}</span>
            </div>
            <button class="absolute top-3 right-3 text-[var(--text-muted)] hover:text-red-500 transition" onclick="toggleFav('${prod.id}')" title="Видалити">
                <svg width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
        </div>
    `).join('');
};

// ==========================================
// 6. ГЛОБАЛЬНИЙ РЕНДЕР КАРТКИ ТОВАРУ
// ==========================================
window.renderProductCard = function(prod) {
    const lang = API.get('bv_lang', 'uk');
    const isOutOfStock = prod.status === 'out-stock';
    const isPreOrder = prod.status === 'pre-order';
    const isFav = API.get('bv_favs', []).includes(prod.id);
    
    let badgesHtml = '<div class="absolute top-3 left-3 flex flex-col gap-1 z-10">';
    if (isOutOfStock) badgesHtml += `<div class="bg-red-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Sold Out</div>`;
    else if (isPreOrder) badgesHtml += `<div class="bg-gray-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Під замовлення</div>`;

    if(prod.badge === 'new') badgesHtml += '<div class="bg-blue-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Новинка</div>';
    if(prod.badge === 'exclusive') badgesHtml += '<div class="bg-purple-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Ексклюзив</div>';
    if(prod.badge === 'sale') badgesHtml += '<div class="bg-rose-500/90 text-white text-[9px] px-2 py-1 rounded uppercase tracking-widest font-bold backdrop-blur-sm shadow-md">Sale</div>';
    badgesHtml += '</div>';

    let priceHtml = `<span class="text-[14px] md:text-[16px] font-bold text-[var(--gold-muted)]">${formatterPrice.format(prod.price)}</span>`;
    if (prod.discount && Number(prod.discount) > 0) {
        priceHtml = `<span class="text-[14px] md:text-[16px] font-bold text-[var(--success)]">${formatterPrice.format(prod.price)}</span><span class="text-[10px] md:text-[12px] text-[var(--text-muted)] line-through ml-2">${formatterPrice.format(prod.discount)}</span>`;
    }

    return `
        <div class="product-card group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
            ${badgesHtml}
            
            <a href="product.html?id=${prod.id}" class="relative w-full aspect-square overflow-hidden bg-black block">
                <img src="${prod.img}" class="product-img opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" loading="lazy">
            </a>
            
            <div class="p-3 md:p-4 flex flex-col gap-1 flex-grow">
                <a href="product.html?id=${prod.id}" class="text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--gold-muted)] transition">${prod.variant}</a>
                <a href="product.html?id=${prod.id}" class="text-[13px] md:text-[15px] font-medium text-[var(--text-main)] leading-snug hover:text-[var(--gold-muted)] transition line-clamp-2">${prod.name}</a>
                <div class="mt-2 mb-2 flex items-center">${priceHtml}</div>
            </div>

            <div class="px-3 md:px-4 py-3 border-t border-white/5 flex justify-between items-center mt-auto">
                ${!isOutOfStock ? `
                <button onclick="addToCart('${prod.id}', '${prod.name}', '${prod.variant}', ${prod.price}, '${prod.img}')" class="flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[var(--text-main)] hover:text-[var(--gold-muted)] transition group/btn">
                    <span>${i18n[lang].btn_buy}</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="transition-transform group-hover/btn:translate-x-1"><path d="M12 4v16m8-8H4"/></svg>
                </button>
                ` : `<span class="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500">${i18n[lang].out_stock}</span>`}
                
                <button class="fav-btn-inline ${isFav ? 'text-red-500' : 'text-gray-400 hover:text-white'} transition" data-id="${prod.id}" onclick="toggleFav('${prod.id}')" title="Улюблене">
                    <svg width="18" height="18" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
        </div>
    `;
};

// ==========================================
// 7. СТОРІНКА ТОВАРУ (product.html)
// ==========================================
window.renderProductPage = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Захист: якщо немає ID, перекидаємо на головну або каталог
    if(!productId) {
        window.location.href = 'index.html';
        return;
    }

    const allProducts = API.get('bv_products', []);
    const product = allProducts.find(p => p.id === productId);
    
    if(!product) {
        const container = document.getElementById('productContainer');
        if(container) container.innerHTML = `<div class="text-center py-32 text-2xl font-serif text-[var(--gold-muted)]">Товар не знайдено або він був видалений</div><div class="text-center mt-6"><a href="index.html" class="btn-order">На головну</a></div>`;
        return;
    }

    document.title = `${product.name} | BV Jewelry`;
    const lang = API.get('bv_lang', 'uk');

    const imgEl = document.getElementById('pd-img');
    const badgeEl = document.getElementById('pd-badges');
    const titleEl = document.getElementById('pd-title');
    const variantEl = document.getElementById('pd-variant');
    const priceEl = document.getElementById('pd-price');
    const statusEl = document.getElementById('pd-status');
    const descEl = document.getElementById('pd-desc');
    const addBtn = document.getElementById('pd-add-btn');
    const favBtn = document.getElementById('pd-fav-btn');

    if(imgEl) imgEl.src = product.img;
    if(titleEl) titleEl.innerText = product.name;
    if(variantEl) variantEl.innerText = product.variant;
    if(descEl) descEl.innerText = product.desc || "Опис відсутній.";
    
    if(priceEl) {
        if (product.discount && Number(product.discount) > 0) {
            priceEl.innerHTML = `<span class="text-3xl font-bold text-[var(--success)]">${formatterPrice.format(product.price)}</span> <span class="text-lg text-[var(--text-muted)] line-through ml-3">${formatterPrice.format(product.discount)}</span>`;
        } else {
            priceEl.innerHTML = `<span class="text-3xl font-bold text-[var(--gold-muted)]">${formatterPrice.format(product.price)}</span>`;
        }
    }

    if(statusEl) {
        if(product.status === 'out-stock') {
            statusEl.innerHTML = `<span class="text-red-500 font-bold uppercase tracking-widest text-xs border border-red-500 px-3 py-1 rounded inline-block">${i18n[lang].out_stock}</span>`;
            if(addBtn) {
                addBtn.style.opacity = '0.5';
                addBtn.style.cursor = 'not-allowed';
                addBtn.onclick = (e) => e.preventDefault();
                addBtn.querySelector('span').innerText = 'Немає в наявності';
            }
        } else if (product.status === 'pre-order') {
            statusEl.innerHTML = `<span class="text-gray-400 font-bold uppercase tracking-widest text-xs border border-gray-400 px-3 py-1 rounded inline-block">${i18n[lang].pre_order}</span>`;
            if(addBtn) setupAddToCartBtn(addBtn, product, lang);
        } else {
            statusEl.innerHTML = `<span class="text-green-500 font-bold uppercase tracking-widest text-xs border border-green-500 px-3 py-1 rounded inline-block">${i18n[lang].in_stock}</span>`;
            if(addBtn) setupAddToCartBtn(addBtn, product, lang);
        }
    }

    if(badgeEl && product.badge !== 'none') {
        let text = product.badge === 'new' ? 'Новинка' : (product.badge === 'sale' ? 'Sale' : 'Ексклюзив');
        let bgClass = product.badge === 'new' ? 'bg-blue-500' : (product.badge === 'sale' ? 'bg-red-500' : 'bg-purple-500');
        badgeEl.innerHTML = `<div class="${bgClass} text-white text-[10px] px-3 py-1 rounded uppercase tracking-widest font-bold inline-block">${text}</div>`;
    }

    if(favBtn) {
        favBtn.setAttribute('data-id', product.id);
        favBtn.classList.add('fav-btn-inline');
        
        const isFav = API.get('bv_favs', []).includes(product.id);
        if(isFav) {
            favBtn.classList.add('text-red-500', 'border-red-500');
            favBtn.classList.remove('text-gray-400', 'border-white/20');
            favBtn.querySelector('svg').setAttribute('fill', 'currentColor');
        }
        favBtn.onclick = () => toggleFav(product.id);
    }

    // Рендер сітки "Також рекомендуємо"
    const similarGrid = document.getElementById('similarGrid');
    if(similarGrid) {
        const similar = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);
        if(similar.length > 0) {
            similarGrid.innerHTML = similar.map(renderProductCard).join('');
        } else {
            document.getElementById('similarSection').style.display = 'none';
        }
    }
};

function setupAddToCartBtn(btn, product, lang) {
    btn.onclick = () => addToCart(product.id, product.name, product.variant, product.price, product.img);
    btn.querySelector('span').innerText = i18n[lang].btn_buy;
}

// ==========================================
// 8. ДИНАМІЧНА ГЕНЕРАЦІЯ МЕНЮ ТА КОЛАЖУ
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
                            <a href="product.html?id=${f.id}" class="preview-card">
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

            <a href="#" class="mob-menu-title" onclick="event.preventDefault(); window.toggleMenu(); window.toggleFavDrawer();">
                <span data-i18n="fav_title">Улюблене</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.7 7.8l1.1 1 7.7 7.8 7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            </a>
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
            </div>
        `;
        const savedLang = API.get('bv_lang', 'uk');
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
    
    const config = API.get('bv_collage_config', { template: 'grid-6', items: [] });
    collage.innerHTML = '';
    collage.className = 'art-collage ' + config.template;
    
    config.items.forEach((item, index) => {
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

// СЕКЦІЇ ТОВАРІВ НА ГОЛОВНІЙ
window.renderHomeSections = function() {
    if(document.getElementById('specialGrid')) {
        document.getElementById('specialGrid').innerHTML = products.filter(p => p.isSpecial).slice(0, 8).map(window.renderProductCard).join('');
    }
    if(document.getElementById('weeklyGrid')) {
        document.getElementById('weeklyGrid').innerHTML = products.filter(p => p.isWeekly).slice(0, 8).map(window.renderProductCard).join('');
    }
};

window.applyAdminSettings = function() {
    const settings = API.get('bv_settings', null);
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
};

// ==========================================
// 9. ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ
// ==========================================
window.onload = () => { 
    if(typeof generateMenus === 'function') generateMenus();
    if(typeof initMarquee === 'function') initMarquee();
    if(typeof renderHomeCollage === 'function') renderHomeCollage();
    
    // Рендер сіток для головної сторінки
    renderHomeSections();

    // Перевірка та рендер сторінки товару (якщо ми на product.html)
    if(document.getElementById('productContainer') && typeof renderProductPage === 'function') {
        renderProductPage();
    }

    const savedLang = API.get('bv_lang', 'uk');
    window.changeLang(savedLang);

    const savedTheme = API.get('bv_theme', 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('themeIcon');
    if(icon) icon.innerHTML = savedTheme === 'light' ? sunSVG : moonSVG;

    const yearEl = document.getElementById('currentYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    window.renderCart(); 
    window.renderFavDrawer();
    window.applyAdminSettings(); 

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
if(document.getElementById('favOverlay')) document.getElementById('favOverlay').onclick = window.toggleFavDrawer;