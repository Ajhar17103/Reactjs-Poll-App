import React, { Component } from 'react'
import { Button, CustomInput, Form, FormFeedback, FormGroup, Input } from 'reactstrap'

class PartiicpateForm extends Component {
   
   
    state={
        name:'',
        selectedOption:'',
        errors:{}
    }



    hanleChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }



    handleSubmit=event=>{
        event.preventDefault();  
        let {errors,isvalid} =this.validate()
        if(isvalid){
            this.props.getOpinion({
                pollId:this.props.poll.id,
                name:this.state.name,
                selectedOption:this.state.selectedOption
                
            })
            event.target.reset()
            this.setState({
                name:'',
        selectedOption:'',
        errors:{}
            })

        }else{
            this.setState({
                errors
            })
        }
        console.log(event);
    }



    validate=()=>{
        let errors={}
        if(!this.state.name){
            errors.name='Please Provide A Name'
        } else if(this.state.name.length>20){
            errors.name='Name To Long'
        }
        if(!this.state.selectedOption){
            errors.selectedOption='Please Select One Option'
        }
        return {
            errors,
            isvalid:Object.keys(errors).length==0
        }
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className='d-flex'>
                    <h4>Options</h4>
                    <Button
                    color='warning'
                    type='button'
                    className='ml-auto'
                    onClick={this.props.toggleModal}
                    >
                        Edit
                    </Button>
                    <Button
                    color='danger'
                    type='button'
                    className='ml-2'
                    onClick={()=>this.props.deletePoll(this.props.poll.id)}>
                        Delete
                    </Button>

                </div>
                {
                    this.props.poll.options.map(opt=>(
                        <FormGroup className='my-2' key={opt.id}>
                            <label className='d-flex'>
                                <CustomInput 
                                    type='radio'
                                    id={opt.id}
                                    name='selectedOption'
                                    onChange={this.hanleChange}
                                    value={opt.id}
                                    invalid={this.state.errors.selectedOption? true:false}
                                />
                                {opt.value}
                            </label>

                            <span 
                            style={{
                                padding:'5px 20px',
                                background:'green',
                                color:'white',
                                borderRadius:'5px'

                                }}
                                className='ml-auto'
                            >
                                {opt.vote}
                            </span>
                            <span
                             style={{
                                  padding:'5px 20px',
                                   background:'orange',
                                   color:'white'}}
                              className='ml-2'
                            >
                                {this.props.poll.totalVote>0 ? ((100*opt.vote)/ this.props.poll.totalVote).toFixed(2):0}
                                %
                            </span>

                        </FormGroup>
                    ))}
                    <FormGroup className='my-3'>
                        <label>
                            Enter Your Name
                        </label>
                        <Input
                        name='name'
                        placeholder='Enter Your Name'
                        value={this.state.value}
                        onChange={this.hanleChange}
                        invalid={this.state.errors.name ? true:false}
                        />
                        
                        {this.state.errors.name &&(
                            <FormFeedback>{this.state.errors.name}</FormFeedback>
                        )}

                    </FormGroup>
                    <Button type='submit'> 
                            Submit Your Opinion
                    </Button>
            </Form>
        )
    }
}

export default PartiicpateForm;
