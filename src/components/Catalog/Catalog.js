import { useEffect, useState } from 'react';
import * as carService from '../../services/carService';
import CarCard from './Card/CarCard';
import Loading from '../Loading';
import usePaginate from '../../hooks/usePaginate';
import Paginate from '../Common/Paginate';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const catalogData = await carService.getAllCars();
      setCars(catalogData.results);
      setLoading(false);
    })();
  }, []);

  const [currentCars, postsPerPage, paginate] = usePaginate(cars);
   
  return (
    <>
      {loading ? <Loading /> : '' }
      <h1 className="catalog-title">All Cars</h1>
      <section className="cars">
        {cars?.length > 0
          ? <>
              {currentCars.map(x => <CarCard key={x.objectId} car={x} />)}
            </>
          : <p className="no-cars">Don't have cars yet!</p>
        }
      </section>
      {cars.length > 0
        ? <Paginate
            postsPerPage={postsPerPage}
            totalPosts={cars.length}
            paginate={paginate}
          />
        : ''
      }
    </>
  );
};

export default Catalog;
