# Инструкция по установке

- Установить node.js с официального сайта
- Скачать зависимости (npm i)
- Запустить проект (npm start)

## PS

- Пришла идея, как можно было организовать код лучше. Можно было организовать код таким образом, чтобы  компонент Table.vue принимал в себя класс с методами Create, Update, Delete, ... Функционал методов будет отличаться для каждой сраницы, но, так как названия методов одинаковые, то можно:
   1) Избавиться от кода вроде if (mode === "employees"), а вместо этого изменить поведение класса Table.vue таким образом, чтобы в случае добавления новой страницы нам не пришлось менять его, а вместо этого создать новый класс с методами Create, Update, Delete, ... для текущей страницы
   2) Более удобным способом формировать поля для TablePopup.vue. Сейчас используется довольно костыльный метод, из-за которого данные преобразуются в более удобные для различных ситуаций
   3) В конечном коде сделать код более читабельным :)
