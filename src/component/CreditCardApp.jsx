import React, { Component } from 'react';
import AddCardComponent from './AddCardComponent';
import ListCardsComponent from './ListCardsComponent';

class CreditCardApp extends Component {
    render() {
        return (<>
              <h1>Credit Card System</h1>
              <AddCardComponent/>
             <ListCardsComponent/>
              </>
        )
    }
}

export default CreditCardApp