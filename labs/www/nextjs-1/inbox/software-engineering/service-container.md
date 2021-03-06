## InBox

-   В миру часто известен как IoC/DI-контейнер. Но есть гипотеза, что эти названия не отражают сути процесса. IoC - это скорее синоним DIP-принципа. А DI - сервисная необходимость для создания сложных объектов, которая может быть реализована и другим способом (особенно в языках не предлагающих рефлексии).
-   Основной ответственностью видится умение создавать объекты (factory).
-   Некоторое время назад мне казалось стройной и логичной идея разбиения работы с контейнером на две фазы - конструирование и непосредственно использование. Но чем плохо динамическое конструирование, когда в зависимости от внешних условий я могу реконфигурировать некоторые объекты (изменение настроек, добавление плагинов в run-time и т.п.)?
-   Хочется, чтобы контейнер ещё лучше обеспечивал реализацию DIP. Например, в базовом слое я определяю контракты, которые должны быть реализованы (скажем, контракты для бизнес-сервисов). После чего, конкретные инфраструктурные слои должны предоставить для них реализации. Такой подход также намного ближе к TDD, регистрации контрактов становятся аналогом теста инфраструктурного слоя на наличие нужных реализаций.
-   Разложить в качестве стартовой точки абстракции в .NET Standard, а потом можно пройтись по контейнерам из https://github.com/danielpalme/IocPerformance чтобы исследовать возможности и реализации.
-   Что может определять стратегию фабрики по созданию объекта? Интерфейс, ключ/дискриминатор, контекст?
