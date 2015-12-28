$(function () { // on dom ready

    $('#cy').cytoscape({
        layout: {
            name: 'concentric',
            avoidOverlap: true,
            padding: 0,
            roots: '#atb',
            fit: false
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'data(faveShape)',
                'width': '40',
                'height': '40',
                'content': 'data(name)',
                'text-valign': 'center',
                'text-outline-width': 2,
                'text-outline-color': 'data(faveColor)',
                'background-color': 'data(faveColor)',
                'color': '#fff'
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333'
            })
            .selector('edge')
            .css({
                'opacity': 0.666,
                'width': 2,
                'target-arrow-shape': 'triangle',
                'source-arrow-shape': 'circle',
                'line-color': 'data(faveColor)',
                'source-arrow-color': 'data(faveColor)',
                'target-arrow-color': 'data(faveColor)',
                'label': 'data(label)',
                'curve-style': 'bezier'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond',
                'label': 'data(label)'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: {
            nodes: [
                {data: {id: 'atb', name: 'analytics-toolbox', weight: 65, faveColor: '#E0A2A2', faveShape: 'ellipse'}},
                {data: {id: 'alcds', name: 'analytics-lcds-adaptor', weight: 45, faveColor: '#F5A45D', faveShape: 'octagon'}},
                {data: {id: 'atbmp', name: 'analytics-toolbox-message-processor', weight: 45, faveColor: 'red', faveShape: 'rectangle'}},
                {data: {id: 'adp', name: 'analytics-data-provider', weight: 75, faveColor: 'red', faveShape: 'rectangle'}},
                {data: {id: 'ars', name: 'analytics-restful-service', weight: 70, faveColor: 'green', faveShape: 'roundrectangle'}}
            ],
            edges: [
                {data: {source: 'atb', target: 'alcds', faveColor: 'red', strength: 90, label: '29west'}},
                {data: {source: 'alcds', target: 'atbmp', faveColor: 'red', strength: 70, label: '29west'}},
                {data: {source: 'alcds', target: 'adp', faveColor: 'red', strength: 80, label: '29west'}},
                {data: {source: 'adp', target: 'ars', faveColor: 'green', strength: 95, label: 'rest'}}
            ]
        },

        ready: function () {
            window.cy = this;

            // giddy up
        }
    });

}); // on dom ready
