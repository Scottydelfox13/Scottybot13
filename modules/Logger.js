/*
Logger class for easy and aesthetically pleasing console logging 
*/
const winston = require('winston');
const moment = require("moment");


const config = {
    levels: {
        error: 0,
        warn: 1,
        debug: 2,
        info: 3,
        event: 4,
        cmd: 5,

    },
    colors: {
        error: 'bold red',
        debug: 'blue',
        warn: 'bold yellow',
        info: 'bold black whiteBG',
        cmd: 'bold white',
        event: 'bold underline green',

    }
};

winston.addColors(config.colors);

const custom = winston.format.printf((info) => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const custom1 = winston.format.printf((info) => {
    return `[${info.timestamp}]: ${info.message}`;
});

var cmdfilter = winston.format((info, opts) => {
    return info.level === 'cmd' ? info : false;
});

var eventfilter = winston.format((info, opts) => {
    return info.level === 'event' ? info : false;
});

var eventcmdfilter = winston.format((info, opts) => {
    return info.level === 'cmd' || info.level === 'event' ? info : false;
});

var infofilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});


var exceptionHandlers = [
    new(winston.transports.File)({
        name: 'Error Logs',
        filename: './logs/exceptions.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
    })
];

const transports = [
    new(winston.transports.Console)({
        level: 'cmd',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: winston.format.combine(
            winston.format(info => {
                info.level = info.level.toUpperCase();
                return info;
            })(),
            winston.format.timestamp({
                format: 'MMMM Do YYYY, h:mm:ss a'
            }),
            winston.format.colorize(),
            custom

        ),
    }),
     new(winston.transports.File)({
        name: 'combined logs',
        filename: './logs/combined.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
        colorize: false,
        level: 'cmd',
        maxSize: '128m',
        format: winston.format.combine(
	custom
        ),
    }),
    new(winston.transports.File)({
        name: 'cmd logs',
        filename: './logs/cmd.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
        colorize: false,
        level: 'cmd',
        maxSize: '128m',
        format: winston.format.combine(
            cmdfilter(),
            custom1
        ),
    }),
    new(winston.transports.File)({
        name: 'event logs',
        filename: './logs/event.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
        colorize: false,
        level: 'cmd',
        maxSize: '128m',
        format: winston.format.combine(
            eventfilter(),
            custom1
        ),
    }),
    new(winston.transports.File)({
        name: 'event and cmd logs',
        filename: './logs/event&cmd.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
        colorize: false,
        level: 'cmd',
        maxSize: '128m',
        format: winston.format.combine(
            eventcmdfilter(),
            custom1
        ),
    }),
        new(winston.transports.File)({
        name: 'info logs',
        filename: './logs/info.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
        colorize: false,
        level: 'cmd',
        maxSize: '128m',
        format: winston.format.combine(
            infofilter(),
            custom1
        ),
    }),
     new(winston.transports.File)({
        name: 'error logs',
        filename: './logs/errors.log',
        datePattern: 'MMMM Do YYYY, h:mm:ss a',
        colorize: false,
        level: 'warn',
        maxSize: '128m',
        format: winston.format.combine(
            custom1
        ),
    }),


];





const logger = module.exports = winston.createLogger({
    levels: config.levels,
    format: winston.format.combine(
		winston.format.timestamp({
                format: 'MMMM Do YYYY, h:mm:ss a'
            }),
		custom
	),
    transports: transports,
    exceptionHandlers: exceptionHandlers,
    level: 'cmd'
});
