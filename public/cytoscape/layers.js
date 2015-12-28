$(function(){ // on dom ready

    var cy = cytoscape({
        container: document.getElementById('cy'),

        boxSelectionEnabled: false,
        autounselectify: true,

        style: [
            {
                selector: 'node',
                css: {
                    'content': 'data(id)',
                    'text-valign': 'center',
                    'text-halign': 'center'
                }
            },
            {
                selector: '$node > node',
                css: {
                    'padding-top': '10px',
                    'padding-left': '10px',
                    'padding-bottom': '10px',
                    'padding-right': '10px',
                    'text-valign': 'top',
                    'text-halign': 'center',
                    'background-color': '#bbb'
                }
            },
            {
                selector: 'edge',
                css: {
                    'target-arrow-shape': 'triangle'
                }
            },
            {
                selector: ':selected',
                css: {
                    'background-color': 'black',
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'source-arrow-color': 'black'
                }
            }
        ],

        elements: {
            nodes: [
                { data: { id: 'a', parent: 'b', name: 'aaaaaaaaaa-aaaaaaaaaa-aaaaaaaaaa' }, position: { x: 215, y: 85 } },
                { data: { id: 'b', name: 'bbbbbbbbbb-bbbbbbbbbb-bbbbbbbbbb' } },
                { data: { id: 'c', parent: 'b', name: 'cccccccccc-cccccccccc-cccccccccc' }, position: { x: 300, y: 85 } },
                { data: { id: 'd', name: 'dddddddddd-dddddddddd-dddddddddd' }, position: { x: 215, y: 175 } },
                { data: { id: 'e', name: 'eeeeeeeeee-eeeeeeeeee-eeeeeeeeee' } },
                { data: { id: 'f', parent: 'e', name: 'ffffffffff-ffffffffff-ffffffffff' }, position: { x: 300, y: 175 } }
            ],
            edges: [
                { data: { id: 'ad', source: 'a', target: 'd' } },
                { data: { id: 'eb', source: 'e', target: 'b' } }

            ]
        },

        layout: {
            name: 'preset',
            padding: 5
        }
    });

}); // on dom ready