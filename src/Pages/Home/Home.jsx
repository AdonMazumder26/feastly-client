import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import Gallery from '../../components/Gallery/Gallery';
import Footer from '../shared/Footer';

const Home = () => {
    const { darkMode } = useOutletContext();

    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <Gallery></Gallery>
            </section>
            <Footer darkMode={darkMode}></Footer>
        </div>
    );
};

export default Home;