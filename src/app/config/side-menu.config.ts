
export const sideBarMenu =  [
    {
        "title" : "Biens",
        "icon": "gauge-high",
        "children": [
            {
                "title": "Add/Edit",
                "icon": "newspaper",
                "routerLink": "/bien/create"
            },
            {
                "title": "List Biens",
                "icon": "layer-group",
                "routerLink": "/bien/list"
            }
        ]
    },
    {
        "title": "Location",
        "icon": "scroll",
        "children": [
            {
                "title": "Add/Edit",
                "icon": "newspaper",
                "routerLink": "/location/create"
            },
            {
                "title": "List Locataires",
                "icon": "layer-group",
                "routerLink": "/location/list"
            }
        ]
    }
]