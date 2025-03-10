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
