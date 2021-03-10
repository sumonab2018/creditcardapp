import React, { Component } from 'react'
import validator from 'validator'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CardDataService from '../service/CardDataService';

class AddCardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            balance: this.props.balance,
            cardHolderName: this.props.cardHolderName,
            cardNumber: this.props.cardNumber,
            upperLimit: this.props.upperLimit
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }
    componentDidMount() {


        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }
        
        CardDataService.retrieveAllCards()
            .then(response => this.setState({
                cardId: response.data.cardId,
                balance: response.data.balance,
                cardHolderName: response.data.cardHolderName,
                cardNumber: response.data.cardNumber,
                upperLimit: response.data.upperLimit
            }))
    }

    

    validate(values) {
        let errors = {}
        
        if (!validator.isCreditCard(values.cardNumber)){
            errors.cardNumber = "Enter Valid Card Number"
        }

        if (!values.cardNumber) {
            errors.cardNumber = 'Enter Card Number!'
        }else if (values.cardNumber.length>19){
            errors.cardNumber = "Card number should not exceed 19 characters!"
        }else if (isNaN(values.cardNumber)){
            errors.cardNumber = "Card number should be Numeric!"
        }

        return errors

    }

    onSubmit(values) {

        let card = {
            balance: values.balance,
            cardHolderName: values.cardHolderName,
            cardNumber: values.cardNumber,
            upperLimit: values.upperLimit
        }

        if (values !=null) {
            console.log(values);
            CardDataService.createCard(card)
        } 

        //console.log(values);
    }
render() {
    let{balance,cardHolderName,cardNumber,upperLimit} = this.state
    return (
        <div>
                <h3>Add</h3>
                <div className="container">
                    <Formik
                        initialValues={{balance,cardHolderName,cardNumber,upperLimit}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => {
                                const {
                                  values,
                                  touched,
                                  errors
                                } = props;
                          
                                return (
                                            <Form>
                                        <fieldset className="form-group">
                                        <label>Balance</label>
                                        <Field className="form-control" type="text" name="balance" />
                                        </fieldset>
                                        <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="cardHolderName" />
                                        </fieldset>
                                        <fieldset className="form-group">
                                        <label>Card Number</label>
                                        <Field className="form-control" type="text" name="cardNumber"/>
                                        {errors.cardNumber && touched.cardNumber ? (<div>{errors.cardNumber}</div>) : null}
                                        </fieldset>
                                        <fieldset className="form-group">
                                        <label>Limit</label>
                                        <Field className="form-control" type="text" name="upperLimit" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Add</button>
                                           </Form>
                            );
                                }
}
</Formik>
</div>
</div>
    )
}

}
export default AddCardComponent