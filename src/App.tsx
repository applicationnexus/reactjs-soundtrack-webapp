import React from 'react';
import './style/style.scss';
import 'bootstrap/scss/bootstrap.scss';
import Header from './shared/Header/header';
// import Footer from './shared/Footer/footer';
const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <Header />
      </div>
      {/* <div className="App-footer">
        <Footer />
      </div> */}
    </div>
  );
};

export default App;
