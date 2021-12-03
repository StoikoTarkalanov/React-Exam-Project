import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="main-loader-container">
      <div className="loader">
        <Loader
          type="Puff"
          color="#00BFFF"
          height={150}
          width={150}
          timeout={8000} //8 secs
        />
      </div>
    </div>
  );
};

export default Loading;
