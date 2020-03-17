const config = require('./private')

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-ts")
    grunt.loadNpmTasks("grunt-screeps")
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.initConfig({
        'ts': {
            default : {
                options: {
                    sourceMap: true,
                    target: 'es5',
                    rootDir: "src/"
                },
                src: ["src/*.ts"],
                outDir: 'dist/'
            }
        },
        'screeps': {
            options: {
                email: config.email,
                password: config.password,
                branch: "default",
                ptr: false
            },
            dist: {
                src: ['dist/*.{js,wasm}']
            }
        },
        'clean': {
            build: [ 'dist/*' ]
        },
        'copy': {
            local: {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: config.localPath,
                filter: 'isFile'
            },
            rpi: {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: config.rpiPath,
                filter: 'isFile'
            },
            server: {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: config.serverPath,
                filter: 'isFile'
            },
            default: {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: config.defaultPath,
                filter: 'isFile'
            }
        },
        'watch': {
            remote: {
                files: "src/*.ts",
                tasks: ['clean', "ts", "screeps"]
            },
            local: {
                files: "src/*.ts",
                tasks: ['clean', "ts", "copy:local"]
            },
            rpi: {
                files: "src/*.ts",
                tasks: ['clean', "ts", "copy:rpi"]
            },
            server: {
                files: "src/*.ts",
                tasks: ['clean', "ts", "copy:server"]
            },
            default: {
                files: "src/*.ts",
                tasks: ['clean', "ts", "copy:default"]
            }
        }
    })
}