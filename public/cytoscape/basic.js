$(function () { // on dom ready

    $('#cy').cytoscape({
        layout: {
            name: 'cose',
            padding: 10
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'circle',
                'width': '5em',
                'content': 'data(name)',
                'text-valign': 'center',
                'color': '#000'
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333'
            })
            .selector('edge')
            .css({
                'opacity': 0.666,
                'width': 4,
                'target-arrow-shape': 'triangle'
                //'source-arrow-shape': 'circle',
                //'line-color': 'data(faveColor)',
                //'source-arrow-color': 'data(faveColor)',
                //'target-arrow-color': 'data(faveColor)'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            }),

        elements: {
            nodes: [
                {data: {id: 'c', name: 'client-side-artifact'}},
                {data: {id: 'r', name: 'server-side-restful-service'}},
                {data: {id: 's', name: 'server-side-artifact'}},
                {data: {id: 'v', name: 'technology-vendor-product'}}
            ],
            edges: [
                {data: {source: 'c', target: 'r', faveColor: '#6FB1FC', strength: 90}},
                {data: {source: 'c', target: 's', faveColor: '#6FB1FC', strength: 70}},
                {data: {source: 's', target: 'r', faveColor: '#6FB1FC', strength: 80, classes: 'questionable'}},
                {data: {source: 's', target: 'v', faveColor: '#EDA1ED', strength: 95}}
            ]
        },

        ready: function () {
            window.cy = this;

            // giddy up
        }
    });

}); // on dom ready
