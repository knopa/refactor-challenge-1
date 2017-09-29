export const successAction = (text) => {
    return {
        type: 'ADD_NOTIFICATION_MIDDLEWARE',
        callNotification: true,
        text: text,
        id: new Date().getTime(),
        level: 'success'
    };
};

export const errorAction = (text) => {
    return {
        type: 'ADD_NOTIFICATION_MIDDLEWARE',
        callNotification: true,
        text: text,
        id: new Date().getTime(),
        level: 'error'
    };
};

export const errorByTypeAction = (type, error) => {
    switch (type) {
        case 'SIGNIN_USER':
            return {
                type: 'ERRORS_SIGNIN_USER',
                message: error
            };
        case 'SIGNUP_USER':
            return {
                type: 'ERRORS_SIGNUP_USER',
                message: error
            };
        case 'FORGET':
            return {
                type: 'ERRORS_FORGET_PASSWORD',
                message: error
            };
    }
};
