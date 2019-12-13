export default {
    bookedServices: {
        title: 'Заказанные услуги',
        total: 'Всего',
        error: 'Ошибка',
        errorDescription: 'Не удалось загрузить заказанные услуги.',
    },
    dashboard: {
        stand: 'Ваш стенд',
        deadlineWarning: 'Приближается крайний срок подачи информации',
        deadlineError: 'Сегодня крайний срок подачи информации',
    },
    login: {
        login: 'Войти',
        username: 'Пользователь',
        password: 'Пароль',
        messages: {
            username: 'Пожалуйста, введите пользователя!',
            password: 'Пожалуйста, введите пароль!',
            error: 'Неправильный логин или пароль',
        },
    },
    menu: {
        dashboard: 'Главная',
        deadlines: 'Крайние сроки',
        logout: 'Выйти',
    },
    contacts: 'Контакты',
    units: {
        'sq.m.': '㎡',
        pcs: 'шт',
        'kW/220V': 'ед',
        hour: 'час',
    },
    catalogue: {
        title: 'Официальный каталог выставки',
        save: 'Сохранить',
        cancel: 'Отмена',
        editButton: 'Изменить',
        contacts: 'Контактная информация',
        services: 'Услуги',
        logo: 'Логотип',
        logoExtra: 'Изображение в формате PNG, максимум 150Кб',
        logoVector: 'Логотип (векторный)',
        logoVectorExtra:
            'Векторное изображение в форматах AI, CDR, EPS или SVG',
        selectFile: 'Выберите файл',
        nameRu: 'Название компании (русский)',
        nameEn: 'Название компании (английский)',
        descriptionRu: 'Описание деятельности (русский)',
        descriptionRuExtra: 'максимум 1000 знаков',
        descriptionEn: 'Описание деятельности (английский)',
        descriptionEnExtra: 'максимум 1000 знаков',
        country: 'Страна',
        cityRu: 'Город (русский)',
        cityEn: 'Город (английский)',
        website: 'Вебсайт',
        tel: 'Телефон',
        email: 'E-mail',
        countryNotFound: 'Нет совпадений',
        countryPlaceholder: 'Выберите страну',
        tooltips: {
            deleteLogoIcon: 'Удалить логотип и выбрать другой',
            downloadLogoIcon: 'Скачать логотип',
        },
        messages: {
            required: 'Пожалуйста, заполните поле',
            nameRequired: 'Пожалуйста, заполните название',
            descriptionRequired: 'Пожалуйста, заполните описание',
            descriptionMaxLength: 'Максимальное количество знаков: 1000',
            logoRequired: 'Пожалуйста, укажите логотип',
            logoSize: 'Файл должен быть меньше 150Кб',
            logoType: 'Файл должен быть формата PNG',
            logoVectorType: 'Файл должен быть формата AI, CDR, EPS или SVG',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
            deleteLogoConfirm: 'Уверены, что хотите удалить логотип?',
            deleteLogoConfirmOk: 'Да',
            deleteLogoConfirmCancel: 'Нет',
        },
    },
    contractor: {
        title: 'Согласование застройщика',
        name: 'Застройщик',
        inn: 'ИНН застройщика',
        contact: 'Контактное лицо застройщика',
        email: 'E-mail застройщика',
        tel: 'Телефон застройщика',
        send: 'Отправить',
        messages: {
            required: 'Пожалуйста, заполните поле',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
        },
        status: {
            waiting: 'Ожидает согласования',
            approved: 'Согласован',
        },
    },
    electricity: {
        title: 'Электричество на стенд',
        serviceShellScheme: 'Дополнительное электропитание',
        serviceSpaceOnly: 'Электропитание',
        servicePlaceholder: 'Выберите значение',
        save: 'Сохранить',
        afterDeadlineNotice:
            'Если не выбрано электропитание, то после {deadline} будет предоставляться максимальная мощность в {value} кВт.',
        messages: {
            required: 'Пожалуйста, заполните поле',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
        },
    },
    additionalEquipment: {
        title: 'Дополнительное оборудование',
        itemCode: 'код {code}',
        booked: {
            title: 'Заказанное оборудование',
            save: 'Сохранить',
            empty: 'Нет заказанного оборудования',
            allRemoved: 'Вы удалили все оборудование',
        },
        available: {
            title: 'Доступное оборудование',
            filter: 'Поиск оборудования',
            orderButton: 'Заказать',
            booked: 'Заказано',
        },
        messages: {
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
        },
    },
    badges: {
        title: 'Бейджи',
        save: 'Сохранить',
        cancel: 'Отмена',
        quotaMessage: 'Ваша бесплатная квота бейджей: {quota} шт.',
        totalCount: 'Всего бейджей: {count}',
        totalAmount: 'На сумму: €{total}',
        price: 'Стоимость одного бейджа: €{price}',
        noBadges: 'У вас еще нет бейджей',
        addBadge: 'Добавить бейдж участника',
        guestValue: 'Количество гостевых браслетов',
        form: {
            firstName: 'Имя',
            lastName: 'Фамилия',
            country: 'Страна',
            countryNotFound: 'Нет совпадений',
            countryPlaceholder: 'Выберите страну',
            remove: 'Удалить',
        },
        messages: {
            required: 'Пожалуйста, заполните поле',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
            removeConfirm: 'Уверены, что хотите удалить бейдж?',
            removeConfirmOk: 'Да',
            removeConfirmCancel: 'Нет',
        },
    },
    autoPass: {
        title: 'Пропуска на а/м к монтажным воротам',
        description:
            'Пропуск дает право подъезда к монтажным воротам 10 сентября с 8:00 до 12:00, 13 сентября с 18:00 до 20:00, 14 сентября с 8:00 до 10:00.',
        noPasses: 'У вас еще нет пропусков',
        totalCount: 'Всего пропусков: {count}',
        totalAmount: 'На сумму: €{total}',
        addPass: 'Добавить пропуск',
        regNum: 'Регистрационный номер а/м',
        fullName: 'ФИО водителя',
        carModel: 'Марка автомобиля',
        passport: 'Паспортные данные',
        passportDescription: 'Серия, номер, кем выдан',
        passType: 'Категория пропуска',
        save: 'Сохранить',
        cancel: 'Отмена',
        remove: 'Удалить',
        messages: {
            required: 'Пожалуйста, заполните поле',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
            removeConfirm: 'Уверены, что хотите удалить пропуск?',
            removeConfirmOk: 'Да',
            removeConfirmCancel: 'Нет',
        },
    },
    personalPass: {
        title: 'Персональные пропуска',
        noPasses: 'У вас еще нет пропусков',
        totalCount: 'Всего пропусков: {count}',
        passCost: 'Стоимость пропуска: €{price}',
        totalAmount: 'На сумму: €{total}',
        addPass: 'Добавить пропуск',
        pass: 'Персональный пропуск',
        vest: 'Светосигнальный жилет',
        fullName: 'ФИО участника',
        passport: 'Паспортные данные',
        passportDescription: 'Серия, номер, кем выдан',
        save: 'Сохранить',
        cancel: 'Отмена',
        remove: 'Удалить',
        messages: {
            required: 'Пожалуйста, заполните поле',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
            removeConfirm: 'Уверены, что хотите удалить пропуск?',
            removeConfirmOk: 'Да',
            removeConfirmCancel: 'Нет',
        },
    },
    vipParking: {
        title: 'ВИП-стоянка',
        description:
            'VIP пропуск на автомобиль действителен на весь период выставки. Количество мест на ВИП-паркинге ограничено. Организатор оставляет за собой право прекратить продажу мест на ВИП парковке после ее заполнения.',
        save: 'Сохранить',
        available: 'Доступно пропусков для заказа: {available}',
        inputExtra: 'Укажите количество пропусков',
        messages: {
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
        },
    },
    additionalServices: {
        title: 'Дополнительные услуги',
        noAvailableServices: 'Нет доступных услуг',
        date: 'Дата',
        booked: {
            title: 'Заказанные услуги',
            save: 'Сохранить',
            empty: 'Нет заказанных услуг',
            allRemoved: 'Вы удалили все услуги',
        },
        available: {
            title: 'Доступные услуги',
            orderButton: 'Заказать',
        },
        messages: {
            required: 'Пожалуйста, заполните поле',
            saveSuccess: 'Данные успешно сохранены!',
            saveError: 'Что-то пошло не так, повторите позже',
        },
    },
};
