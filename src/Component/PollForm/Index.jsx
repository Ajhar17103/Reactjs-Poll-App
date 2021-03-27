import React, { Component } from 'react';
import shortid from 'short-id';
import MyForm from './Form';

let defaultOptions=[
{id:shortid.generate(), vlaue:'',vote:0},
{id:shortid.generate(), vlaue:'',vote:0}
]
export class PollForm extends Component {
    state={
        title:'',
        description:'',
        options:defaultOptions,
        errors:{}
    };

    componentDidMount(){
        let {poll}=this.props
        if(poll && Object.keys(poll).length>0){
            this.setState({
                title:poll.title,
                description:poll.description,
                options:poll.options
            })
        }
    }

    handelChange=event=>{
        this.setState({
            [event.target.name]:event.target.value 
        })
    }




    handleOptionsChange=(event, index)=>{
        let  {options}=this.state
        options[index].value=event.target.value
        this.setState({
            options
        })
    }






    createOptions=()=>{
        let  {options}=this.state
        if(options.length<5){
        options.push({
            id:shortid.generate(),
            value:'',
            vote:0
       
        });
        this.setState({
            options
        }) 
        } else{
            alert('You can Create Max 5 Options')
        }

    }




    deleteOption=index=>{
        let  {options}=this.state
        if(options.length > 2){
            options.splice(index,1)
            this.setState({
                options
            })
        } else{
            alert('You must have at least Two Options')
        }
    }





    handleSubmit =event=>{
        event.preventDefault()
        let {isValid,errors}=this.validate()
        if(isValid){
            let {title,description,options}=this.state;
            let poll={
                title,
                description,
                options
            }
            if(this.props.isUpdate){
                poll.id=this.props.poll.id
                this.props.submit(poll)
                alert('Updated Successfully')
            }
            else{
                this.props.submit(poll)
            event.target.reset()
            this.setState({
                title:'',
                description:'',
                options:defaultOptions
            })
            }
            
        } else{
            this.setState({
                errors
            })
        }
    }



    validate =()=>{
        let errors={}
        let {title,description,options}=this.state

        if(!title){
            errors.title='Please Provide A Title'
        } else if(title.length<20){
            errors.title='Title Too short'
        } else if (!title.length>100){
            errors.title='Title Too Long'
        }
        if(!description){
            errors.description='Please Provide A Description'
        } else if(!description.length>500){
            errors.description='description Too long'
        }
        let optionErros=[]
        options.forEach((opt,index) =>{
            if(!opt.value){
                optionErros[index]='Option Text Empty'
             //  optionErros.push('Option Text Empty')
            } else if(opt.value.length>100){
                optionErros[index]='Option Text Too Long'
                //optionErros.push('Option Text Too Long')
            }
        })
        if(optionErros.length > 0){
            errors.options=optionErros
        }
        return {
            errors,
            isValid:Object.keys(errors).length==0
        }
    }
    render() {
        let {title,options,description,errors}=this.state
        return (
            <div>
                 <MyForm
                 title={title}
                 description={description}
                 options={options}
                 buttonValue={this.props.buttonValue || 'create poll'}
                 errors={errors}
                 handelChange={this.handelChange}
                 handleOptionsChange={this.handleOptionsChange}
                 handleSubmit={this.handleSubmit}
                 deleteOption={this.deleteOption}
                 createOptions={this.createOptions}
                  />
            </div>
        )
    }
}

export default PollForm
