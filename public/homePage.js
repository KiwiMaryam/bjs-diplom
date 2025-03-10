"use strict"; // Включаем строгий режим

// Предполагаем, что класс LogoutButton уже определен в другом месте Вашего кода
const logoutButton = new LogoutButton();

// Назначаем действие для кнопки выхода
logoutButton.action = function() {
    // Вызываем метод logout из ApiConnector
    ApiConnector.logout((response) => {
        // Проверяем успешность запроса
        if (response.success) {
            // Если запрос успешен, обновляем страницу
            location.reload();
        }
    });
};


// Получение информации о текущем пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error("Ошибка получения данных пользователя:", response.error);
    }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function fetchCurrencyRates() {
    ApiConnector.getRates((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error("Ошибка получения курсов валют:", response.error);
        }
    });
}

// Вызов функции для получения текущих валют
fetchCurrencyRates();

// Установка интервала для обновления курсов валют раз в минуту
setInterval(fetchCurrencyRates, 60000);

