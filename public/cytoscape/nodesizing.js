$(function(){ // on dom ready

    var cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'roundrectangle',
                'content': 'data(label)',
                'text-wrap': 'wrap',
                'width': 'label',
                'height': 'label',
                'text-valign': 'center',
                'text-halign': 'center',
                'padding-top': '5px',
                'padding-left': '10px',
                'padding-bottom': '5px',
                'padding-right': '10px'
            })
            .selector('edge')
            .css({
                //'curve-style':'haystack',
                'target-arrow-shape': 'triangle',
                'width': 4,
                'line-color': '#ddd',
                'target-arrow-color': '#ddd'
            })
            .selector('.highlighted')
            .css({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '1s'
            }),

        elements: {
            nodes: [
                { data: { id: 'a', label: 'analytics\ntoolbox' }, position: { x: 100, y: 0 } },
                { data: { id: 'b', label: 'analytics\nserver\nlcds\nadaptor' }, position: { x: 100, y: 20 } },
                { data: { id: 'c', label: 'analytics\nserver\nmessaging\nlcds\nadaptor' }, position: { x: 100, y: 40 } },
                { data: { id: 'd', label: 'analytics\nserver\ndata\nprovider' }, position: { x: 100, y: 60 } },
                { data: { id: 'e', label: 'analytics\nrestful\nservice' }, position: { x: 100, y: 80 } }
            ],

            edges: [
                { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
                { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
                { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
                { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
                { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
                { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
                { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
            ]
        },

        layout: {
            name: 'breadthfirst',
            directed: true,
            roots: '#a',
            padding: 10
        }
    });

    var bfs = cy.elements().bfs('#a', function(){}, true);

    var i = 0;
    var highlightNextEle = function(){
        if( i < bfs.path.length ){
            bfs.path[i].addClass('highlighted');

            i++;
            setTimeout(highlightNextEle, 1000);
        }
    };

// kick off first highlight
    highlightNextEle();

}); // on dom ready