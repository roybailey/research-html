module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-if-missing');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            vD3: "3.5.7",
            vUnderscore: "1.8.3",
            vLoDash: "3.10.1",
            vShowdown: "0.3.1",
            vJQuery: "2.1.4",
            vJQueryUI: "1.11.4",
            vBabel:"6.0.20",
            vReact: "0.14.2",
            vReactRedux: "4.0.0",
            vKnockout: "3.3.0",
            vSammy: "0.7.6",
            vClipboard: "1.5.3",
            vUIKit: "2.23.0",
            vSigma: "1.0.3",
            vCytoscape: "2.5.0",
            vAlchemy: "0.4.1",
            vLinkurious: "1.3.0",

            curl: {
                'd3': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/<%= vD3 %>/d3.min.js',
                    dest: 'public/_assets/d3/<%= vD3 %>/d3.min.js'
                },
                'd3plus': {
                    src: "http://d3plus.org/d3plus.zip",
                    dest: 'public/_assets/d3plus.zip'
                },
                'underscore': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/<%= vUnderscore %>/underscore-min.js',
                    dest: 'public/_assets/underscore/<%= vUnderscore %>/underscore-min.js'
                },
                'lodash': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/<%= vLoDash %>/lodash.min.js',
                    dest: 'public/_assets/lodash/<%= vLoDash %>/lodash-min.js'
                },
                'showdown': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/showdown/<%= vShowdown %>/showdown.min.js',
                    dest: 'public/_assets/showdown/<%= vShowdown %>/showdown.min.js'
                },
                'jquery': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/<%= vJQuery %>/jquery.min.js',
                    dest: 'public/_assets/jquery/<%= vJQuery %>/jquery.min.js'
                },
                'jquery-ui': {
                    src: 'https://jqueryui.com/resources/download/jquery-ui-<%= vJQueryUI %>.zip',
                    dest: 'public/_assets/jquery-ui-<%= vJQueryUI %>.zip'
                },
                'babel': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/<%= vBabel %>/browser.min.js',
                    dest: 'public/_assets/babel-core/<%= vBabel %>/browser.min.js'
                },
                'react': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/react/<%= vReact %>/react.js',
                    dest: 'public/_assets/react/<%= vReact %>/react.js'
                },
                'react-dom': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/react/<%= vReact %>/react-dom.js',
                    dest: 'public/_assets/react/<%= vReact %>/react-dom.js'
                },
                'react-redux': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/<%= vReactRedux %>/react-redux.min.js',
                    dest: 'public/_assets/react-redux/<%= vReactRedux %>/react-redux.min.js'
                },
                'knockout': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/<%= vKnockout %>/knockout-min.js',
                    dest: 'public/_assets/knockout/<%= vKnockout %>/knockout-min.js'
                },
                'sammy': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/sammy.js/<%= vSammy %>/sammy.min.js',
                    dest: 'public/_assets/sammy/<%= vSammy %>/sammy.min.js'
                },
                'clipboard': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/<%= vClipboard %>/clipboard.min.js',
                    dest: 'public/_assets/clipboard/<%= vClipboard %>/clipboard.min.js'
                },
                'uikit': {
                    src: 'https://github.com/uikit/uikit/releases/download/v<%= vUIKit %>/uikit-<%= vUIKit %>.zip',
                    dest: 'public/_assets/uikit-<%= vUIKit %>.zip'
                },
                'sigma': {
                    src: 'https://github.com/jacomyal/sigma.js/releases/download/v<%= vSigma %>/release-v<%= vSigma %>.zip',
                    dest: 'public/_assets/sigma-<%= vSigma %>.zip'
                },
                'sigma-plugins-cypher': {
                    src: 'https://raw.githubusercontent.com/jacomyal/sigma.js/master/plugins/sigma.parsers.cypher/sigma.parsers.cypher.js',
                    dest: 'public/_assets/sigma-plugins/sigma.parsers.cypher/sigma.parsers.cypher.js'
                },
                'alchemy': {
                    src: 'https://github.com/GraphAlchemist/Alchemy/releases/download/<%= vAlchemy %>/<%= vAlchemy %>.zip',
                    dest: 'public/_assets/alchemy-<%= vAlchemy %>.zip'
                },
                'cyposcape': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/<%= vCytoscape %>/cytoscape.min.js',
                    dest: 'public/_assets/cytoscape/<%= vCytoscape %>/cytoscape.min.js'
                },
                'linkurious': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/linkurious.js/<%= vLinkurious %>/sigma.min.js',
                    dest: 'public/_assets/linkurious.js/<%= vLinkurious %>/sigma.min.js'
                }
            },

            unzip: {
                'd3plus': {
                    src: 'public/_assets/d3plus.zip',
                    dest: 'public/_assets/d3plus/'
                },
                'uikit': {
                    src: 'public/_assets/uikit-<%= vUIKit %>.zip',
                    dest: 'public/_assets/uikit/uikit-<%= vUIKit %>/'
                },
                'jquery-ui': {
                    src: 'public/_assets/jquery-ui-<%= vJQueryUI %>.zip',
                    dest: 'public/_assets/jquery-ui/'
                },
                'sigma': {
                    src: 'public/_assets/sigma-<%= vSigma %>.zip',
                    dest: 'public/_assets/sigma/sigma-<%= vSigma %>/'
                },
                'alchemy': {
                    src: 'public/_assets/alchemy-<%= vAlchemy %>.zip',
                    dest: 'public/_assets/alchemy/'
                }
            }
        }
    );

    grunt.registerTask('download', [
        'if-missing:curl:d3',
        'if-missing:curl:d3plus',
        'if-missing:unzip:d3plus',
        'if-missing:curl:underscore',
        'if-missing:curl:clipboard',
        'if-missing:curl:lodash',
        'if-missing:curl:showdown',
        'if-missing:curl:jquery',
        'if-missing:curl:jquery-ui',
        'if-missing:unzip:jquery-ui',
        'if-missing:curl:babel',
        'if-missing:curl:react',
        'if-missing:curl:react-dom',
        'if-missing:curl:react-redux',
        'if-missing:curl:knockout',
        'if-missing:curl:sammy',
        'if-missing:curl:uikit',
        'if-missing:unzip:uikit',
        'if-missing:curl:sigma',
        'if-missing:unzip:sigma',
        'if-missing:curl:sigma-plugins-cypher',
        'if-missing:curl:alchemy',
        'if-missing:unzip:alchemy',
        'if-missing:curl:cyposcape'
    ]);
}
;
