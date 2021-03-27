import React from 'react';
import { Button, Form, FormFeedback, FormGroup, Input } from 'reactstrap'

let MyForm=({
    title,description,options,errors,buttonValue,handelChange, handleOptionsChange, createOptions, deleteOption,handleSubmit
})=>(
     <Form onSubmit={handleSubmit}>
         <FormGroup>
             <label for='title'>Title</label>
             <Input
             name='title'
             id='title'
             placeholder='A Dummy Title' 
             value={title}
             onChange={handelChange}
             invalid={errors.title? true:false}
             />
             {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
         </FormGroup>
         <FormGroup>
             <label for='description'>Description</label>
             <Input
             name='description'
             type='textarea'
             id='description'
             placeholder='Description  Your Poll' 
             value={description}
             onChange={handelChange}
             invalid={errors.description? true:false}
             />
             {errors.description && <FormFeedback>{errors.description}</FormFeedback>}
         </FormGroup>

         <FormGroup>
             <label>
                 enter Your Options
                 <span
                 style={{
                     marginLeft:'30px',
                     background:'green',
                     color:'white',
                     padding:'5px',
                     borderRadius:'5px',
                     cursor:'pointer'
                }}
                onClick={createOptions}
                 >Add Option</span>
             </label>
             {
                 options.map((opt,index)=>(
                     <div key={opt.id} className='d-flex my-2'>
                         <Input 
                         value={opt.value}
                         onChange={e=>handleOptionsChange(e,index)}
                         invalid={
                             errors.options && errors.options[index] ? true:false
                         }
                         />
                         <Button
                            color='danger'
                            disabled={options.length<=2}
                            className='ml-2'
                            onClick={()=>deleteOption(index)}
                         >
                                    Delete
                         </Button>
                     </div>
                 ))
             }
         </FormGroup>
             <Button>
                 {buttonValue}
             </Button>
     </Form>
)
export default MyForm;