import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

let PollList = (props) => {
    if (props.polls.length == 0) {
        return <p>Ther is no Poll</p>
    }
    return(
        <ListGroup>
            {props.polls.map(poll=>(
                <ListGroupItem
                 key={poll.id}
                 onClick={()=>props.selectPoll(poll.id)}
                 style={{cursor:'pointer'}}

                >
                    {poll.title.length > 30 ? poll.title.substr(0,30) + '...'  :poll.title}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}
export default PollList;