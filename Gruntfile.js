const { email, password, localPath, serverPath } = require('./private')

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
                    sourceMap: false,
                    target: 'es5',
                    rootDir: "src/"
                },
                src: ["src/*.ts"],
                outDir: 'dist/'
            }
        },
        'screeps': {
            options: {
                email: email,
                password: password,
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
                dest: localPath,
                filter: 'isFile'
            },
            server: {
                expand: true,
                cwd: 'dist',
                src: '**',
                dest: serverPath,
                filter: 'isFile'
            }
        },
        'watch': {
            default: {
                files: "src/*.*",
                tasks: ['clean', "ts", "screeps"]
            },
            local: {
                files: "src/*.*",
                tasks: ['clean', "ts", "copy:local"]
            },
            server: {
                files: "src/*.*",
                tasks: ['clean', "ts", "copy:server"]
            }
        }
    })
}