import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import MainContent from './Component/Maincontent/Index'
import Sidebar from './Component/Slidebar/Index'
import POLLS from './Data/Polls'
import shortid from 'short-id'

export class App extends Component {
    state={
        polls:[],
        selectedPoll:{},
        searchTerm:''
    }
    componentDidMount(){
        this.setState({
            polls:POLLS
        })
    }
    addNewPoll=(poll)=>{
        poll.id=shortid.generate();
        poll.created= new Date();
        poll.totalVote=0;
        poll.opinions=[]
        
        this.setState({
            polls:this.state.polls.concat(poll)
        })
    }
    updatePoll=(updatedPoll)=>{
        let polls =[...this.state.polls]
        let poll=polls.find(p=>p.id==updatedPoll.id)

        polls.title=updatedPoll.title;
        polls.description=updatedPoll.description;
        polls.opinions=updatedPoll.opinions
        
        this.setState({
            polls
        })
    }
    deletePoll=(pollId)=>{
        let polls = this.state.polls.filter(p=>p.id!== pollId);
        this.setState({polls, selectedPoll:{}});

    }
    selectPoll=(pollId)=>{
        let poll = this.state.polls.find(p=>p.id==pollId)
        this.setState({
            selectedPoll:poll
        })
    }
    handleSearch=(searchTerm)=>{
        this.setState({
            searchTerm
        });

    }
    performSearch=()=>{
        return this.state.polls.filter(poll=>poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
    getOpinion=(response)=>{
        let {polls}=this.state
        let poll =polls.find(p=>p.id==response.pollId)
        let option=poll.options.find(o=>o.id==response.selectedOption)
        option.vote++
        poll.totalVote++
        let opinion={
            id:shortid.generate(),
            name:response.name,
            selectedOption:response.selectedOption

            
        }
        poll.opinions.push(opinion);
        this.setState({polls})

    }
    render() {
        let polls=this.performSearch();
        return (
            <Container className='my-5'>
                <Row>
                    <Col md={4}>
                    <Sidebar
                    polls={polls}
                    handleSearch={this.handleSearch}
                    selectPoll={this.selectPoll}
                    searchTerm={this.state.searchTerm}
                    addNewPoll={this.addNewPoll}
                    
                    />
                    </Col>

                    <Col md={8}>
                    <MainContent
                    poll={this.state.selectedPoll}
                    getOpinion={this.getOpinion}
                    deletePoll={this.deletePoll}
                    updatePoll={this.updatePoll}

                    />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default App
