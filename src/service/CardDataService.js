import axios from 'axios'

const CARD_API_URL = 'https://localhost:8443'

class CardDataService {

    retrieveAllCards() {
        return axios.get(`${CARD_API_URL}/cards`);
    }

    createCard(card) {
        console.log(card)
        return axios.post(`${CARD_API_URL}/cards`, card);
    }

    
}

export default new CardDataService()
