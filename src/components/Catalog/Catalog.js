import { useEffect, useState } from 'react';
import CarCard from './Card/CarCard';
import * as carService from '../../services/carService';

const Catalog = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {

    (async () => {
      const catalogData = await carService.getAllCars();
      setCars(catalogData.results);
    })();

  }, []);

  return (
    <>
      <h1 className="catalog-title">All Cars</h1>

      <section className="cars">
        { cars.length > 0
          ?
            <>
              {cars.map(x => <CarCard key={x.objectId} car={x} />)}
            </>
          : <p className="no-cars">Don't have cars yet!</p>
        }
      </section>
    </>
  );
};

export default Catalog;
