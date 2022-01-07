import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='app-main'>
        <div className='container'>
          <HomeScreen />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
