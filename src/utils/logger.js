export const log = (...args) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(...args);
    }
};

export const error = (...args) => {
    console.error(...args);
};

export const warn = (...args) => {
    // Mostrar solo en desarrollo
    if (process.env.NODE_ENV !== 'production') {
        console.warn(...args);
    }

};
