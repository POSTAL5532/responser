const fileSystem = require("fs");
const {argv} = require('node:process');

let IS_PRODUCTION_MODE = argv.indexOf("prod") >= 0;
const NEWLINE_EXPRESSION = /\r?\n/g;
const REFERENCE_EXPRESSION = /%%|%([^%*$]+)%|%|\*\*|\*([^%*$]+)\*|\*|\$\$|\$([^%*$]+)\$|\$/g;

const iterateVariables = (text, callback) => {
    const lines = text.split(NEWLINE_EXPRESSION);
    for (let i = 0; i < lines.length; ++i) {
        const line = lines[i];
        if (line) {
            const index = line.indexOf('=');
            if (index !== -1) {
                const name = line.substring(0, index);
                if (name) {
                    const value = line.substring(index + 1);
                    callback(name, value, i);
                }
            }
        }
    }
};

const readVariables = (path, constants = {}) => {
    const text = fileSystem.readFileSync(path, 'utf-8');
    const variables = [];
    const environment = process.env;

    iterateVariables(text, (name, value, index) => {
        const action = (match, group1, group2, group3) => {
            switch (match) {
                case '%':
                    throw new Error(
                        `Incorrect '%' character usage in 'name=${value}' line (line number: ${index + 1}).`);
                case '*':
                    throw new Error(
                        `Incorrect '*' character usage in 'name=${value}' line (line number: ${index + 1}).`);
                case '$':
                    throw new Error(
                        `Incorrect '$' character usage in 'name=${value}' line (line number: ${index + 1}).`);
                case '%%':
                    return '%';
                case '**':
                    return '*';
                case '$$':
                    return '$';
                default:
                    switch (match[0]) {
                        case '%': {
                            const constant = constants[group1];
                            if (constant) {
                                return constant();
                            }
                            throw new Error(`Unknown '%${group1}%' environment constant.`);
                        }
                        case '*': {
                            const variable = environment[group2];
                            if (variable == null) {  // null or undefined
                                throw new Error(`Unknown '%${group2}%' environment variable.`);
                            }
                            return variable;
                        }
                        case '$': {
                            const variable = variables[group3];
                            if (variable == null) {  // null or undefined
                                throw new Error(`Unknown '$${group3}$' environment variable.`);
                            }
                            return variable;
                        }
                        default:
                            throw new Error(`Unknown constant/variable type.`);
                    }
            }
        };
        variables[name] = value.replace(REFERENCE_EXPRESSION, action);
    });
    return variables;
};

exports.initializeVariables = (constants = null) => {
    const variables = readVariables(IS_PRODUCTION_MODE ? "prod.env" : "dev.env", constants);
    const keys = Object.keys(variables);

    for (const key of keys) {
        process.env[key] = variables[key];
    }
};