//** Temporary data */
export const menu = {
    label: 'Models',
    categories: [ /*Pfister */
        {
        name: "SUV",
         vehicles: [
             { name: 'Astron', price: '$1,580,000', img:'/cars/Astron.webp', to: '/models/astron' },
        ],
    },
            {
        name: "Sedan",
         vehicles: [
             { name: 'Neon', price: '$1,500,000', img:'', to: '' },
        ],
    },
            {
        name: "Sports",
         vehicles: [
             { name: 'Comet S2', price: '$1,408,500', img:'', to: '' },
             { name: 'Comet S2 Cabrio', price: '$1,797,000', img:'', to: '' },
             { name: 'Comet SR', price: '1,145,000', img:'', to: '' },
             { name: 'Growler', price: '$1,220,250', img:'', to: '' },
        ],
    },
            {
        name: "Premium Sport Line",
         vehicles: [
             { name: '811', price: '$1,135,000', img:'', to: '' },
        ],
    },
    {
        label: 'Care & Service',
        links: [
            {name: 'Book a Service', to:'/service'},
            /*{name: 'Parts ', to:''},
            {name: '', to:''}, */
        ]
    },
    {label: 'Pricing', to: '/'}
    ]
}