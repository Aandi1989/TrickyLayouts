"use strict"

// Получаем массив элементов
const menuLinksWrappers = document.querySelectorAll('[data-line-effect]');
// Если есть элементы, запускаем функцию
menuLinksWrappers.length ? menuEffect() : null;

// Основная ффункция
function menuEffect() {
    // Перебор элементов и поиск пунктов меню
    menuLinksWrappers.forEach(menuLinksWrapper => {
        const menuLinks = menuLinksWrapper.querySelectorAll('a');
        // Получаем скорость эффекта (ms)
        const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;
        // Если есть пункты меню, запускаем функцию
        menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
    });

    function menuEffectItem(menuLinks, effectSpeed){
        // Перечисление констант со стилями разных положений
        const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
        const effectHover = `transform: translate3d(0px, 0%, 0px);`;
        const effectTop = `transform: translate3d(0px, -100%, 0px);`;
        const effectBottom = `transform: translate3d(0px, 100%, 0px);`;

        // Перебор элементов и добавление HTML-кода для работы эффекта
        menuLinks.forEach(menuLink => {
            menuLink.insertAdjacentHTML('beforeend', `
            <span style="transform: translate3d(0px, 100%, 0px);" class="hover">
                <span style="transform: translate3d(0px, -100%, 0px);" class="hover__text">${menuLink.textContent}</span>
            </span>
            `);
            // При позникновении события наведения и перемещении курсора вызываем функции menuLinkActions()
            menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;

        });

        // Функция события курсора
        function menuLinkActions(e) {
            // Константы элементов
            const menuLink = e.target;
            const menuLinkItem = menuLink.querySelector('.hover');
            const menuLinkText = menuLink.querySelector('.hover__text');

            // Получение половины высоты элемента
            const menuLinkHeight = menuLink.offsetHeight / 2;
            // Получение позиции курсора при взаимодействии с элементом
            const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);

            // При наведении курсора
            if(e.type === 'mouseenter'){
                // Взависимости от позиции курсора добавляем определенные стили
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;

                // C определенной задержкой сменяем стили и отображаем эффект
                setTimeout(() => {
                    menuLinkItem.style.cssText = effectHover + effectTransition;  
                    menuLinkText.style.cssText = effectHover + effectTransition; 
                    
                }, 5);
                
            }
            // При перемещении курсора
            if(e.type === 'mouseleave') {
                // В зависимости от позиции курсора добавляем определенные стили
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
            }
        }
    }
}