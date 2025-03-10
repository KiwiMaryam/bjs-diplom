// "use strict"; // Включаем строгий режим

// class UserForm {
//     constructor() {
//         this.loginFormCallback = this.loginFormAction.bind(this);
//         this.registerFormCallback = this.registerFormAction.bind(this);
//     }

//     loginFormAction(data) {
//         ApiConnector.login(data, (response) => {
//             console.log(response); // Логируем ответ сервера
//             if (response.success) {
//             } else {
//                 alert(`Ошибка авторизации: ${response.error}`); // Выводим ошибку
//             }
//         });
//     }

//     registerFormAction(data) {
//         ApiConnector.register(data, (response) => {
//             console.log(response); // Логируем ответ сервера
//             if (response.success) {
//             } else {
//                 alert(`Ошибка регистрации: ${response.error}`); // Выводим ошибку
//             }
//         });
//     }
// }

"use strict"; // Включаем строгий режим

// Создаем объект класса UserForm
// const userForm = new UserForm();

// Присваиваем свойству loginFormCallback функцию
userForm.loginFormCallback = function(data) {
    // Выполняем запрос на сервер для авторизации
    ApiConnector.login({ login: data.login, password: data.password }, (response) => {
        console.log(response); // Смотрим, что возвращает сервер

        // Проверяем успешность запроса
        if (response.success) {
            // Если успешный запрос, обновляем страницу
            location.reload();
        } else {
            // В случае ошибки выводим сообщение
            alert(response.error || "Ошибка авторизации");
        }
    });
};

// Присваиваем свойству registerFormCallback функцию
userForm.registerFormCallback = function(data) {
    // Выполняем запрос на сервер для регистрации
    ApiConnector.register({ login: data.login, password: data.password }, (response) => {
        console.log(response); // Смотрим, что возвращает сервер

        // Проверяем успешность запроса
        if (response.success) {
            // Если успешный запрос, обновляем страницу
            location.reload();
        } else {
            // В случае ошибки выводим сообщение
            alert(response.error || "Ошибка регистрации");
        }
    });
};

