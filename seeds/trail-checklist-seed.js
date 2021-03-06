const { Trail_checklist } = require('../models');
const Trail_checklistData =[{
    sunscreen:1,
    bugspray:1,
    waterbottle:1,
    boots: 1,
    rainjacket:0,
    cleats: 0,
    climbingrope:0,
    bearspray: 1,
    orv: 0,
    atv: 0,
    snowmobile: 0,
    trailsidecamping: 0,
    bathroom: 0,
    waterfoutain: 0, 
    petfriendly: 1,
    wateraccess:0,
    wheelchairaccessible: 0,
    steepterrain: 1,
    stairs: 0,
    looseground: 1,
    overhang: 1,
    damp: 1,
    cliff: 1,
    fallentrees: 1,
    bridge: 1,
    dangerouswildlife: 1,
    tightspaces: 0,
    outlook: 1,
    waterfall: 1,
    river: 1,
    ocean: 1,
    rockformations: 1,
    }
];
const trailchecklist = () => Trail_checklist.bulkCreate(trail_checklistData);
module.exports = trailchecklist;