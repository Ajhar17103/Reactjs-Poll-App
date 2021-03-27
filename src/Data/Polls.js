let polls=[
    {
        id:'01',
        title:'What is your favourite programming language?',
        description:'there are lot of popular programming languages available.Among them what is your favourite',
        options:[
            {id:'1a' , value:'C programming' ,vote:0},
            {id:'1b' , value:'Java' ,vote:0},
            {id:'1c' , value:'JavaScript' ,vote:0},
            {id:'1d' , value:'Python' ,vote:0}
        ],
        created:new Date(),
        totalVote:0,
        opinions:[]
    },
    {
        id:'02',
        title:'What is your favourite frame work language?',
        description:'there are lot of popular programming languages available.Among them what is your favourite',
        options:[
            {id:'2a' , value:'react.js' ,vote:0},
            {id:'2b' , value:'jQuery' ,vote:0},
            {id:'2c' , value:'Angular' ,vote:0},
            {id:'2d' , value:'Python' ,vote:0}
        ],
        created:new Date(),
        totalVote:0,
        opinions:[]
    }
   
]
export default polls;