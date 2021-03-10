import React, { Component } from 'react'
import CardDataService from '../service/CardDataService';

class ListCardsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            message: null
        }
        this.refreshCards = this.refreshCards.bind(this)
        this.addCardClicked = this.addCardClicked.bind(this)
    }

    componentDidMount() {
        this.refreshCards();
        setInterval(this.refreshCards,1000);
    }

    refreshCards() {
        CardDataService.retrieveAllCards()
            .then(
                response => {
                    //console.log(response);
                    this.setState({ cards: response.data })
                }
            )
    }

    addCardClicked() {
        this.props.history.push(`/cards/-1`)
    }

    render() {
        console.log('render')
        return (
            <div className="container">
                
                <h3>Existing Cards</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Card Number</th>
                                <th>Balance</th>
                                <th>Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cards.map(
                                    card =>
                                    <tr key={card.cardId}>
                                        <td>{card.cardHolderName}</td>
                                        <td>{card.cardNumber}</td>
                                        <td>{card.balance}</td>
                                        <td>{card.upperLimit}</td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListCardsComponent