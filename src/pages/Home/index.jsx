import React, { useState } from "react";
import { useSelector } from 'react-redux';
import TextField, { Input } from '@material/react-text-field';
import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png'
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from "../../components";

import { Container, Carousel, Search, Logo, Wrapper, CarouselTitle, ModalTitle, ModalContent, } from "./styles";

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants)

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    function handleKeyPress(e){
        if (e.key === 'Enter'){
            setQuery (inputValue);
        }
    }

    function handleOpenModal(placeId){
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
            <Search>
                <Logo src={logo} alt="Logo restaurante" />
                <TextField
                    label='Pesquisar restaurantes'
                    outlined
                    trailingIcon={<MaterialIcon role="button" icon="search"/>}
                >
                <Input value={inputValue} onKeyPress= {HandleKeyPress} onChange={(e) => setInputValue(e.target.value)} />
                </TextField>
                {restaurants.length > 0 ? (
                    <>
                        <CarouselTitle>Na sua área</CarouselTitle>
                <Carousel {...settings}>
                    {restaurants.map((restaurant) => ( <Card key={restaurant.place_id} photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante} title ={restaurant.name}/>))}
                </Carousel>
                    </>
                ): <Loader />}

            </Search>

            {restaurants.map((restaurant) => (
                <RestaurantCard onClick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant} />))}

            <RestaurantCard />
            </Container>
            <Map query={query} placeId={placeId} />
            <Modal open={modalOpened} onClose={() => setModalOpened (!modalOPened )}> 
                {restaurantSelected? (
                    <>
                <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto agora' : 'Fechado'}</ModalContent>

                    </>
                ) : (
                    <> 
                        <skeleton width="10px" height="10px"/>
                        <skeleton width="10px" height="10px"/>
                        <skeleton width="10px" height="10px"/>
                        <skeleton width="10px" height="10px"/>
                    </>
                )}
            </Modal>
        </Wrapper>
    );
};

export default Home;
