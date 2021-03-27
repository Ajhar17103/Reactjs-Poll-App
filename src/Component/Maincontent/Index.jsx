import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import PollForm from '../PollForm/Index'
import PartiicpateForm from './ParticpateForm'

export class MainContent extends Component {
    state={
        openModal:false
    }
    toggleModal=()=>{
        this.setState({
            openModal:!this.state.openModal
        })
    }
    render() {
        if(Object.keys(this.props.poll).length==0){
            return (
                <div>
                    <h3>
                        Welcome To My Application
                    </h3>
                    <p>
                    You can create as many as you want. click the new button to create a new poll. to check detalis of a poll please select from the left sidebar.by selecting a poll you can check it's details, participate and check others opinion about this poll.
                    </p>
                </div>
            )
        }
        let {poll, getOpinion , updatePoll, deletePoll}=this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br/>
                <PartiicpateForm
                poll={poll}
                getOpinion ={getOpinion }
                toggleModal={this.toggleModal}
                deletePoll={deletePoll}
                updatePoll={updatePoll}
                />
                <Modal
                isOpen={this.state.openModal}
                toggle={this.toggleModal}
                unmountOnClose={true}>
                    <ModalHeader toggle={this.toggleModal} >
                        Update Poll
                    </ModalHeader>
                    <ModalBody>
                        <PollForm
                        poll={poll}
                        isUpdate={true}
                        submit={updatePoll}
                        buttonValue='Update Poll'
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default MainContent
