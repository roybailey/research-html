module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-if-missing');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            vBootstrap: "3.3.6",
            vD3: "3.5.7",
            vUnderscore: "1.8.3",
            vD3v4: "4.9.1",
            vLoDash: "4.17.12",
            vShowdown: "0.3.1",
            vJQuery: "2.1.4",
            vJQueryUI: "1.11.4",
            vBabel: "6.0.20",
            vReact: "0.14.2",
            vReactRedux: "4.0.0",
            vKnockout: "3.3.0",
            vSammy: "0.7.6",
            vRiot: "2.6.4",
            vMithril: "0.2.0",
            vClipboard: "1.5.3",
            vUIKit: "2.23.0",
            vSemantic: "2.2.13",
            vSigma: "1.0.3",
            vCytoscape: "2.5.0",
            vAlchemy: "0.4.1",
            vLinkurious: "1.3.0",
            vDropzone: "4.2.0",
            vPapaParse: "4.1.2",
            vSuperagent: "1.2.0",
            vVis: "4.20.1",
            vChartJS: "2.6.0",

            curl: {
                'bootstrap': {
                    src: 'https://github.com/twbs/bootstrap/releases/download/v<%= vBootstrap %>/bootstrap-<%= vBootstrap %>-dist.zip',
                    dest: 'public/_assets/bootstrap-<%= vBootstrap %>-dist.zip'
                },
                'd3': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/<%= vD3 %>/d3.min.js',
                    dest: 'public/_assets/d3/<%= vD3 %>/d3.min.js'
                },
                'd3plus': {
                    src: "http://d3plus.org/d3plus.zip",
                    dest: 'public/_assets/d3plus.zip'
                },
                'd3v4': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/d3/<%= vD3v4 %>/d3.min.js',
                    dest: 'public/_assets/d3/<%= vD3v4 %>/d3.min.js'
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
                'riot': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/riot/<%= vRiot %>/riot.min.js',
                    dest: 'public/_assets/riot/<%= vRiot %>/riot.min.js'
                },
                'riot-compiler': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/riot/<%= vRiot %>/riot+compiler.min.js',
                    dest: 'public/_assets/riot/<%= vRiot %>/riot-compiler.min.js'
                },
                'mithril': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/mithril/<%= vMithril %>/mithril.min.js',
                    dest: 'public/_assets/mithril/<%= vMithril %>/mithril.min.js'
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
                },
                'papaparse': {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/<%= vPapaParse %>/papaparse.min.js",
                    dest: 'public/_assets/papaparse/<%= vPapaParse %>/papaparse.min.js'
                },
                'superagent': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/superagent/<%= vSuperagent %>/superagent.min.js',
                    dest: 'public/_assets/superagent/<%= vSuperagent %>/superagent.min.js'
                },
                'chartjs': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/<%= vChartJS %>/Chart.bundle.js',
                    dest: 'public/_assets/chartjs/<%= vChartJS %>/Chart.bundle.js'
                }
            },

            'curl-dir': {
                'semantic': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/<%= vSemantic %>/semantic.min.{js,css}',
                    dest: 'public/_assets/semantic-ui/<%= vSemantic %>'
                },
                'semantic-theme-default': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/<%= vSemantic %>/themes/default/assets/fonts/{icons.woff2,icons.svg}',
                    dest: 'public/_assets/semantic-ui/<%= vSemantic %>/themes/default/assets/fonts'
                },
                'semantic-components': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/<%= vSemantic %>/components/{progress.min.js,progress.min.css}',
                    dest: 'public/_assets/semantic-ui/<%= vSemantic %>/components'
                },
                'dropzone': {
                    src: "https://cdnjs.cloudflare.com/ajax/libs/dropzone/<%= vDropzone %>/min/dropzone.min.{js,css}",
                    dest: 'public/_assets/dropzone/<%= vDropzone %>'
                },
                'vis': {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/vis/<%= vVis %>/vis.min.{js,css}',
                    dest: 'public/_assets/vis/<%= vVis %>'
                }
            },

            unzip: {
                'bootstrap': {
                    src: 'public/_assets/bootstrap-<%= vBootstrap %>-dist.zip',
                    dest: 'public/_assets/bootstrap/'
                },
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
        'if-missing:curl:bootstrap',
        'if-missing:unzip:bootstrap',
        'if-missing:curl:d3',
        'if-missing:curl:d3plus',
        'if-missing:unzip:d3plus',
        'if-missing:curl:d3v4',
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
        'if-missing:curl:riot',
        'if-missing:curl:riot-compiler',
        'if-missing:curl:mithril',
        'if-missing:curl:uikit',
        'if-missing:unzip:uikit',
        'if-missing:curl-dir:semantic',
        'if-missing:curl-dir:semantic-theme-default',
        'if-missing:curl-dir:semantic-components',
        'if-missing:curl:sigma',
        'if-missing:unzip:sigma',
        //'if-missing:curl:sigma-plugins-cypher', NOT FOUND
        'if-missing:curl:alchemy',
        'if-missing:unzip:alchemy',
        'if-missing:curl:cyposcape',
        'if-missing:curl:papaparse',
        'if-missing:curl:superagent',
        'if-missing:curl-dir:dropzone',
        'if-missing:curl-dir:vis',
        'if-missing:curl:chartjs'
    ]);
}
;
