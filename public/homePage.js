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

// Создаем объект типа RatesBoard
const ratesBoard = new RatesBoard();

// Функция для получения курсов валют
function fetchCurrencyRates() {
    // Вызываем статический метод getRates из класса ApiConnector
    ApiConnector.getStocks((response) => {
        if (response.success) {
            // Очищаем таблицу и заполняем её новыми данными
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

