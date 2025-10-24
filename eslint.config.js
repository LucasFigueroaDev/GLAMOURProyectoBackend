import eslintPluginImport from 'eslint-plugin-import';

export default [
    {
        // Configuración de ESLint para detectar errores de rutas y capitalización en Módulos ES
        // Este es el formato 'Flat Config' requerido por ESLint v9+.

        // 1. Archivos a los que se aplica esta configuración
        files: ['**/*.js'],

        // 2. Opciones de Parser
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            globals: {
                // Aquí puedes definir variables globales si las usas (ej. 'process')
                // process: 'readonly'
            }
        },

        // 3. Plugins y Extends
        plugins: {
            import: eslintPluginImport,
        },

        // Reglas extendidas (eslint:recommended)
        // Note: 'extends' se usa diferente en Flat Config, usaremos las reglas directamente
        // que vienen del plugin 'eslint/conf/eslint-recommended'
        rules: {
            // Reglas generales (equivalentes a 'eslint:recommended')
            ...eslintPluginImport.configs.recommended.rules,

            // Obliga a usar la extensión '.js' en los 'import' (VITAL para Vercel/Node ES Modules)
            'import/extensions': [
                'error',
                'always',
                {
                    js: 'always', // Solo aplica la regla a archivos .js
                    ignorePackages: true // Ignora las importaciones de paquetes
                } 
            ],

            // Detecta importaciones que no pueden resolverse (ej: ruta o nombre de archivo incorrecto)
            // **ESTO ES CLAVE PARA DETECTAR LA CAPITALIZACIÓN**
            'import/no-unresolved': [
                'error',
                { commonjs: true, caseSensitive: true } // VITAL: Fuerza la sensibilidad a mayúsculas
            ],

            // Otras reglas si son necesarias (opcional)
            'no-unused-vars': 'warn',
            'no-console': 'warn',
        },

        // 4. Configuración del Plugin 'import' para rutas
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js']
                }
            }
        }
    }
];
