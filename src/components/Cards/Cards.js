import React, { useEffect, useState } from "react";
import { BACK_CARD_URL, BASE_URL } from "../../constants/url";
import { getCards } from "../../services/cards";
import PopupCard from "../PopupCard/PopupCard";
import { ButtonContainer, CardsContainer, StyledButton } from "./styled";


function Cards() {
    const [cards, setCards] = useState({})
    const [trigger, setTrigger] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})

    useEffect(() => {
        getCards(cards, setCards)
    }, [])

    let copyArray = cards.length > 0 && [...cards]

    const shuffleCards = (array) => {
        let newPosition
        let temp

        for (let card of array) {
            card.flipCard = false
        }

        for (let i = array.length - 1; i > 0; i--) {
            newPosition = Math.floor(Math.random() * i);
            temp = array[i]
            array[i] = array[newPosition]
            array[newPosition] = temp
        }
        setCards(array)

    }

    const popupCard = (card) => {
        setTrigger(true)
        card.flipCard = true
        setSelectedCard(card)
    }

    const restartCards = () => {
        getCards(cards, setCards)
    }

    const cardsMap = cards.length > 0 && cards.map((card) => {
        return (card.flipCard ?
            <img src={`${BASE_URL}/${card.image}`} alt={card.name} key={card.name} onClick={() => popupCard(card)} />
            :
            <img src={`${BACK_CARD_URL}`} alt={card.name} key={card.name} onClick={() => popupCard(card)} />)
    })

    return (
        <div>
            <ButtonContainer>
                <StyledButton onClick={restartCards}>Recomeçar</StyledButton>
                <StyledButton onClick={() => shuffleCards(copyArray)}>Embaralhar</StyledButton>
            </ButtonContainer>

            <CardsContainer>
                {cardsMap}
                <PopupCard trigger={trigger} setTrigger={setTrigger} card={selectedCard && selectedCard} />
            </CardsContainer>
        </div>
    );
}

export default Cards;
