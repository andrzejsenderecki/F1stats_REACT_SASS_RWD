import React, { Component } from 'react';
import Chart from 'react-google-charts';

class About extends Component {

    render() {
        return (
            <div className='col-12'>
                <div className='title'>
                    <h1>Kontakt</h1>
                    <p>Witaj w dziale kontakt,</p>
                    <p>
                        jeśli tu jesteś, to oznacza, że chcesz się ze mną skontaktować. To wspaniale, ponieważ aktualnie poszukuję pracy jako Junior Front-end Developer, JavaScript Developer lub React Developer. Jestem otwarty również na inne technologie takie jak na przykład Angular.
                    </p>
                    <p>
                        Ukończyłem kurs programowania w szkole Coders Lab - JavaScript Developer: React.
                    </p>
                    <p>Proszę o kontakt pod poniższym adresem e-mail. Chętnie prześlę numer telefonu, cv i umóœię się na spotkanie rekrutacyjne.</p>
                    <p>e-mail: andrew.senderecki@gmail.com</p>
                    <ul className='list'>
                        <li className='link'><a href='https://pl.linkedin.com/in/andrzej-senderecki-64b7b6159' target='_blank'>Link do profilu LinkedIn</a></li>
                        <li className='link'><a href='https://github.com/andrzejsenderecki' target='_blank'>Link do profilu Github</a></li>
                        <li className='link'><a href='https://github.com/andrzejsenderecki/f1stats_react' target='_blank'>Link do repozytorium F1stats!</a></li>
                        <li className='link'><a href='https://www.instagram.com/andrzejsenderecki/' target='_blank'>Link do profilu Instagram</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default About;
